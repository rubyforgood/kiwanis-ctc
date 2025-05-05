import { UseMutationResult } from "@tanstack/react-query";
import { COST_PER_ORDER } from "../constants";
import { Order } from "../types/Order";
import { parse } from "csv-parse/browser/esm/sync";

const getPaid = (data: string): boolean => {
    if (!data) { return false; }
    return !data.startsWith("$0.00");
};

const getAmountPaid = (data: string, outstandingBalance: number): number => {
    if (!data || data.startsWith("$0.00")) { return 0; }
    return outstandingBalance;
};

export const getCSVDataAndUpload = async (csv: string, orders: Order[], mutationHook: UseMutationResult<void, unknown, Order[], unknown> ): Promise<string> => {
    if (!csv) {
        return "Please submit non-empty file.";
    }

    try {
        const headers = csv.split("\n")[0];
        assertCsvHeaders(headers);

        const records = parse(csv,
            {
                skip_empty_lines: true,
                columns: true,
                bom: true,
                skip_records_with_empty_values: true
            }
        );

        const newOrders = records.map(csvToOrder);

        const orderIds = new Set(orders.map((order) => order.id));
        const filteredOrders = newOrders.filter((order) => !orderIds.has(order.id));

        await mutationHook.mutateAsync(filteredOrders);
        return "Successfully uploaded CSV rows";
    } catch (error) {
        return error.message;
    }

};

const csvToOrder = (data: any): Order => {
    const boxesForAFAC = Number(data["Boxes for AFAC"] || 0);
    const boxesForCustomer = Number(data["Boxes for Customer"] || 0);
    return {
        id: data["ID"],
        boxesForAFAC,
        boxesForCustomer,
        cellPhone: data["Cell Phone"] || "",
        customerComments: data["Customer Comments"] || "",
        email: data["E-mail"] || "",
        firstName: data["First Name"] || "",
        homePhone: data["Home Phone"] || "",
        howDidYouHearAboutUs: data["How did you hear about us?"] || "",
        kiwanisMember: false,
        lastName: data["Last Name"] || "",
        method: "Card",
        paid: getPaid(data["Total"]),
        pickedUp: false,
        submissionDate: new Date().toLocaleString(),
        additionalDonation: 0,
        amountPaid: getAmountPaid(data["Total"], (boxesForAFAC + boxesForCustomer) * COST_PER_ORDER)
    };
};

const assertCsvHeaders = (line: string): void => {
    const expectedHeaders = [
        "ID", "First Name", "Last Name", "Cell Phone",
        "Home Phone", "E-mail", "Customer Comments",
        "Boxes for AFAC", "Boxes for Customer", "Total"
    ];

    const headers = line.split(",");
    console.log(headers);

    if (!headers) { throw new Error("Could not find CSV headers"); }
    if (headers.length != expectedHeaders.length) { throw new Error(`Incorrect number of headers. Found ${headers.length}. Expected ${expectedHeaders.length}`); }

    for (let i = 0; i < expectedHeaders.length; i++) {
        if (!headers[i].trim().startsWith(expectedHeaders[i])) { throw new Error(`Invalid header: "${headers[i]}"`); }
    }
};
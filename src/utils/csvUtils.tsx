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

    // if (!assertCsvHeaders(headers)) {
    //     setOpenSnackbar(true);
    //     // TODO: How can we tell them what the format is? 
    //     setSnackbarMessage("Columns do not match expected columns");
    //     return;
    // }

    const records = parse(csv,
        {
            skip_empty_lines: true,
            columns: true,
            bom: true,
            skip_records_with_empty_values: true
        }
    );

    const newOrders = records.map(csvToOrder);
    console.log(newOrders);

    newOrders.forEach(order => {
        if (isNaN(order.boxesForAFAC)) {
            console.log("NAN FOUND", order);
        }
    });

    const orderIds = new Set(orders.map((order) => order.id));
    const filteredOrders = newOrders.filter((order) => !orderIds.has(order.id));

    try {
        await mutationHook.mutateAsync(filteredOrders);
        return "Successfully uploaded CSV rows";
    } catch {
        return "Could not upload CSV rows";
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

const stripReturn = (word: string) => {
    return word.replace("\r", "");
};

const assertCsvHeaders = (line: string): boolean => {
    const expectedHeaders = [
        "First Name", "Last Name", "Cell Phone",
        "Home Phone", "E-mail", "Customer Comments",
        "Boxes for AFAC", "Boxes for Customer", "Total"
    ];

    const headers = line.split(",");

    console.log(expectedHeaders, headers);

    if (!headers) { return false; }
    if (headers.length != expectedHeaders.length) { return false; }

    for (let i = 0; i < expectedHeaders.length; i++) {
        if (!headers[i].startsWith(expectedHeaders[i])) { return false; }
    }

    return true;
};
import { Order } from "../types/Order";
import { DocumentData } from "firebase/firestore";
import { getPaid, getPickedUp } from "../hooks/useGetOrders";

export const docToOrder = (id: string, data: any): Order => {
    return {
        id,
        boxesForAFAC: Number(data["Boxes for AFAC"] || 0),
        boxesForCustomer: Number(data["Boxes for Customer"] || 0),
        cellPhone: data["Cell Phone"] || "",
        customerComments: data["Customer Comments"] || "",
        email: data["E-mail"] || "",
        firstName: data["First Name"] || "",
        homePhone: data["Home Phone"] || "",
        howDidYouHearAboutUs: data["How did you hear about us?"] || "",
        kiwanisMember: Boolean(data["Kiwanis Member"]),
        lastName: data["Last Name"] || "",
        method: data["Method"] || "",
        paid: getPaid(data["Paid"]),
        pickedUp: getPickedUp(data["Pick Up"]),
        submissionDate: data["Submission Date"] || "",
        additionalDonation: Number(data["Additional Donation"] || 0),
        amountPaid: Number(data["Amount Paid"] || 0),
    };
};

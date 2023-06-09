import { Order } from "../types/Order";

export const createEmptyOrder = (): Order => {
    return ({
        id: "",
        boxesForAFAC: 0,
        boxesForCustomer: 0,
        cellPhone: "",
        customerComments: "",
        email: "",
        firstName: "",
        homePhone: "",
        howDidYouHearAboutUs: "",
        kiwanisMember: false,
        lastName: "",
        method: "",
        paid: false,
        pickedUp: false,
        submissionDate: new Date().toLocaleString(),
        additionalDonation: 0,
        amountPaid: 0
    });
};

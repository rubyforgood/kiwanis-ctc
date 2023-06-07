export interface Order {
    id: string;
    boxesForAFAC: number;
    boxesForCustomer: number;
    cellPhone: string;
    customerComments: string;
    email: string;
    firstName: string;
    homePhone: string;
    howDidYouHearAboutUs: string;
    kiwanisMember: boolean;
    lastName: string;
    method: string;
    paid: boolean;
    pickedUp: boolean;
    submissionDate: string;
    additionalDonation: number;
    amountPaid: number;
}
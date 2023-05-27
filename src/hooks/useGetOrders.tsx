import React from "react";
import { db } from "../Firebase";
import { Order } from "../types/Order";
import { collection, DocumentData, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

const docToOrder = (id: string, data: DocumentData): Order => {
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
        pickedUp: getPickedUp(data["Pick Up"]), //TODO: Decide on values. This needs to be changed
        submissionDate: data["Submission Date"] || "",
        additionalDonation: Number(data["Additional Donation"] || 0),
        amountPaid: Number(data["Amount Paid"] || 0),
    };
};

const getPaid = (data: unknown): boolean => {
    if (typeof data === "string" || data instanceof String) {
        return data.toLowerCase() === "yes";
    }

    return Boolean(data);
};

const getPickedUp = (data: unknown): boolean => {
    if (typeof data === "string" || data instanceof String) {
        return !(data.toLowerCase() === "not ready");
    }

    return Boolean(data);
};

const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const clientsRef = collection(db, "clients");
            const snapshot = await getDocs(query(clientsRef, limit(10)));
            const orderObjects = snapshot.docs.map((doc) => docToOrder(doc.id, doc.data()));
            console.log(orderObjects);
            return orderObjects;
        },
    });
};

export default useGetOrders;
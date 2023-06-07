import React from "react";
import { db } from "../Firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { docToOrder } from "../utils/docToOrder";

export const getPaid = (data: unknown): boolean => {
    if (typeof data === "string" || data instanceof String) {
        return data.toLowerCase() === "yes";
    }

    return Boolean(data);
};

export const getPickedUp = (data: unknown): boolean => {
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
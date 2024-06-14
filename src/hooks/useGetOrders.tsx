import { db } from "../config";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { ORDERS_COLLECTION } from "../constants";
import { Order } from "../types/Order";

const ORDER_LIMIT = 1000;

const useGetOrders = () => {
    return useQuery({
        queryKey: [ORDERS_COLLECTION],
        queryFn: async () => {
            const clientsRef = collection(db, ORDERS_COLLECTION);
            const snapshot = await getDocs(query(clientsRef, limit(ORDER_LIMIT)));
            const orderObjects = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data
                };
            });
            return orderObjects as Order[];
        },
    });
};

export default useGetOrders;
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { ORDERS_COLLECTION } from "../constants";

const useGetOrders = () => {
    return useQuery({
        queryKey: [ORDERS_COLLECTION],
        queryFn: async () => {
            const clientsRef = collection(db, ORDERS_COLLECTION);
            const snapshot = await getDocs(query(clientsRef));
            const orderObjects = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data
                };
            });
            return orderObjects;
        },
    });
};

export default useGetOrders;
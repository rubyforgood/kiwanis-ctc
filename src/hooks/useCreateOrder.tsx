import { Order } from "../types/Order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { ORDERS_COLLECTION } from "../constants";

const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (order: Order) => {
            const { id, ...orderData } = order;
            await addDoc(collection(db, ORDERS_COLLECTION), {
                ...orderData
            });
        },
        retry: 3,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: [ORDERS_COLLECTION] }); }
    });
};

export default useCreateOrder;
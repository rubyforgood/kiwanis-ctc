import { Order } from "../types/Order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { ORDERS_COLLECTION } from "../constants";

const useEditOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (order: Order) => {
            const { id, ...orderData } = order;
            await setDoc(doc(db, ORDERS_COLLECTION, order.id), {
                ...orderData
            });
        },
        retry: 3,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: [ORDERS_COLLECTION] }); }
    });
};

export default useEditOrder;
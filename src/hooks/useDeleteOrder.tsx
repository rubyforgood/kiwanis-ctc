import { Order } from "../types/Order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config";
import { ORDERS_COLLECTION } from "../constants";

const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (order: Order) => {
            await deleteDoc(doc(db, ORDERS_COLLECTION, order.id));
        },
        retry: 3,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: [ORDERS_COLLECTION] }); }
    });
};

export default useDeleteOrder;
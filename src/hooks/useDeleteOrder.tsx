import React from "react";
import { Order } from "../types/Order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";

const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (order: Order) => {
            await deleteDoc(doc(db, "clients", order.id));
        },
        retry: 3,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["orders"] }); }
    });
};

export default useDeleteOrder;
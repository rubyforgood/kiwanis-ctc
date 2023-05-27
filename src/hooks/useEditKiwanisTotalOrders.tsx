
import React from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const useEditKiwanisTotalOrders = (queryClient: QueryClient) => {
    return useMutation({
        mutationFn: async (amount: Number) => {
            await setDoc(doc(db, "KiwanisTotalOrders", "kiwanisTotalOrders"), {
                amount
            });
        },
        retry: 3,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["kiwanisTotalOrders"] }); }
    });
};

export default useEditKiwanisTotalOrders;
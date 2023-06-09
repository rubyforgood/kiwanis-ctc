import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

const useEditKiwanisTotalBoxes = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (amount: number) => {
            await setDoc(doc(db, "KiwanisTotalOrders", "kiwanisTotalOrders"), {
                amount
            });
        },
        retry: 3,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["kiwanisTotalOrders"] }); }
    });
};

export default useEditKiwanisTotalBoxes;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { KIWANIS_TOTAL_ORDERS_COLLECTION, KIWANIS_TOTAL_ORDERS_DOC } from "../constants";

const useEditKiwanisTotalBoxes = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (amount: number) => {
            await setDoc(doc(db, KIWANIS_TOTAL_ORDERS_COLLECTION, KIWANIS_TOTAL_ORDERS_DOC), {
                amount
            });
        },
        retry: 3,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: [KIWANIS_TOTAL_ORDERS_COLLECTION] }); }
    });
};

export default useEditKiwanisTotalBoxes;
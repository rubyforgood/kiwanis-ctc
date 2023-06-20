import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { KIWANIS_TOTAL_ORDERS_COLLECTION, KIWANIS_TOTAL_ORDERS_DOC } from "../constants";

const useGetKiwanisTotalBoxes = () => {
    return useQuery({
        queryKey: [KIWANIS_TOTAL_ORDERS_COLLECTION],
        queryFn: async () => {
            const snapshot = await getDoc(doc(db, KIWANIS_TOTAL_ORDERS_COLLECTION, KIWANIS_TOTAL_ORDERS_DOC));
            return snapshot.data();
        },
    });
};

export default useGetKiwanisTotalBoxes;
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

const useGetKiwanisTotalOrders = () => {
    return useQuery({
        queryKey: ["kiwanisTotalOrders"],
        queryFn: async () => {
            const snapshot = await getDoc(doc(db, "KiwanisTotalOrders", "kiwanisTotalOrders"));
            return snapshot.data;
        },
    });
};

export default useGetKiwanisTotalOrders;
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { ADMINS_COLLECTION } from "../constants";

interface Admin {
    email: string;
}

const useGetAdmins = () => {
    return useQuery({
        queryKey: [ADMINS_COLLECTION],
        queryFn: async () => {
            const adminsRef = collection(db, ADMINS_COLLECTION);
            const snapshot = await getDocs(query(adminsRef));
            const admins = snapshot.docs.map((doc) => {
                const data = doc.data();
                return { ...data };
            });
            return admins as Admin[];
        },
    });
};

export default useGetAdmins;
import React from "react";
import { Order } from "../types/Order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (order: Order) => {
            await addDoc(collection(db, "clients"), {
                "Boxes for AFAC": order.boxesForAFAC,
                "Boxes for Customer": order.boxesForCustomer,
                "Cell Phone": order.cellPhone,
                "Customer Comments": order.customerComments,
                "E-mail": order.email,
                "First Name": order.firstName,
                "Home Phone": order.homePhone,
                "How did you hear about us?": order.howDidYouHearAboutUs,
                "Kiwanis Member": order.kiwanisMember,
                "Last Name": order.lastName,
                "Method": order.method,
                "Paid": order.paid,
                "Pick Up": order.pickedUp,
                "Submission Date": order.submissionDate,
                "Additional Donation": order.additionalDonation,
                "Amount Paid": order.amountPaid
            });
        },
        retry: 3,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["orders"] }); }
    });
};

export default useCreateOrder;
import { Order } from "../types/Order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WriteBatch, doc, writeBatch } from "firebase/firestore";
import { db } from "../config";
import { ORDERS_COLLECTION } from "../constants";

const MAX_BATCH_SIZE = 500;

const useBatchCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (batchOrders: Order[]) => {
            const batchArray: WriteBatch[] = [];
            batchArray.push(writeBatch(db));
            let operationCounter = 0;
            let batchIndex = 0;

            batchOrders.forEach(order => {
                const newOrderRef = doc(db, ORDERS_COLLECTION, order.id);
                const { id, ...orderValues } = order;
                batchArray[batchIndex].set(newOrderRef, { ...orderValues });
                operationCounter++;

                if (operationCounter === MAX_BATCH_SIZE - 1) {
                    batchArray.push(writeBatch(db));
                    batchIndex++;
                    operationCounter = 0;
                }
            });

            batchArray.forEach(async batch => await batch.commit());
        },
        retry: 1,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: [ORDERS_COLLECTION] }); }
    });
};

export default useBatchCreateOrder;
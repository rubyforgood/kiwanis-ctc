import React, { createContext, Dispatch, SetStateAction } from "react";

export type StepContext = [
	number, Dispatch<SetStateAction<number>>
];

export const ActiveStepContext = createContext<StepContext>([0, () => null]);
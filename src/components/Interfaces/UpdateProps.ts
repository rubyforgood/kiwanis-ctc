import React, { Dispatch, SetStateAction } from "react";

export interface UpdateProps {
	updatedState: [boolean, Dispatch<SetStateAction<boolean>>]
	colRef: any
}
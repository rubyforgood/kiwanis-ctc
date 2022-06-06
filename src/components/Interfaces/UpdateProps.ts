import React, { Dispatch, SetStateAction } from "react";

export interface UpdateProps {
	updatedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
	colRef: any
}
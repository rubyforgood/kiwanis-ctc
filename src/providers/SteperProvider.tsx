import React,{ createContext,useState } from "react";
import PropTypes from "prop-types";



type StepperContextType ={
  activeStep:number ,
  setActiveStep: (step:number) => void;
};
const defaultStepperContextValue: StepperContextType = {
    activeStep: 0,
    setActiveStep: (step) => {
        console.log(step);
    },
};

export const stepperContext =createContext<StepperContextType>(defaultStepperContextValue);



export default function StepperProvider(props) {

    const [activeStep, setActiveStep] = useState(0);

    const providerData = {
        activeStep,
        setActiveStep,
    };

    return (
        <stepperContext.Provider value={providerData}>
            {props.children}
        </stepperContext.Provider>
    );
}
StepperProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
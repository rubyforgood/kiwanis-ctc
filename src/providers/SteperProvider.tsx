import React,{ createContext,useState } from "react";
import PropTypes from "prop-types";



type StepperContextType ={
  activeStep:number ,
  setActiveStep: (step:number) => void,
  self:number ,
  setSelf: (s:number) => void,
  AFAC:number ,
  setAFAC: (afac:number) => void,
  cash:number ,
  setCash: (step:number) => void,

};
const defaultStepperContextValue: StepperContextType = {
    activeStep: 0,
    setActiveStep: (step) => {
        console.log(step);
    },
    self:0 ,
    setSelf: (s) => {
        console.log("self",s);
    },
    AFAC:0 ,
    setAFAC: (afac) => {
        console.log("AFAC",afac);
    },
    cash:0 ,
    setCash: (c) => {
        console.log("cash",c);
    },
};

export const stepperContext =createContext<StepperContextType>(defaultStepperContextValue);



export default function StepperProvider(props) {

    const [activeStep, setActiveStep] = useState(0);

    const [self, setSelf] = useState(0);
    const [AFAC, setAFAC] = useState(0);
    const [cash, setCash] = useState(0);

    const providerData = {
        activeStep,
        setActiveStep,
        self,setSelf,
        AFAC,setAFAC,
        cash,setCash
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
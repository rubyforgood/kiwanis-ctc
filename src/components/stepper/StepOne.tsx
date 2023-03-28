import React,{useState} from "react";
import { useFormik} from "formik";
import Box from "@mui/material/Box";
import {FormControl,TextField } from "@mui/material";





const StepOne = () => {
type OrderDetails = {
    firstName: string,
    lastName: string,
    cellPhone: string,
    homePhone: string,
    email: string,
}

const [orderDetails, setOrderDetails] = useState<OrderDetails>({

    firstName: "",
    lastName: "",
    cellPhone: "",
    homePhone: "",
    email: "",
});


const formik = useFormik({
    initialValues: {
        firstName: "",
        lastName: "",
        cellPhone: "",
        homePhone: "",
        email: ""
    },
    onSubmit: (values) => {
        setOrderDetails(prevDetails => ({
            ...prevDetails,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "cellPhone": values.cellPhone,
            "homePhone": values.homePhone,
            "email": values.email,
        }));
    }
});

return (
    <React.Fragment>
        <Box sx={{display: "flex" , flexDirection: "row", justifyContent: "space-between",width:300}}>
                       
            <Box sx={{borderBottom: "solid",  borderTop: "solid",borderWidth: 2, borderColor: "primary.main", p:2}} >
               
                <FormControl sx={{ width: "25ch" }}>
                 
                    <form onSubmit={formik.handleSubmit}>
                        <TextField 					
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            margin="normal"
                            variant="outlined" 
                            size="small"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
         
                        />
                        <TextField 					
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            margin="normal"
                            variant="outlined"
                            size="small" 
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}

                        />
                        <TextField 					
                            fullWidth
                            id="cellPhone"
                            name="cellPhone"
                            label="Cell Phone"
                            margin="normal"
                            variant="outlined"
                            size="small" 
                            value={formik.values.cellPhone}
                            onChange={formik.handleChange}
                            error={formik.touched.cellPhone && Boolean(formik.errors.cellPhone)}
                            helperText={formik.touched.cellPhone && formik.errors.cellPhone}
            
                        />
                        <TextField 					
                            fullWidth
                            id="homePhone"
                            name="homePhone"
                            label="Home Phone"
                            margin="normal"
                            variant="outlined" 
                            size="small"
                            value={formik.values.homePhone}
                            onChange={formik.handleChange}
                            error={formik.touched.homePhone && Boolean(formik.errors.homePhone)}
                            helperText={formik.touched.homePhone && formik.errors.homePhone}
   
                        />
                        <TextField 					
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            margin="normal"
                            variant="outlined" 
                            size="small"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
              
                        />
                    </form>
               
                </FormControl>
            </Box>
        </Box>


    </React.Fragment>
);
};

export default StepOne;
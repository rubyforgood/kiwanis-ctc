// import * as React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import { Container, Typography } from "@mui/material";
// import "./styling/style.css";
// import { Card } from "@mui/material";
// import DashboardChart from "./CustomPieChart";
// import Title from "./Title";

// function AdminContent() {
//     return (
//         <React.Fragment>
//             <Title>2023 Blueberry Fundraiser- Dashboard</Title>

//             <Container sx={{ display: "flex" }}>
//                 <Box
//                     sx={{
//                         flexGrow: 1,
//                         width: 1 / 2,
//                         mr: 2,
// 					}}
//                 >
//                     <Grid
//                         container
//                         spacing={{ xs: 2, md: 3 }}
//                         columns={{ xs: 4, sm: 8, md: 12 }}
//                     >
//                         <Grid item xs={2} sm={4} md={6} sx={{height: "100%",backgroundColor: "red"}}>
//                             <Card className="dashboard-card" sx={{borderRadius: "10%", height: "100%", backgroundColor: "yellow"}}>
//                                 <Typography className="dashboard-card-text">
//                                     <strong>159</strong>
//                                     <br /> Total Order
//                                 </Typography>
//                             </Card>
//                         </Grid>
//                         <Grid item xs={2} sm={4} md={6} sx={{height: "100%",backgroundColor: "red"}}>
//                             <Card className="dashboard-card" sx={{borderRadius: "10%", height: "100%", backgroundColor: "yellow"}}>
//                                 <Typography className="dashboard-card-text">
//                                     <strong>100</strong>
//                                     <br /> Total Donor
//                                 </Typography>
//                             </Card>
//                         </Grid>
//                         <Grid item xs={2} sm={4} md={6} sx={{height: "100%",backgroundColor: "red"}}>
//                             <Card className="dashboard-card" sx={{borderRadius: "10%", height: "100%", backgroundColor: "yellow"}}>
//                                 <Typography className="dashboard-card-text">
//                                     <strong>250</strong>
//                                     <br /> Total Boxes Order
//                                 </Typography>
//                             </Card>
//                         </Grid>
//                         <Grid item
//         					xs={2} sm={4} md={6}
//         					sx={{
//           						height: "100%",
//           						backgroundColor:"red"
//         					}}
//       					>
//         				<Card className="dashboard-card" sx={{ borderRadius: "10%",
//         					height: "100%", backgroundColor:"yellow" 
//       					}}>
//                                 <Typography className="dashboard-card-text">
//                                     <strong>125</strong>
//                                     <br /> Total Boxes for AFAC
//                                 </Typography>
//                             </Card>
//                         </Grid>
//                     </Grid>
//                 </Box>
//                 <Box
//                     sx={{
//                         flexGrow: 1,
//                         width: 1 / 2,
//                         mr: 2,
//                         ml: 2,
//                         border: "lightGrey 1px solid",
//                         borderRadius: "5%",
//                     }}
//                 >   <Grid item xs={12} sm={12} md={12} >

//                         <DashboardChart /> {/*import the pie chart*/}
//                     </Grid>
//                 </Box>
//             </Container>
//         </React.Fragment>
//     );
// }

// export default function Dashboard() {
//     return <AdminContent />;}

import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardChart from "./CustomPieChart";
import Typography from "@mui/material/Typography";
import "./styling/style.css"; // import your CSS file

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    minHeight:"90px",
    color: theme.palette.text.secondary,
    border:"1px solid lightgray",borderRadius:"11%" 
}));

export default function Dashboard() {
    return (
        <React.Fragment>
            <Paper>
                <Box sx={{ flexGrow: 1, width: 50 / 100, float: "left"}}>
                    <Grid
                        container
                        spacing={{ xs: 3, sm:3, md: 3 }}
                        columns={{ xs: 8, sm: 10, md: 7.5 }}
                    >
                        <Grid item xs={4} sm={5} md={3.5}>
                            <Item>
                                <Typography noWrap>
                                    <strong>159</strong>
                                    <br /> Total Order
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={4} sm={5} md={3.5}>
                            <Item >
                                <Typography noWrap>
                                    <strong>100</strong>
                                    <br /> Total Donor
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={4} sm={5} md={3.5}>
                            <Item>
                                <Typography noWrap>
                                    <strong>250</strong>
                                    <br /> Total Boxes Order
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={4} sm={5} md={3.5}>
                            <Item>
                                <Typography noWrap>
                                    <strong>125</strong>
                                    <br /> Total Boxes for AFAC
                                </Typography>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1, width: 10 / 20, float: "right", height: "auto" }}>
                    <Paper sx={{border:"1px solid lightgray",borderRadius:"5%" }}>
                        <DashboardChart />
                    </Paper>
                </Box>
            </Paper>
        </React.Fragment>
    );
}

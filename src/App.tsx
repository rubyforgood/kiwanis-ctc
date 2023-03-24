import * as React from "react";
import Link from "@mui/material/Link";

import Login from "./components/login/Login";
import { Dashboard } from "@mui/icons-material";

export default function App() {
  return (
    <Link>
      <Dashboard />
      <Login />
    </Link>
  );
}

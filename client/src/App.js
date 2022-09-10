import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import SideBar from "./components/SideBar";
import Mainpage from "./components/mainpage/Mainpage";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./themes/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Grid container sx={{ height: "100vh" }}>
				<Grid
					xs={2}
					sm={2}
					md={2}
					lg={2}
					xl={2}
					sx={{ border: "2px solid black", height: "100%" }}
				>
					<SideBar />
				</Grid>
				<Grid
					xs={10}
					sm={10}
					md={10}
					lg={10}
					xl={10}
					sx={{ border: "2px solid green", height: "100%" }}
				>
					<Mainpage />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;

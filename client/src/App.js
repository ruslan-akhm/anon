import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import SideBar from "./components/SideBar";
import Board from "./components/mainpage/board/Board";
import Mentorship from "./components/mainpage/mentorship/Mentorship";
import Profile from "./components/mainpage/profile/Profile";

import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { theme } from "./themes/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Grid container sx={{ height: "100vh" }}>
					<Grid xs={2} sm={2} md={2} lg={2} xl={2} sx={{ height: "100%" }}>
						<SideBar />
					</Grid>

					<Grid xs={10} sm={10} md={10} lg={10} xl={10} sx={{ height: "100%" }}>
						<Routes>
							<Route path="/board" element={<Board />} />
							<Route path="/mentorship" element={<Mentorship />} />
							<Route path="/profile" element={<Profile />} />
						</Routes>
					</Grid>
				</Grid>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;

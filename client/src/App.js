import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import SideBar from "./components/SideBar";
import Board from "./components/mainpage/board/Board";
import Mentorship from "./components/mainpage/mentorship/Mentorship";
import Profile from "./components/mainpage/profile/Profile";
import Post from "./components/mainpage/post/Post";

import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";

import { theme } from "./themes/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Grid container sx={{ height: "100vh" }}>
				<Grid
					item
					container
					xs={2}
					sm={2}
					md={2}
					lg={2}
					xl={2}
					sx={{ height: "100%" }}
				>
					<SideBar />
				</Grid>
				<Grid
					item
					container
					xs={10}
					sm={10}
					md={10}
					lg={10}
					xl={10}
					sx={{ height: "100%" }}
				>
					<Routes>
						<Route path="/board" element={<Board />} />
						<Route path="/post/:id" element={<Post />} />
						<Route path="/mentorship" element={<Mentorship />} />
						<Route path="/settings" element={<Profile />} />
						<Route path="*" element={<Navigate to="/board" replace />} />
					</Routes>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;

import React from "react";
import { Grid, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { useLocation } from "react-router-dom";

function SideBar(props) {
	const location = useLocation();
	const theme = useTheme();

	const buttonStyle = {
		borderRadius: "0",
		fontWeight: "bold",
		fontSize: "20px",
		justifyContent: "flex-start",
		borderBottom: `1px solid ${theme.palette.sidebar.hover}`,
		padding: 1,
		pl: 2,
		textDecoration: "none",
		color: theme.palette.sidebar.text,
		transition: "0.2s",
		width: "100%",
		height: "100%",
		"&:hover": { backgroundColor: theme.palette.sidebar.hover },
	};

	const activeButtonStyle = {
		boxShadow: "-3px 0px 8px -4px rgba(35,47,62,0.75) inset",
		backgroundColor: theme.palette.sidebar.text,
		color: theme.palette.sidebar.hover,
		"&:hover": {
			backgroundColor: theme.palette.sidebar.text,
			color: theme.palette.sidebar.hover,
		},
	};

	return (
		<Grid
			container
			direction="column"
			sx={{
				backgroundColor: theme.palette.sidebar.main,
				height: "100vh",
			}}
		>
			<Grid item>
				<Link
					to="/board"
					style={{ textDecoration: "none", width: "100%", height: "100%" }}
				>
					<Button
						sx={[
							buttonStyle,
							location.pathname == "/board" ? activeButtonStyle : null,
						]}
					>
						Board
					</Button>
				</Link>
			</Grid>
			<Grid item>
				<Link
					to="/mentorship"
					style={{ textDecoration: "none", width: "100%", height: "100%" }}
				>
					<Button
						sx={[
							buttonStyle,
							location.pathname == "/mentorship" ? activeButtonStyle : null,
						]}
					>
						Mentorship
					</Button>
				</Link>
			</Grid>
			<Grid item sx={{ mt: "auto" }}>
				<Link
					to="/settings"
					style={{ textDecoration: "none", width: "100%", height: "100%" }}
				>
					<Button
						sx={[
							buttonStyle,
							location.pathname == "/settings" ? activeButtonStyle : null,
						]}
						startIcon={<SettingsIcon />}
					>
						Settings
					</Button>
				</Link>
			</Grid>
			<Grid item>
				<Link
					to="*"
					style={{ textDecoration: "none", width: "100%", height: "100%" }}
				>
					<Button
						sx={{ ...buttonStyle, color: "red" }}
						startIcon={<LogoutIcon />}
					>
						Log Out
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
}

export default SideBar;

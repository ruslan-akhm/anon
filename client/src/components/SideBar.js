import React from "react";
import { Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

function SideBar(props) {
	const theme = useTheme();
	return (
		<Grid
			container
			direction="column"
			sx={{ backgroundColor: theme.palette.sidebar.main }}
		>
			<Link
				to="/about"
				style={{ textDecoration: "none", width: "100%", height: "100%" }}
			>
				<Button
					sx={{
						borderBottom: `1px solid ${theme.palette.sidebar.hover}`,
						padding: 1,
						textDecoration: "none",
						color: theme.palette.sidebar.text,
						transition: "0.2s",
						width: "100%",
						height: "100%",
						"&:hover": { backgroundColor: theme.palette.sidebar.hover },
					}}
				>
					BOARD
				</Button>
			</Link>
			<Link
				to="/mentorship"
				style={{ textDecoration: "none", width: "100%", height: "100%" }}
			>
				<Button
					sx={{
						borderBottom: `1px solid ${theme.palette.sidebar.hover}`,
						padding: 1,
						textDecoration: "none",
						color: theme.palette.sidebar.text,
						transition: "0.2s",
						width: "100%",
						height: "100%",
						"&:hover": { backgroundColor: theme.palette.sidebar.hover },
					}}
				>
					MENTORSHIP
				</Button>
			</Link>
		</Grid>
	);
}

export default SideBar;

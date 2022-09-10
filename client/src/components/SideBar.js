import React from "react";
import { Link, Grid } from "@mui/material";
import { useTheme } from "@mui/material";

function SideBar(props) {
	const theme = useTheme();
	return (
		<Grid
			container
			direction="column"
			sx={{ backgroundColor: theme.palette.sidebar.main }}
		>
			<Link
				component="button"
				variant="body2"
				onClick={() => {
					console.info("I'm a button.");
				}}
				sx={{
					borderBottom: `1px solid ${theme.palette.sidebar.hover}`,
					padding: 1,
					textDecoration: "none",
					color: theme.palette.sidebar.text,
					transition: "0.2s",
					"&:hover": { backgroundColor: theme.palette.sidebar.hover },
				}}
			>
				BOARD
			</Link>
			<Link
				component="button"
				variant="body2"
				onClick={() => {
					console.info("I'm a button.");
				}}
				sx={{
					borderBottom: `1px solid ${theme.palette.sidebar.hover}`,
					padding: 1,
					textDecoration: "none",
					color: theme.palette.sidebar.text,
					transition: "0.2s",
					"&:hover": { backgroundColor: theme.palette.sidebar.hover },
				}}
			>
				MENTOR
			</Link>
		</Grid>
	);
}

export default SideBar;

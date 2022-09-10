import React from "react";
import { Grid, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

function SideBar(props) {
	const theme = useTheme();
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
			</Grid>
			<Grid item>
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
			<Grid item sx={{ mt: "auto" }}>
				<Link
					to="/settings"
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
						SETTINGS
					</Button>
				</Link>
			</Grid>
			<Grid item>
				<Link
					to="*"
					style={{ textDecoration: "none", width: "100%", height: "100%" }}
				>
					<Button
						sx={{
							borderBottom: `1px solid ${theme.palette.sidebar.hover}`,
							padding: 1,
							textDecoration: "none",
							color: "red",
							transition: "0.2s",
							width: "100%",
							height: "100%",
							"&:hover": { backgroundColor: theme.palette.sidebar.hover },
						}}
					>
						LOG OUT
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
}

export default SideBar;

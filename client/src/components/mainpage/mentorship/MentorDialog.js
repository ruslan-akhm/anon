import React, { useEffect, useState } from "react";
import {
	Grid,
	Button,
	Typography,
	DialogContent,
	DialogActions,
	Box,
	IconButton,
	CircularProgress,
	useTheme,
	TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const MentorDialog = ({ mentor, setModalShown, setMentorApproved }) => {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const [nameMissing, setNameMissing] = useState(false);
	const [textInput, setTextInput] = useState("");

	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				setModalShown(false);
				setMentorApproved(true);
			}, 500);
		}
	}, [loading]);

	const handleChange = (e) => {
		if (nameMissing) {
			setNameMissing(false);
		}
		setTextInput(e.target.value);
	};

	const handleSubmit = async () => {
		if (!textInput || textInput.trim().length < 1) {
			setNameMissing(true);
			return;
		}
		setLoading(true);
	};

	return (
		<Box sx={{ px: 2, py: 2, position: "relative" }}>
			{/* <Grid container direction="row" justifyContent="flex-end"> */}
			<IconButton
				onClick={() => setModalShown(false)}
				sx={{ position: "absolute", top: "10px", right: "10px" }}
			>
				<CloseIcon />
			</IconButton>
			{/* </Grid> */}
			<DialogContent>
				<Grid container direction="column">
					<Grid container item direction="row" style={{ width: "100%" }}>
						<Grid item container xs={3} sm={3} md={3} lg={3} xl={3}>
							<img
								src={mentor.picture}
								style={{ width: "200px", height: "200px", borderRadius: "50%" }}
							/>
						</Grid>
						<Grid
							item
							container
							xs={9}
							sm={9}
							md={9}
							lg={9}
							xl={9}
							direction="column"
							sx={{ pl: 5 }}
						>
							<Typography variant="h3">{mentor.name}</Typography>
							<Typography variant="h5" sx={{ color: "gray" }}>
								{mentor.title}
							</Typography>
							{/* <Typography variant="h6">
								Seniority: {mentor.experienceLevel}
							</Typography>
							<Typography variant="h6">
								Department: {mentor.department}
							</Typography> */}
						</Grid>
					</Grid>
					<Typography sx={{ mt: 3 }}>{mentor.description}</Typography>
				</Grid>
			</DialogContent>
			<DialogActions sx={{ px: 2 }}>
				<Grid sx={{ width: "100%" }}>
					<TextField
						id="input-mentor"
						variant="outlined"
						placeholder="Provide your name"
						error={nameMissing}
						label={nameMissing ? "Please provide your full name" : ""}
						sx={{
							width: "100%",
						}}
						onChange={handleChange}
						value={textInput}
					/>
					<Typography sx={{ mb: 3, fontSize: "12px" }}>
						* Your Anon ID will not be revealed to the mentor
					</Typography>
					<Button
						variant="contained"
						sx={{
							width: "100%",
							backgroundColor: theme.palette.green.main,
							color: theme.palette.sidebar.text,
							margin: "auto",
							"&:hover": {
								backgroundColor: theme.palette.green.hover,
							},
						}}
						onClick={handleSubmit}
					>
						{loading ? (
							<CircularProgress size={24} sx={{ color: "white" }} />
						) : (
							"Request"
						)}
					</Button>
				</Grid>
			</DialogActions>
		</Box>
	);
};

export default MentorDialog;

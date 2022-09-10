import React, { useEffect, useState } from "react";
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Dialog,
	DialogContent,
	DialogActions,
	Box,
	IconButton,
	CircularProgress,
	useTheme,
	Alert,
	Slide,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const mentorSchema = {
	id: "",
	name: "",
	title: "",
	department: "",
	picture: "",
	experienceLevel: "",
};

const mentors = [
	{
		id: 1,
		name: "Jane Smith",
		title: "Senior Marketing Specialist",
		description:
			"Hi, I am Jane! I can help you with marketing questions, bring you up to speed on technologies and answer general questions about the company",
		department: "Marketing",
		picture:
			"https://i.pinimg.com/originals/c3/45/05/c34505eb63edc65300a690f1ad903799.jpg",
		experienceLevel: "Senior",
	},
	{
		id: 2,
		name: "Mark Brown",
		title: "Consultant",
		description:
			"Hey folks! I would love to provide support on cybersecurity aspects of our company. I used to play tennis professionally as well, so if you want to discuss Davis Cup - hit me up!",
		department: "Cybersecurity",
		picture:
			"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
		experienceLevel: "Intermediate",
	},
];

const MentorDialog = ({ mentor, setModalShown, setMentorApproved }) => {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading(false);
				setModalShown(false);
				setMentorApproved(true);
			}, 500);
		}
	}, [loading]);

	const handleSubmit = async () => {
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
				<Grid direction="column">
					<Grid container direction="row" style={{ width: "100%" }}>
						<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
							<img
								src={mentor.picture}
								style={{ width: "200px", height: "200px", borderRadius: "50%" }}
							/>
						</Grid>
						<Grid
							item
							xs={9}
							sm={9}
							md={9}
							lg={9}
							xl={9}
							container
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
			<DialogActions>
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
			</DialogActions>
		</Box>
	);
};

function Mentorship(props) {
	const theme = useTheme();
	const [mentorsList, setMentorsList] = useState([]);
	const [modalShown, setModalShown] = useState(false);
	const [chosenMentor, setChosenMentor] = useState({});
	const [mentorApproved, setMentorApproved] = useState(false);

	useEffect(() => {
		fetchMentors();
	}, []);

	useEffect(() => {
		if (mentorApproved) {
			setTimeout(() => {
				setMentorApproved(false);
			}, 4000);
		}
	}, [mentorApproved]);

	const fetchMentors = async () => {
		//await mentors to be fetched;
		setMentorsList(mentors);
	};

	const handleClick = (mentor) => {
		// console.log(mentor);
		setModalShown(true);
		setChosenMentor(mentor);
	};

	const mentorsCards = mentorsList.map((m, index) => {
		return (
			<Grid
				xs={6}
				sm={6}
				md={6}
				lg={6}
				xl={6}
				key={index + m.id}
				sx={{ px: 2, py: 2 }}
			>
				<Card>
					{/* <CardMedia
						component="img"
						height="200"
						image={m.picture}
						alt="mentor picture"
						sx={{
							objectFit: "cover",
							objectPosition: "center",
							borderRadius: "50%",
						}}
					/> */}

					<CardContent>
						<Grid container item>
							<Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
								<img
									src={m.picture}
									style={{
										width: "140px",
										height: "140px",
										objectFit: "cover",
										objectPosition: "center",
										borderRadius: "50%",
									}}
								/>
							</Grid>
							<Grid item direction="column" xs={8} sm={8} md={8} lg={8} xl={8}>
								<Typography
									gutterBottom
									variant="h4"
									component="div"
									style={{ wordBreak: "break-word" }}
								>
									{m.name}
								</Typography>
								<Typography
									sx={{ fontSize: 16, wordBreak: "break-word", color: "gray" }}
								>
									{m.title}
								</Typography>
							</Grid>
						</Grid>
						<Grid item sx={{ mt: 3, height: "20px" }}>
							<Typography
								variant="body2"
								sx={{
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
									// height: "60px",
									width: "auto",
								}}
							>
								{m.description}
							</Typography>
						</Grid>
					</CardContent>
					<CardActions>
						<Button
							size="medium"
							sx={{
								backgroundColor: theme.palette.green.main,
								color: theme.palette.sidebar.text,
								margin: "auto",
								width: "100%",
								"&:hover": {
									backgroundColor: theme.palette.green.hover,
								},
							}}
							onClick={() => handleClick(m)}
						>
							Request Mentorship
						</Button>
					</CardActions>
				</Card>
			</Grid>
		);
	});

	return (
		<Grid container direction="column">
			<Box sx={{ px: 2, py: 2 }}>
				<Typography variant="h3">
					Supercharge your Career with a Mentor
				</Typography>
			</Box>
			<Grid direction="row" container item>
				{mentorsCards}
				<Dialog
					open={modalShown}
					onClose={() => setModalShown(false)}
					fullWidth={true}
					maxWidth={"md"}
				>
					<MentorDialog
						mentor={chosenMentor}
						setModalShown={setModalShown}
						setMentorApproved={setMentorApproved}
					/>
				</Dialog>
				<Box
					sx={{
						position: "absolute",
						bottom: " 20px",
						left: "0",
						right: "0",
						marginLeft: "auto",
						marginRight: "auto",
						width: "fit-content",
					}}
				>
					<Slide
						variant="filled"
						direction="up"
						in={mentorApproved}
						mountOnEnter
						unmountOnExit
					>
						<Alert
							severity="success"
							sx={{ alignItems: "center", backgroundColor: "#FF8686" }}
						>
							Mentorship requested was sent!{" "}
							<IconButton
								onClick={() => setMentorApproved(false)}
								sx={{ ml: 8 }}
							>
								<CloseIcon color="info" />
							</IconButton>
						</Alert>
					</Slide>
				</Box>
			</Grid>
		</Grid>
	);
}

export default Mentorship;

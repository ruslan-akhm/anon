import React, { useEffect, useState } from "react";
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../firebase-config";

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
	DialogActibranons,
	Box,
	IconButton,
	CircularProgress,
	useTheme,
	Alert,
	Slide,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";



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
		<Box sx={{ px: 2, py: 2 }}>
			<Grid container direction="row" justifyContent="flex-end">
				<IconButton onClick={() => setModalShown(false)}>
					<CloseIcon />
				</IconButton>
			</Grid>
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
							<Typography variant="h5">{mentor.title}</Typography>
							<Typography variant="h6">
								Seniority: {mentor.experienceLevel}
							</Typography>
							<Typography variant="h6">
								Department: {mentor.department}
							</Typography>
						</Grid>
					</Grid>
					<Typography sx={{ mt: 3 }}>{mentor.description}</Typography>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					sx={{ width: "100%" }}
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
	// const theme = useTheme();
	const [mentorsList, setMentorsList] = useState([]);
	const [modalShown, setModalShown] = useState(false);
	const [chosenMentor, setChosenMentor] = useState({});
	const [mentorApproved, setMentorApproved] = useState(false);

	const [id, setId] = useState('');
	const [fname, setName] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [department, setDepartment] = useState('');
	const [picture, setPicture] = useState('');
	const [experienceLevel, setExperienceLevel] = useState('');

const mentors = collection(db, 'Mentorship');

const createMentor = async () => {
	await addDoc(mentors, {
		id,
		fname,
		title,
		description,
		department,
		picture,
		experienceLevel
	}). then((docRef) => {
		alert("Data Successfully Submitted");
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});
}  

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
		const response=db.collection('Mentorship');
			const data=await response.get();	
			data.docs.forEach(item=>{
				setMentorsList([...mentorsList,item.data()])

			   })
		
	};

	const handleClick = (mentor) => {
		// console.log(mentor);
		setModalShown(true);
		setChosenMentor(mentor);
	};

	const mentorsCards = mentorsList.map((m, index) => {
		return (
			<Grid
				xs={4}
				sm={4}
				md={4}
				lg={4}
				xl={4}
				key={index + m.id}
				sx={{ px: 2, py: 2 }}
			>
				<Card>
					<CardMedia
						component="img"
						height="200"
						image={m.picture}
						alt="mentor picture"
						sx={{ objectFit: "cover", objectPosition: "center" }}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{m.name}
						</Typography>
						<Typography sx={{ fontSize: 16 }}>
							{m.title} - {m.department}
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{m.description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="medium" onClick={() => handleClick(m)}>
							Request Mentorship
						</Button>
					</CardActions>
				</Card>
			</Grid>
		);
	});

	return (
		<Grid direction="row" container>
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
					<Alert severity="success" sx={{ alignItems: "center" }}>
						Mentorship requested was sent!{" "}
						<IconButton onClick={() => setMentorApproved(false)} sx={{ ml: 8 }}>
							<CloseIcon color="info" />
						</IconButton>
					</Alert>
				</Slide>
			</Box>
		</Grid>
	);
}

export default Mentorship;

import { useContext, useEffect, useState } from "react";
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
	TextField,
	Select,
	MenuItem,
	ListItemText,
	Checkbox,
	InputAdornment,
	FormControl,
	InputLabel,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

import CloseIcon from "@mui/icons-material/Close";
import { Context } from "../../../context/Context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const categories = [
	{
		id: 1,
		value: "negatives",
		text: "Issues and Concerns",
	},
	{
		id: 2,
		value: "positives",
		text: "Cheers and Celebrations",
	},
	{
		id: 3,
		value: "neutrals",
		text: "General Topic",
	},
];

const NewTopicModal = ({ setModalShown }) => {
	const theme = useTheme();
	const { dummyPosts, setDummyPosts } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const [categoriesList, setCategoriesList] = useState("");
	const [hashtagInput, setHastagInput] = useState([]);
	const [title, setTitle] = useState("");

	const [userInput, setUserInput] = useState({
		title: "",
		hashtags: [],
		text: "",
		categories: "",
	});
	/* Firebase upload post */
	const [postText, setPostText] = useState("");

	const postsCollectionRef = collection(db, "Project");

	const createPost = async () => {
		// data: {
		// 	title: "",
		// 	hashtags: [""],
		// 	text: "",
		// 	categorie: ""
		// }
		//await addDoc(postsCollectionRef, { userInput });
	};

	const handleChange = (e) => {
		const {
			target: { value },
		} = e;
		setCategoriesList(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	const handleHashtagInput = (e) => {
		setHastagInput(e.target.value);
	};

	const updateInput = (e) => {
		if (e.target.name == "hashtags") {
			if (hashtagInput.trim().length < 1) return;
			setUserInput({
				...userInput,
				hashtags: [...userInput.hashtags, hashtagInput.trim()],
			});
			setHastagInput("");
		} else {
			setUserInput({
				...userInput,
				[e.target.name]: e.target.value,
			});
		}
	};

	const removeHashtag = (hash) => {
		let updatedHashtags = [...userInput.hashtags].filter((h) => {
			return h != hash;
		});
		setUserInput({ ...userInput, hashtags: [...updatedHashtags] });
	};

	const handleSubmit = () => {
		const ids = dummyPosts.map((p) => p.id);
		const newPost = {
			id: Math.max(...ids) + 1,
			title: userInput.title,
			text: userInput.text,
			likes: 0,
			comments: 0,
			date: "Just now",
			hashtags: [...userInput.hashtags],
			category: categoriesList,
		};
		setDummyPosts([newPost, ...dummyPosts]);
		setModalShown(false);
		// createPost({...userInput, categories: categoriesList[0]})
		// return;
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
			<Typography sx={{ px: 3, py: 1 }} variant="h6">
				Post a New Question
			</Typography>
			<DialogContent>
				<Grid container direction="column">
					<TextField
						variant="outlined"
						sx={{ width: "100%", mb: 3 }}
						placeholder="Title of your topic"
						name="title"
						onChange={updateInput}
					/>
					<Grid item container sx={{ width: "100%", mb: 3 }}>
						<Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ pr: 1 }}>
							<TextField
								value={categoriesList}
								onChange={handleChange}
								select // tell TextField to render select
								label="Category"
								defaultValue=""
								sx={{
									width: "100%",
									"&::label": {
										color: "red",
									},
								}}
							>
								{categories.map((category) => (
									<MenuItem key={category.value} value={category.text}>
										<Typography>{category.text}</Typography>
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ pl: 1 }}>
							<FormControl sx={{ width: "100%" }}>
								<TextField
									sx={{ width: "100%" }}
									variant="outlined"
									placeholder="Add hashtags"
									onChange={handleHashtagInput}
									value={hashtagInput}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Button
													type="submit"
													variant="contained"
													sx={{
														boxShadow: "none",
														height: "50px",
														mr: "-10px",
														backgroundColor: theme.palette.sidebar.main,
														"&:hover": {
															backgroundColor: theme.palette.sidebar.hover,
														},
													}}
													name="hashtags"
													onClick={updateInput}
												>
													Add
												</Button>
											</InputAdornment>
										),
									}}
								/>
							</FormControl>
						</Grid>
					</Grid>

					{userInput.hashtags.length > 0 && (
						<Grid
							container
							item
							direction="row"
							sx={{ width: "100%", mb: 3 }}
							justifyContent="flex-end"
						>
							{userInput.hashtags.map((h) => {
								return (
									<Grid
										key={h}
										item
										container
										direction="row"
										alignItems="center"
										sx={{
											backgroundColor: theme.palette.darkblue.main,
											borderRadius: "24px",
											width: "fit-content",
											px: 1.1,
											py: 0.5,
											margin: 0.5,
											color: theme.palette.sidebar.text,
										}}
									>
										<Typography>#{h}</Typography>
										<IconButton
											sx={{ width: "18px", height: "18px", ml: 0.5 }}
											onClick={() => removeHashtag(h)}
										>
											<CloseIcon
												sx={{
													fontSize: "14px",
													fontWeight: "bold",
													color: theme.palette.sidebar.text,
												}}
											/>
										</IconButton>
									</Grid>
								);
							})}
						</Grid>
					)}

					<TextField
						variant="outlined"
						sx={{ width: "100%", mb: 3 }}
						multiline
						rows={6}
						placeholder="Tell us what's on your mind"
						name="text"
						onChange={updateInput}
					/>
				</Grid>
			</DialogContent>
			<DialogActions sx={{ px: 3 }}>
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
					onClick={handleSubmit} //{createPost}
				>
					{loading ? (
						<CircularProgress size={24} sx={{ color: "white" }} />
					) : (
						"Post"
					)}
				</Button>
			</DialogActions>
		</Box>
	);
};

export default NewTopicModal;

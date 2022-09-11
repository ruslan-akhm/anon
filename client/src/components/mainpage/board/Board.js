import { useState, useEffect } from "react";
import {
	Grid,
	Typography,
	TextField,
	InputAdornment,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Dialog,
	Fab,
	Chip,
	Box,
	Icon,
} from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import NewTopicModal from "./NewTopicModal";

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

function Board(props) {
	//hook for the post title
	const [title, setTitle] = useState("");
	//hook for the post text
	const [postText, setPostText] = useState("");
	//state to display our boards onto the page in an array
	const [postLists, setPostList] = useState([]);
	const [modalShown, setModalShown] = useState(false);
	const handleChange = (e) => {
		console.log(e.target.value);
		// do filter by category here
		// also add filter by hash
	};

	const currentDate = new Date();
	const postDate = currentDate.toLocaleString("default", {
		weekday: "short",
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	const postsCollectionRef = collection(db, "Project");

	useEffect(() => {
		const getPosts = async () => {
			const data = await getDocs(postsCollectionRef);
			setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getPosts();
	});

	//variable to reference the specific collection in our database

	//async function that adds title, description etc. to our specific collection reference, you can pass user credentials as well into it.
	//NOT NEEDED ANYMORE
	// const createPost = async () => {
	// 	await addDoc(postsCollectionRef, { title, postText, date: postDate });
	// };

	return (
		<Grid direction="column">
			<Grid item>
				<Typography>Anon Board</Typography>
			</Grid>
			<Grid
				item
				container
				direction="row"
				alignItems={"center"}
				sx={{ border: "2px solid red" }}
			>
				<TextField
					id="input-with-icon-textfield"
					variant="outlined"
					placeholder="Search by hashtags"
					//label="TextField"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
									#
								</Typography>
							</InputAdornment>
						),
					}}
				/>

				<FormControl fullWidth sx={{ width: "120px", ml: 2 }}>
					<Select
						variant="outlined"
						onChange={handleChange}
						sx={{ outline: "none", border: "none" }}
					>
						{categories.map((category) => (
							<MenuItem key={category.value} value={category.value}>
								{category.text}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Grid item sx={{ height: "56px" }}>
					<Button
						variant="contained"
						sx={{ ml: 2, height: "100%", mt: 0 }}
						onClick={() => setModalShown(true)}
					>
						Ask new question
					</Button>
				</Grid>
			</Grid>
			<Dialog
				open={modalShown}
				onClose={() => setModalShown(false)}
				fullWidth={true}
				maxWidth={"md"}
			>
				<NewTopicModal setModalShown={setModalShown} />
			</Dialog>

			<Grid sx={{ px: 2, py: 2, display: "flex", flexDirection: "row" }}>
				{postLists.map((post) => {
					return (
						<div>
							<h1>{post.title}</h1>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Fab variant="extended" color="secondary">
									Issues/Concerns
								</Fab>
								<p>{post.date}</p>
							</Box>
							<p>{post.description}</p>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<a href="https://github.com/">{post.hashtags}</a>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<CommentIcon />
									<p>{post.counter}</p>
									<ThumbUpIcon />
									<p>{post.secondCounter}</p>
								</Box>
							</Box>
						</div>
					);
				})}
			</Grid>
		</Grid>
	);
}
export default Board;

import { useState, useEffect, useContext } from "react";
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
	Card,
	useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";

import NewTopicModal from "./NewTopicModal";
import { Context } from "../../../context/Context";

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

const dummyPosts = [
	{
		id: 1,
		title: "AC is too cold!",
		text: "Has anyone noticed how cold the AC is set up on the third floor? It's blowing a freezing cold air!",
		likes: 3,
		comments: 2,
		date: "1 day ago",
		hashtags: ["discomfort", "rationaleActionNeeded"],
		category: "Issues and Concerns",
	},
	{
		id: 2,
		title: "Promotion???",
		text: "I've been with the company for couple years now. I have been working hard, but I was never spoken to about a possible promotion. I see company just hires upper managers, when they could promote people who already contributed a lot of their time and energy into doing the work. I do not want to believe this is because I am a minority, but why else? This is unfair.",
		likes: 6,
		comments: 4,
		date: "3 days ago",
		hashtags: ["unfair", "racism"],
		category: "Issues and Concerns",
	},
	{
		id: 3,
		title: "When is the next company event?",
		text: "Hey team, when is our next event gonna be? Last thing we had was over 6 month ago. I would love to meet everybody on some cool activity. Laser tag or Axe throwing anyone?",
		likes: 11,
		comments: 1,
		date: "7 days ago",
		hashtags: ["events"],
		category: "General Topic",
	},
];

function Board(props) {
	const theme = useTheme();
	const [category, setCategory] = useState("");
	const [filters, setFilters] = useState({ hashtag: "", category: "" });
	//hook for the post title
	const [title, setTitle] = useState("");
	//hook for the post text
	const [postText, setPostText] = useState("");
	//state to display our boards onto the page in an array
	const [postLists, setPostList] = useState([]);
	const [modalShown, setModalShown] = useState(false);

	const currentDate = new Date();
	const postDate = currentDate.toLocaleString("default", {
		weekday: "short",
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	const postsCollectionRef = collection(db, "Project");

	useEffect(() => {
		// const getPosts = async () => {
		// 	const data = await getDocs(postsCollectionRef);
		// 	setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		// };
		// getPosts();
		setPostList(dummyPosts);
	}, []);

	useEffect(() => {
		if (filters.hashtag.length > 0 || filters.category.length > 0) {
			let updatedPosts = [...dummyPosts];
			if (filters.hashtag.length > 0) {
				updatedPosts = updatedPosts.filter((p) => {
					let arrOfMatches = p.hashtags.map((h) => {
						//console.log(h.startsWith(filters.hashtag));
						return h.startsWith(filters.hashtag);
					});
					if (arrOfMatches.includes(true)) {
						return true;
					} else return false;
					// console.log(x);
				});
			}
			if (filters.category.length > 0) {
				updatedPosts = updatedPosts.filter((c) => {
					return c.category == filters.category;
				});
			}
			setPostList([...updatedPosts]);
		} else {
			setPostList(dummyPosts);
		}
	}, [filters]);

	//variable to reference the specific collection in our database

	//async function that adds title, description etc. to our specific collection reference, you can pass user credentials as well into it.
	//NOT NEEDED ANYMORE
	// const createPost = async () => {
	// 	await addDoc(postsCollectionRef, { title, postText, date: postDate });
	// };

	const handleHashtagFilter = (e) => {
		setFilters({ ...filters, hashtag: e.target.value });
	};

	const handleCategoryFilter = (e) => {
		const {
			target: { value },
		} = e;
		setCategory(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
		setFilters({ ...filters, category: value });
		// console.log(e.target.value);
		// do filter by category here
		// also add filter by hash
	};

	return (
		<Grid
			direction="column"
			container
			sx={{
				backgroundColor: theme.palette.background.main,
			}}
		>
			<Box sx={{ px: 3, py: 2 }}>
				<Typography variant="h3">Anonymous Company Board</Typography>
			</Box>
			<Grid item container direction="row" alignItems={"center"} sx={{ px: 3 }}>
				<Grid item container xs={7} sm={7} md={7} lg={7} xl={7}>
					<TextField
						id="input-with-icon-textfield"
						variant="outlined"
						placeholder="Search by hashtags"
						sx={{ width: "100%" }}
						onChange={handleHashtagFilter}
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
				</Grid>
				<Grid item container xs={3} sm={3} md={3} lg={3} xl={3} sx={{ pl: 2 }}>
					<TextField
						value={category}
						onChange={handleCategoryFilter}
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
					{/* <FormControl fullWidth sx={{ width: "120px", ml: 2 }}>
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
					</FormControl> */}
				</Grid>
				<Grid
					item
					sx={{ height: "56px" }}
					container
					xs={2}
					sm={2}
					md={2}
					lg={2}
					xl={2}
				>
					<Button
						variant="contained"
						sx={{
							ml: 2,
							height: "100%",
							mt: 0,
							backgroundColor: theme.palette.green.main,
							"&:hover": {
								backgroundColor: theme.palette.green.hover,
							},
						}}
						onClick={() => setModalShown(true)}
					>
						Ask new question
					</Button>
				</Grid>
			</Grid>
			{(filters.hashtag.length > 0 || filters.category.length > 0) && (
				<Box sx={{ px: 2.5, py: 0.5 }}>
					<Button
						onClick={() => {
							setPostList(dummyPosts);
							setFilters({ hashtag: "", category: "" });
							setCategory("");
						}}
					>
						Clear filters
					</Button>
				</Box>
			)}
			<Grid
				sx={{
					px: 2,
					py: 2,
					display: "flex",
					flexDirection: "row",
				}}
				container
				item
			>
				{postLists.map((post) => {
					return (
						<Grid
							key={post.title}
							item
							sx={{
								padding: 1,
								height: "300px",
							}}
							xs={4}
							sm={4}
							md={4}
							lg={4}
							xl={4}
						>
							<Link
								to={"/post/" + post.id}
								style={{
									textDecoration: "none",
									width: "100%",
									height: "100%",
								}}
							>
								<Card
									sx={{
										width: "100%",
										height: "100%",
										transition: "0.3s",
										"&:hover": {
											transform: "scale(1.025)",
										},
									}}
								>
									<Box sx={{ padding: 1.5 }}>
										<Typography
											variant="h5"
											sx={{
												textOverflow: "ellipsis",
												overflow: "hidden",
												whiteSpace: "nowrap",
												fontWeight: "600",
											}}
										>
											{post.title}
										</Typography>
										<Grid
											alignItems="center"
											item
											container
											sx={{ width: "100%", mt: 1 }}
											direction="row"
										>
											<Typography
												sx={[
													{
														color: theme.palette.sidebar.text,
														px: 0.8,
														py: 0.3,
														borderRadius: "22px",
													},
													post.category == "Issues and Concerns"
														? { backgroundColor: theme.palette.darkred.main }
														: post.category == "General Topic"
														? { backgroundColor: theme.palette.lightblack.main }
														: { backgroundColor: theme.palette.green.main },
												]}
											>
												{post.category}
											</Typography>
											<Typography
												sx={{ ml: "auto", mr: 1, color: "lightgray" }}
											>
												{post.date}
											</Typography>
										</Grid>
										<Typography
											sx={{
												mt: 2,
												textOverflow: "ellipsis",
												overflow: "hidden",
												whiteSpace: "wrap",
												height: "100px",
												width: "auto",
												position: "relative",
												":after": {
													content: "''",
													position: "absolute",
													top: "0",
													bottom: "0",
													left: "-15px",
													right: "-15px",
													boxShadow: "inset white 0 -14px 10px",
												},
											}}
										>
											{post.text}
										</Typography>
										<Grid container item direction="row" sx={{ mt: 2 }}>
											<Grid
												xs={6}
												sm={6}
												md={6}
												lg={6}
												xl={6}
												container
												item
												direction="row"
												sx={{
													width: "fit-content",
												}}
											>
												{post.hashtags.map((h) => {
													return (
														<Typography
															sx={{
																color: theme.palette.darkblue.main,
																mr: 0.5,
															}}
														>
															#{h}
														</Typography>
													);
												})}
											</Grid>
											<Grid
												xs={6}
												sm={6}
												md={6}
												lg={6}
												xl={6}
												sx={{
													width: "fit-content",
												}}
												item
												container
												direction="row"
												justifyContent="flex-end"
											>
												<Grid
													item
													container
													direction="row"
													sx={{
														width: "fit-content",
														mr: 2,
													}}
												>
													<ChatIcon sx={{ mr: 0.5, color: "gray" }} />
													<Typography sx={{ color: "gray" }}>
														{post.comments}
													</Typography>
												</Grid>
												<Grid
													item
													container
													direction="row"
													sx={{
														width: "fit-content",
													}}
												>
													<ThumbUpIcon sx={{ mr: 0.5, color: "gray" }} />
													<Typography sx={{ color: "gray" }}>
														{post.likes}
													</Typography>
												</Grid>
											</Grid>
										</Grid>
									</Box>
								</Card>
							</Link>
						</Grid>
					);
				})}
			</Grid>
			<Dialog
				open={modalShown}
				onClose={() => setModalShown(false)}
				fullWidth={true}
				maxWidth={"md"}
				scroll="body"
			>
				<NewTopicModal setModalShown={setModalShown} />
			</Dialog>
		</Grid>
	);
}
export default Board;

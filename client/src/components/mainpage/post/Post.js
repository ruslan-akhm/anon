import React, { useContext, useState, useEffect } from "react";
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
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../../context/Context";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";

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

function Post(props) {
	const theme = useTheme();
	const location = useLocation();
	console.log(location);
	const [post, setPost] = useState({});

	useEffect(() => {
		console.log(location);
		const pathnameArr = location.pathname.split("/");
		const currentId = pathnameArr[pathnameArr.length - 1];
		let actedPost = dummyPosts.filter((p) => {
			console.log(p.id, currentId);
			return p.id == currentId;
		});
		setPost(actedPost[0]);
	}, []);

	return (
		<Grid
			container
			direction="column"
			sx={{ backgroundColor: theme.palette.background.main }}
		>
			<Grid
				item
				container
				alignItems="center"
				justifyContent="center"
				sx={{ px: 5, py: 3, width: "fit-content" }}
			>
				<Link
					to="/board"
					style={{ textDecoration: "none", width: "100%", height: "100%" }}
				>
					<Typography
						sx={{ fontSize: "16px", lineHeight: "16px", color: "gray" }}
					>
						<ArrowBackIcon sx={{ fontSize: "16px", mr: 0.5, color: "gray" }} />
						Back to main Board
					</Typography>
				</Link>
			</Grid>
			<Grid item container sx={{ px: 5, py: 2 }}>
				{post.hasOwnProperty("id") && (
					<Card
						sx={{
							width: "100%",
							height: "100%",
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
								<Typography sx={{ ml: "auto", mr: 1, color: "lightgray" }}>
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
										}}
									>
										<ThumbUpIcon sx={{ mr: 0.5, color: "gray" }} />
										<Typography sx={{ color: "gray" }}>{post.likes}</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Box>
					</Card>
				)}
			</Grid>
			<Grid item container>
				{/* <Grid
					item
					container
					direction="row"
					sx={{
						width: "fit-content",
						mr: 2,
					}}
				>
					<ChatIcon sx={{ mr: 0.5, color: "gray" }} />
					<Typography sx={{ color: "gray" }}>{post.comments}</Typography>
				</Grid> */}
				COMMENST HERE
			</Grid>
		</Grid>
	);
}

export default Post;

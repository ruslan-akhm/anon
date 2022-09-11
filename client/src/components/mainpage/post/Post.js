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
	IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../../context/Context";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Post(props) {
	const theme = useTheme();
	const location = useLocation();
	const pathnameArr = location.pathname.split("/");
	const currentId = pathnameArr[pathnameArr.length - 1];
	const {
		dummyPosts,
		setDummyPosts,
		dummyComments,
		setDummyComments,
		dummyUsers,
		user,
	} = useContext(Context);
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [textInput, setTextInput] = useState("");

	useEffect(() => {
		let actedPost = dummyPosts.filter((p) => {
			return p.id == currentId;
		});
		setPost(actedPost[0]);

		const actedComments = dummyComments.filter((c) => {
			return c.postId == currentId;
		});
		setComments([...actedComments]);
	}, []);

	const handleChange = (e) => {
		setTextInput(e.target.value);
	};

	const addComment = () => {
		if (!textInput || textInput.length < 0) {
			return;
		}

		const commentsIds = dummyComments.map((c) => c.id);
		const newComment = {
			id: Math.max(...commentsIds) + 1,
			date: "Just now",
			text: textInput.trim(),
			userId: user.id,
			postId: currentId,
		};
		console.log(post);
		let updatedPosts = [...dummyPosts];
		updatedPosts = updatedPosts.map((p) => {
			if (p.id == post.id) {
				p.comments++;
			}
			return p;
		});
		/* Update context */
		setDummyPosts([...updatedPosts]);
		setDummyComments([newComment, ...dummyComments]);
		/* Update current state */
		setComments([newComment, ...comments]);
	};

	const likePost = () => {
		let updatedPosts = [...dummyPosts];
		if (post.likedByUser) {
			setPost({ ...post, likedByUser: false, likes: post.likes - 1 });
			updatedPosts = updatedPosts.map((p) => {
				if (p.id == post.id) {
					p.likedByUser = false;
					p.likes--;
				}
				return p;
			});
		} else {
			setPost({ ...post, likedByUser: true, likes: post.likes + 1 });
			updatedPosts = updatedPosts.map((p) => {
				if (p.id == post.id) {
					p.likedByUser = true;
					p.likes++;
				}
				return p;
			});
		}
		setDummyPosts(updatedPosts);
	};

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
									{post.hashtags.map((h, index) => {
										return (
											<Typography
												key={index + h}
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
										alignItems="center"
									>
										<IconButton onClick={likePost}>
											<ThumbUpIcon
												sx={{
													mr: 0.5,
													color: post.likedByUser
														? theme.palette.darkblue.main
														: "gray",
												}}
											/>
										</IconButton>
										<Typography sx={{ color: "gray" }}>{post.likes}</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Box>
					</Card>
				)}
			</Grid>
			<Grid item container sx={{ px: 5, pt: 2 }}>
				<Grid item container>
					<TextField
						value={textInput}
						onChange={handleChange}
						sx={{ backgroundColor: "white", width: "100%" }}
						placeholder="Share your opinion..."
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
											backgroundColor: theme.palette.darkblue.main,
											"&:hover": {
												backgroundColor: theme.palette.lightblack.main,
											},
										}}
										name="hashtags"
										onClick={addComment}
									>
										Comment
									</Button>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item container sx={{ mt: 2 }} direction="column">
					{comments.map((c) => {
						let user = dummyUsers.filter((u) => u.id == c.userId);
						return (
							<Grid
								key={c.text}
								sx={{ my: 1 }}
								container
								item
								direction="column"
							>
								<Grid container item direction="row" alignItems="center">
									<AccountCircleIcon sx={{ fontSize: "34px", color: "gray" }} />
									<Typography sx={{ ml: 1, fontWeight: "bold" }}>
										{user[0].username}
									</Typography>
									<Typography sx={{ color: "gray", ml: 2 }}>
										{c.date}
									</Typography>
								</Grid>
								<Grid item sx={{ px: 2 }}>
									{" "}
									<Typography
										sx={{ borderLeft: "1px solid gray", px: 4, py: 1 }}
									>
										{c.text}
									</Typography>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Post;

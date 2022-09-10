import { useState } from "react";
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
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

import CloseIcon from "@mui/icons-material/Close";

const NewTopicModal = ({ setModalShown }) => {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "Project");

  const createPost = async () => {
    await addDoc(postsCollectionRef, { title, postText });
  };



	return (
		<Box sx={{ px: 2, py: 2 }}>
			<Grid container direction="row" justifyContent="flex-end">
				<IconButton onClick={() => setModalShown(false)}>
					<CloseIcon />
				</IconButton>
			</Grid>
			<DialogContent>
				<Grid direction="column"></Grid>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					sx={{ width: "100%" }}
					onClick={createPost}
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

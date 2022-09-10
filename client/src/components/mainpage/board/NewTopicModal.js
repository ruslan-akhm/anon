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

import CloseIcon from "@mui/icons-material/Close";

const NewTopicModal = ({ setModalShown }) => {
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		return;
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
					onClick={handleSubmit}
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

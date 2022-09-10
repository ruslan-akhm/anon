import { useState } from "react";
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
} from "@mui/material";

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
	const [modalShown, setModalShown] = useState(false);
	const handleChange = (e) => {
		console.log(e.target.value);
		// do filter by category here
		// also add filter by hash
	};

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
		</Grid>
	);
}
export default Board;

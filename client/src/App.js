import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import axios from "axios";

function App() {
	useEffect(() => {
		async function fetchData() {
			const resp = await axios.get("/api/test");
			console.log(resp);
		}
		fetchData();
	}, []);
	return (
		<Box>
			<Typography>Hello World!</Typography>
			<AcUnitIcon />
		</Box>
	);
}

export default App;

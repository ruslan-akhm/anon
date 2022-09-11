import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	typography: {
		button: {
			textTransform: "none",
		},
	},

	palette: {
		background: { main: "#F9FBFF" },
		sidebar: { main: "#232F3E", hover: "#131921", text: "#F9FBFF" },
		info: { main: "#fff" },
		green: { main: "#2E7D32", hover: "#1e5421" },
		darkblue: { main: "#0349A6" },
		darkred: { main: "#A50000" },
		lightblack: { main: "#333333" },
		// alert: { main: "#CD0000" },
		// green: { main: "#2B8737" },
		// greyscale70: { main: "#4D4D4D" },
		// link: { main: "#0066cc" },
		// linkHover: { main: "#00478F" },
		// linkVisited: { main: "#551A8B" },
		// primary: { main: "#333" },
		// secondary: { main: "#06C" },
		// systemBlack: { main: "#1A1A1A" },
		// warning: { main: "#FFD440" },
	},
});

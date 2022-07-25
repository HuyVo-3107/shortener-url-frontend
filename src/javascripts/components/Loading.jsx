import React from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";

const Loading = () => {
	return (
		<Backdrop open={true} sx={{ bgcolor: "transparent" }}>
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		</Backdrop>
	);
};

export default Loading;

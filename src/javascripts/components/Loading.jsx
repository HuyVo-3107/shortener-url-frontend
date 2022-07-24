import React from "react";
import { Backdrop, Box } from "@mui/material";

const Loading = () => {
	return (
		<Backdrop open={true} sx={{ bgcolor: "transparent" }}>
			<Box className="loading" sx={{ margin: "auto" }}>
				<div>
					<br />
				</div>
				<div>
					<br />
				</div>
				<div>
					<br />
				</div>
				<div>
					<br />
				</div>
			</Box>
		</Backdrop>
	);
};

export default Loading;

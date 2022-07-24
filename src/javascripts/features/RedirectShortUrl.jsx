import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LinkApi from "../api/LinkApi";

const RedirectShortUrl = () => {
	let navigate = useNavigate();
	let location = useLocation();

	const path = location.pathname.split("/s/")[1];
	const { data: data, isSuccess } = LinkApi.GetLink(path);
	console.log("data", data);

	useEffect(() => {
		if (isSuccess) {
			window.location.href = data?.url;
		}
	}, [isSuccess]);

	return (
		<React.Fragment>
			<Grid container sx={{ flexGrow: 1, backgroundColor: grey[200], height: "100vh" }} justifyContent="center" alignItems="center">
				<Grid item xl={3} lg={4} md={4} xs={12} sx={{ p: { xs: 2 } }}>
					<Typography variant="h6">Redirect to: {data?.url}</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default RedirectShortUrl;

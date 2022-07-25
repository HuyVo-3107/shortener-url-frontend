import React, { useState } from "react";
import { Grid, Typography, Box, IconButton, Button, Divider } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowBack, RefreshTwoTone } from "@mui/icons-material";
import UserApi from "../api/UserApi";
import Profile from "./Setting/Profile";
import PrivateTokenApi from "./Setting/PrivateTokenApi";
import { grey } from "@mui/material/colors";
import ChangePassword from "./Setting/ChangePassword";
const Setting = () => {
	const navigate = useNavigate();
	const { data: user, refetch } = UserApi.Information();
	return (
		<React.Fragment>
			<Box sx={{ width: "100%" }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<Box sx={{ borderBottom: 2, borderColor: "grey.200", display: { lg: "flex", md: "flex", xs: "block" } }}>
							<Box sx={{ borderBottom: { xl: 0, lg: 0, md: 0, xs: 2 }, borderColor: { xs: "grey.200" } }}>
								<IconButton aria-label="menu" component={NavLink} to="/dashboard/links">
									<ArrowBack />
								</IconButton>
							</Box>

							<Button sx={{ mt: "auto", mb: "auto", mr: 2, color: grey[700], borderColor: grey[700], "&:hover": { borderColor: grey[700] } }} startIcon={<RefreshTwoTone />} onClick={refetch}>
								<Typography sx={{ fontSize: 13, fontWeight: 500 }}>Refresh</Typography>
							</Button>
						</Box>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box padding={2} paddingY={0}>
							<Typography variant="h5">Profile</Typography>
							<Divider />
						</Box>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box paddingY={0}>
							<Box>
								<Grid container padding={2}>
									<Grid item xs={12}>
										<Box paddingBottom={2}>
											<Typography variant="h6">Preferences</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} md={10}>
										<Box paddingBottom={2}>
											<Grid container spacing={2}>
												<Grid item md={12}>
													<Profile defaultValue={user} callback={refetch} />
												</Grid>
												<Grid item md={12}>
													<Typography>
														<Typography component={"span"} fontWeight="bold">
															Email:{" "}
														</Typography>
														<Typography component={"span"}>{user.email}</Typography>
													</Typography>
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</Box>
							<Box>
								<Grid container padding={2}>
									<Grid item xs={12}>
										<Box paddingBottom={2}>
											<Typography variant="h6">API token</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} md={10}>
										<Box paddingBottom={2}>
											<Grid container spacing={2}>
												<Grid item md={12}>
													<PrivateTokenApi defaultValue={user} callback={refetch} />
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</Box>
							<Box>
								<Grid container padding={2}>
									<Grid item xs={12}>
										<Box paddingBottom={2}>
											<Typography variant="h6">Change password</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} md={10}>
										<Box paddingBottom={2}>
											<Grid container spacing={2}>
												<Grid item md={12}>
													<ChangePassword defaultValue={user} callback={refetch} />
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
};

export default Setting;

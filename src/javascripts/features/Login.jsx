import React, { useContext, useRef, useState } from "react";
import _ from "lodash";

import { Grid, Paper, Box, TextField, Typography, InputAdornment, IconButton, Button, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NotificationContext from "../context/notification";
import UserApi from "../api/UserApi";

const Login = () => {
	let navigate = useNavigate();
	let location = useLocation();

	const { setNotification } = useContext(NotificationContext);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const ref = useRef(null);
	const [isShowPassword, UpdateShowPassword] = useState(false);
	const [submitted, UpdateSubmitted] = useState(false);
	const redirect = _.last(location.hash.split("#")) === "" ? "/dashboard" : _.last(location.hash.split("#"));

	const onSubmit = (data) => {
		UserApi.Login(data, setNotification)
			.then(({ data, headers }) => {
				UpdateSubmitted(false);
				if (typeof data === "undefined") return;

				const { access_token, access_exp, refresh_token, refresh_exp } = data.data;

				localStorage.setItem("SA", access_token, { path: "/" });
				localStorage.setItem("SA_EXP", access_exp, { path: "/" });
				localStorage.setItem("HR", refresh_token, { path: "/" });
				localStorage.setItem("HR_EXP", refresh_exp, { path: "/" });

				navigate(redirect);
			})
			.catch((error) => {
				console.log(error.message);
				// setNotification({ open: true, message: error, variant: "error" }, true);
			});
	};

	return (
		<React.Fragment>
			<Grid container sx={{ flexGrow: 1, backgroundColor: grey[200], height: "100vh" }} justifyContent="center" alignItems="center">
				<Grid item xl={3} lg={4} md={4} xs={12} sx={{ p: { xs: 2 } }}>
					<Paper elevation={0}>
						<Box sx={{ padding: 4 }}>
							<Typography variant="h6" sx={{ marginBottom: 2 }}>
								Sign In
							</Typography>
							<form ref={ref} onSubmit={handleSubmit(onSubmit)}>
								<Box sx={{ mb: 3 }}>
									<Controller
										render={({ field }) => <TextField {...field} size="small" id="user-email" label="Email (*)" sx={{ minWidth: "100%" }} variant="standard" InputLabelProps={{ shrink: true }} />}
										type="text"
										name="email"
										defaultValue=""
										control={control}
										rules={{
											required: <Typography sx={{ fontSize: 13, color: grey[700] }}>email can't be empty.</Typography>,
											pattern: {
												value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/g,
												message: <Typography sx={{ fontSize: 13, color: grey[700] }}>email you was submitted is invalid</Typography>,
											},
										}}
									/>
									<ErrorMessage errors={errors} name="email" />
								</Box>
								<Box sx={{ marginBottom: 4 }}>
									<Controller
										render={({ field }) => (
											<TextField
												{...field}
												size="small"
												id="user-password"
												label="Password (*)"
												sx={{ minWidth: "100%" }}
												variant="standard"
												type={isShowPassword ? "text" : "password"}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end" style={{ marginTop: -16 }}>
															<IconButton aria-label="toggle password visibility" onClick={() => UpdateShowPassword(!isShowPassword)}>
																{isShowPassword ? <Visibility /> : <VisibilityOff />}
															</IconButton>
														</InputAdornment>
													),
												}}
												InputLabelProps={{ shrink: true }}
											/>
										)}
										name="password"
										defaultValue=""
										control={control}
										rules={{
											required: <Typography sx={{ fontSize: 13, color: grey[700] }}>password can't be empty.</Typography>,
										}}
									/>
									<ErrorMessage errors={errors} name="password" />
									<Box sx={{ marginTop: 1, width: "100%", textAlign: "right" }}>
										<Typography component={NavLink} to="/auth/register" sx={{ fontSize: 14, fontWeight: 500, textTransform: "capitalize", color: "blue" }}>
											Sign up
										</Typography>
									</Box>
								</Box>
								<Button variant="contained" type="submit" fullWidth={true} sx={{ mb: 2 }} disabled={submitted} startIcon={submitted ? <CircularProgress size={16} disableShrink /> : null}>
									<Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: "capitalize" }}>Sign In</Typography>
								</Button>
							</form>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default Login;

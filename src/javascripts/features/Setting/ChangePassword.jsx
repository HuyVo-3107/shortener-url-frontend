import React, { useContext, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { grey } from "@mui/material/colors";
import UserApi from "../../api/UserApi";
import NotificationContext from "../../context/notification";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = ({ defaultValue }) => {
	const { setNotification } = useContext(NotificationContext);

	const [isShowPassword, UpdateShowPassword] = useState({ current_password: false, new_password: false, new_password_confirmation: false });
	const [submitted, UpdateSubmitted] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors, isDirty },
		watch,
		reset,
	} = useForm();
	const password = useRef({});
	password.current = watch("new_password", "");

	const onSubmit = (data) => {
		UpdateSubmitted(true);

		UserApi.ChangePassword({ data: data }, setNotification)
			.then(({ data, status }) => {
				if (status == 200) setNotification({ open: true, message: "Change password success", variant: "success" }, true);
				UpdateSubmitted(false);
				reset();
			})
			.catch((exception) => {
				setNotification({ open: true, message: exception.message, variant: "error" }, true);
				UpdateSubmitted(false);
			});
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: { sx: "100%", md: "50%" } }}>
			<Box sx={{ marginBottom: 3 }}>
				<Controller
					render={({ field }) => (
						<TextField
							{...field}
							size="small"
							id="user-current-password"
							label="Current password (*)"
							sx={{ minWidth: "100%" }}
							variant="standard"
							type={isShowPassword.current_password ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end" style={{ marginTop: -16 }}>
										<IconButton aria-label="toggle password visibility" onClick={() => UpdateShowPassword((prev) => ({ ...prev, password: !prev.password }))}>
											{isShowPassword.current_password ? <Visibility /> : <VisibilityOff />}
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
						required: <Typography sx={{ fontSize: 13, color: grey[700] }}>Current password can't be empty.</Typography>,
					}}
				/>
				<ErrorMessage errors={errors} name="password" />
			</Box>
			<Box sx={{ marginBottom: 3 }}>
				<Controller
					render={({ field }) => (
						<TextField
							{...field}
							size="small"
							id="user-new-password"
							label="New password (*)"
							sx={{ minWidth: "100%" }}
							variant="standard"
							type={isShowPassword.new_password ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end" style={{ marginTop: -16 }}>
										<IconButton aria-label="toggle password visibility" onClick={() => UpdateShowPassword((prev) => ({ ...prev, new_password: !prev.new_password }))}>
											{isShowPassword.new_password ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							InputLabelProps={{ shrink: true }}
						/>
					)}
					name="new_password"
					defaultValue=""
					control={control}
					rules={{
						required: <Typography sx={{ fontSize: 13, color: grey[700] }}>New password can't be empty.</Typography>,
					}}
				/>
				<ErrorMessage errors={errors} name="new_password" />
			</Box>
			<Box sx={{ marginBottom: 3 }}>
				<Controller
					render={({ field }) => (
						<TextField
							{...field}
							size="small"
							id="user-new-password-confirmation"
							label="New password confirmation (*)"
							sx={{ minWidth: "100%" }}
							variant="standard"
							type={isShowPassword.new_password_confirmation ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end" style={{ marginTop: -16 }}>
										<IconButton aria-label="toggle password visibility" onClick={() => UpdateShowPassword((prev) => ({ ...prev, new_password_confirmation: !prev.new_password_confirmation }))}>
											{isShowPassword.new_password_confirmation ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							InputLabelProps={{ shrink: true }}
						/>
					)}
					name="new_password_confirmation"
					defaultValue=""
					control={control}
					rules={{
						required: <Typography sx={{ fontSize: 13, color: grey[700] }}>New password confirmation can't be empty.</Typography>,
						validate: (value) => value === password.current || <Typography sx={{ fontSize: 13, color: grey[700] }}>New password confirmation don't match with new password</Typography>,
					}}
				/>
				<ErrorMessage errors={errors} name="new_password_confirmation" />
			</Box>
			<Button color="primary" type="submit" variant="contained" size="small" disabled={submitted || !isDirty}>
				{submitted && <CircularProgress size={18} />}
				<Typography component="span" marginLeft={1}>
					Change Password
				</Typography>
			</Button>
		</Box>
	);
};

export default ChangePassword;

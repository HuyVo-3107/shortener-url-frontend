import React, { useContext, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { grey } from "@mui/material/colors";
import UserApi from "../../api/UserApi";
import NotificationContext from "../../context/notification";

const Profile = ({ defaultValue, callback }) => {
	const { setNotification } = useContext(NotificationContext);

	const [submitted, UpdateSubmitted] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors, isDirty },
	} = useForm();

	const onSubmit = (data) => {
		UpdateSubmitted(true);
		UserApi.Update({ user: data }, setNotification)
			.then(({ data, status }) => {
				console.log("data", data);
				if (data.user) {
					if (status == 200) setNotification({ open: true, message: "Update Link success", variant: "success" }, true);
				}
				callback();
				UpdateSubmitted(false);
			})
			.catch((exception) => {
				setNotification({ open: true, message: exception.message, variant: "error" }, true);
				UpdateSubmitted(false);
			});
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)}>
			<Box sx={{ mb: 3 }}>
				<Controller
					render={({ field }) => <TextField {...field} size="small" id="user-name" label="User name (*)" sx={{ minWidth: "100%" }} variant="standard" InputLabelProps={{ shrink: true }} />}
					type="text"
					name="name"
					defaultValue={defaultValue?.name || ""}
					control={control}
					rules={{
						required: <Typography sx={{ fontSize: 13, color: grey[700] }}>Name can't be empty.</Typography>,
					}}
				/>
				<ErrorMessage errors={errors} name="name" />
			</Box>
			<Button color="primary" type="submit" variant="contained" size="small" disabled={submitted || !isDirty}>
				{submitted && <CircularProgress size={18} />}
				<Typography component="span" marginLeft={1}>
					Update Info
				</Typography>
			</Button>
		</Box>
	);
};

export default Profile;

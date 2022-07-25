import React, { useContext, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { grey } from "@mui/material/colors";
import UserApi from "../../api/UserApi";
import NotificationContext from "../../context/notification";

const PrivateTokenApi = ({ defaultValue = {}, callback }) => {
	const { setNotification } = useContext(NotificationContext);

	const [submitted, UpdateSubmitted] = useState(false);

	const onSubmit = (data) => {
		UpdateSubmitted(true);
		// UserApi.Update({ user: data }, setNotification)
		// 	.then(({ data, status }) => {
		// 		console.log("data", data);
		// 		if (data.user) {
		// 			if (status == 200) setNotification({ open: true, message: "Update Link success", variant: "success" }, true);
		// 		}
		// 		callback();
		// 		UpdateSubmitted(false);
		// 	})
		// 	.catch((exception) => {
		// 		setNotification({ open: true, message: exception.message, variant: "error" }, true);
		// 		UpdateSubmitted(false);
		// 	});
	};

	return (
		<Box sx={{ mb: 3 }}>
			<TextField size="small" id="token-api" label="Token API" sx={{ minWidth: "100%" }} value={defaultValue?.token} variant="filled" InputLabelProps={{ shrink: true }} disabled />
		</Box>
	);
};

export default PrivateTokenApi;

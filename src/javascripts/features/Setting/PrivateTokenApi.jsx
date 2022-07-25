import React, { useContext, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { grey } from "@mui/material/colors";
import UserApi from "../../api/UserApi";
import NotificationContext from "../../context/notification";
import { Autorenew, AutorenewOutlined, ContentCopy, Visibility, VisibilityOff } from "@mui/icons-material";

const PrivateTokenApi = ({ defaultValue = {}, callback }) => {
	const { setNotification } = useContext(NotificationContext);

	const [submitted, UpdateSubmitted] = useState(false);
	const [isShowPassword, UpdateShowPassword] = useState(false);
	const [token, UpdateToken] = useState(defaultValue.api_token_private);

	const handleGenerateNewToken = (data) => {
		UpdateSubmitted(true);
		UserApi.GenerateNewToken(setNotification)
			.then(({ data, status }) => {
				console.log("data", data);
				if (data.token) {
					UpdateToken(data.token);
					setNotification({ open: true, message: "Generate new token success", variant: "success" }, true);
				}
				UpdateSubmitted(false);
			})
			.catch((exception) => {
				setNotification({ open: true, message: exception.message, variant: "error" }, true);
				UpdateSubmitted(false);
			});
	};

	const copyTextToClipboard = async (text) => {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand("copy", true, text);
		}
	};

	const handleCopyClick = (copyText = "") => {
		copyTextToClipboard(copyText)
			.then(() => {
				console.log("copyText", copyText);
				setNotification({ open: true, message: "Copied in Clipboard", variant: "success" }, true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<React.Fragment>
			<Box display="flex" sx={{ marginBottom: 3 }}>
				<Box sx={{ width: "80%", marginRight: 1 }}>
					<TextField
						size="small"
						id="user-token-api"
						sx={{ minWidth: "100%" }}
						variant="outlined"
						type={isShowPassword ? "text" : "password"}
						disabled
						value={token}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" style={{ marginRight: -10 }}>
									<IconButton aria-label="toggle password visibility" onClick={() => UpdateShowPassword(!isShowPassword)}>
										{isShowPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
						InputLabelProps={{ shrink: true }}
					/>
				</Box>
				<Box sx={{ display: "flex", alignItem: "center" }}>
					<Button sx={{ color: grey[700] }} startIcon={<ContentCopy />} onClick={() => handleCopyClick(token)}>
						<Typography sx={{ fontSize: 13, fontWeight: 500 }}>Copy</Typography>
					</Button>
				</Box>
			</Box>
			<Box display="flex" sx={{ marginBottom: 2 }}>
				<Button color="primary" type="submit" variant="contained" size="small" disabled={submitted} startIcon={submitted ? <CircularProgress size={18} /> : <AutorenewOutlined />} onClick={handleGenerateNewToken}>
					<Typography component="span" marginLeft={1}>
						GENERATE NEW TOKEN
					</Typography>
				</Button>
			</Box>
			<Box sx={{ width: "100%" }}>
				<Typography variant="caption" sx={{ color: grey[700] }}>{`* The way to use this token is to add to the header of request: {'Authorization': 'PrivateToken <Token>'}`}</Typography>
			</Box>
		</React.Fragment>
	);
};

export default PrivateTokenApi;

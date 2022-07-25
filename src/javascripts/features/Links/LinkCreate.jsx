import React, { useContext, useState } from "react";

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LinkForm from "./LinkForm";
import LinkApi from "../../api/LinkApi";
import NotificationContext from "../../context/notification";
import { ErrorMessage } from "@hookform/error-message";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const LinkCreate = ({ handleClose, open, callback, ...props }) => {
	const navigate = useNavigate();
	const { setNotification } = useContext(NotificationContext);
	const [submitted, UpdateSubmitted] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		UpdateSubmitted(true);
		LinkApi.Create({ link: data }, setNotification)
			.then(({ data, status }) => {
				if (data.link) {
					if (status == 201) setNotification({ open: true, message: "Create Link success", variant: "success" }, true);
					if (status == 301) {
						navigate(data.link?.shortener_path);
						setNotification({ open: true, message: "URL is exist", variant: "warning" }, true);
					}
				}
				callback();
				UpdateSubmitted(false);
				handleClose();
				reset();
			})
			.catch((exception) => {
				UpdateSubmitted(false);
				setNotification({ open: true, message: exception.message, variant: "error" }, true);
			});
	};

	return (
		<Dialog open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" fullWidth={true} maxWidth={"md"} scroll="paper">
			<Box component="form" onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle>
					<Typography variant="p">Create Link</Typography>
				</DialogTitle>
				<Divider />
				<DialogContent>
					<Box sx={{ mb: 3 }}>
						<Controller
							render={({ field }) => <TextField {...field} size="small" id="url" label="URL (*)" sx={{ minWidth: "100%" }} variant="standard" InputLabelProps={{ shrink: true }} />}
							type="text"
							name="link[url]"
							defaultValue={""}
							control={control}
							rules={{
								required: <Typography sx={{ fontSize: 13, color: grey[700] }}>URL can't be empty.</Typography>,
								pattern: {
									value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g,
									message: <Typography sx={{ fontSize: 13, color: grey[700] }}>URL you was submitted is invalid</Typography>,
								},
							}}
						/>
						<ErrorMessage errors={errors} name="link[url]" />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button color="primary" type="submit" variant="contained">
						{submitted && <CircularProgress size={18} />}
						<Typography component="span" marginLeft={1}>
							Create
						</Typography>
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default LinkCreate;

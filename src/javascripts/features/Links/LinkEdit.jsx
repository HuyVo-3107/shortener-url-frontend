import React, { useContext, useState } from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import LinkApi from "../../api/LinkApi";
import NotificationContext from "../../context/notification";
import { ErrorMessage } from "@hookform/error-message";
import { grey } from "@mui/material/colors";

const LinkEdit = ({ handleClose, open, defaultValue, callback, ...props }) => {
	const { setNotification } = useContext(NotificationContext);
	const [submitted, UpdateSubmitted] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		UpdateSubmitted(true);
		LinkApi.Update({ link: data, shortener_path: defaultValue?.shortener_path }, setNotification)
			.then(({ data, status }) => {
				console.log("data", data);
				console.log("status", status);
				if (data.link) {
					if (status == 200) setNotification({ open: true, message: "Update Link success", variant: "success" }, true);
				}
				callback();

				handleClose();
				UpdateSubmitted(false);
			})
			.catch((exception) => {
				setNotification({ open: true, message: exception.message, variant: "error" }, true);
				UpdateSubmitted(false);
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
							render={({ field }) => <TextField {...field} size="small" id="url" label="Title (*)" sx={{ minWidth: "100%" }} variant="standard" InputLabelProps={{ shrink: true }} />}
							type="text"
							name="link[title]"
							defaultValue={defaultValue?.title || ""}
							control={control}
							rules={{
								required: <Typography sx={{ fontSize: 13, color: grey[700] }}>Title can't be empty.</Typography>,
							}}
						/>
						<ErrorMessage errors={errors} name="link[title]" />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button color="primary" type="submit" variant="contained" disabled={submitted}>
						{submitted && <CircularProgress size={18} />}
						<Typography component="span" marginLeft={1}>
							Update
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

export default LinkEdit;

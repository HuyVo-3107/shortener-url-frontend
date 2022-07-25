import React from "react";

import { Box, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

const LinkForm = ({ control, errors, defaultValues, type }) => {
	return (
		<React.Fragment>
			{type !== "create" && (
				<Box sx={{ mb: 3 }}>
					<Controller
						render={({ field }) => <TextField {...field} size="small" id="url" label="Title (*)" sx={{ minWidth: "100%" }} variant="standard" InputLabelProps={{ shrink: true }} />}
						type="text"
						name="link[title]"
						defaultValue={defaultValues?.title || ""}
						control={control}
						rules={{
							required: <Typography sx={{ fontSize: 13, color: grey[700] }}>Title can't be empty.</Typography>,
						}}
					/>
					<ErrorMessage errors={errors} name="link[title]" />
				</Box>
			)}
		</React.Fragment>
	);
};

export default LinkForm;

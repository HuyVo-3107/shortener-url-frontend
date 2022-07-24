import React, { useState } from "react";

import { useSnackbar } from "notistack";

const NotificationContext = React.createContext();

export const NotificationProvider = (props) => {
	const { enqueueSnackbar } = useSnackbar();

	const defaults = { open: false, message: "", variant: "success", duration: 5000 };

	const setNotification = (notification = defaults, snackbar = false) => {
		if (snackbar)
			return enqueueSnackbar(notification.message, {
				anchorOrigin: {
					horizontal: "left",
					vertical: "bottom",
				},
				variant: notification.variant,
			});

		setState((prevState) => ({ ...prevState, notification: { ...prevState.notification, ...notification } }));
	};

	const [state, setState] = useState({
		notification: defaults,
		setNotification: setNotification,
	});

	return <NotificationContext.Provider value={state}>{props.children}</NotificationContext.Provider>;
};

export default NotificationContext;

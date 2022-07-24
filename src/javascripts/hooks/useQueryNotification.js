import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import NotificationContext from "../context/notification";

export const useQueryNotification = ({ key, func, options = {} }) => {
	const { setNotification } = useContext(NotificationContext);

	const query = useQuery(key, func, {
		onError: (error) => {
			if (options.alert) setNotification({ open: true, message: error.message, severity: "error" }, true);
		},
		onSuccess: (data) => {
			if (options.alert && data.error) return setNotification({ open: true, message: data.error.message, severity: "error" }, true);
		},
		refetchOnWindowFocus: false,
		keepPreviousData: true,
		staleTime: 3600,
		retry: false,
		...options,
	});
	// if (query.isError || (query.isSuccess && query.data && query.data.error && options.alert)) query.data = options.placeholderData || "";
	// if (query.isSuccess && query.data && query.data.error && !options.alert) query.data = undefined;

	return query;
};

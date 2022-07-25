import * as constant from "../constant/common";
import { xhr, xhr_simple } from "../xhr";

import { useQueryNotification } from "../hooks/useQueryNotification";
const queryString = require("query-string");

class LinkApi {
	List = ({ params }) => {
		const paramsQueryString = queryString.stringify(params, { skipNull: true, arrayFormat: "bracket" });

		return useQueryNotification({
			key: ["link.list", params],
			func: async () => {
				const { data } = await xhr(`${constant.API_URL}/links?${paramsQueryString}`, {}, "GET", {}, {});

				if (data.error) {
					return {
						links: [],
						pagination: {
							initialState: {
								pageSize: 0,
								pageIndex: 0,
							},
							pageCount: 0,
							total: 0,
						},
						total: 0,
					};
				}
				let { links = [], pagination } = data.data;

				return {
					links: links || [],
					pagination: {
						initialState: {
							pageSize: pagination.page_size || 0,
							pageIndex: pagination.page - 1 || 0,
						},
						pageCount: pagination.total_pages || 0,
						total: pagination.total,
					},
					total: pagination.total,
				};
			},
			options: {
				staleTime: 86400,
				alert: true,
				suspense: true,
				keepPreviousData: true,
			},
		});
	};

	GetLink = (short_path) => {
		return useQueryNotification({
			key: ["link.list", short_path],
			func: async () => {
				const { data } = await xhr_simple(`${constant.API_URL}/links/${short_path}/get_url`, {}, "GET", {}, {});

				if (data.error) {
					return data;
				}

				return data.data;
			},
			options: {
				staleTime: 86400,
				alert: true,
				suspense: true,
				keepPreviousData: true,
			},
		});
	};

	Create = ({ link }, callback) => {
		return xhr(`${constant.API_URL}/links`, link, "POST").then(({ data }) => {
			if (typeof data.errors !== "undefined") {
				if (typeof data.errors !== "undefined") {
					callback({ open: true, message: data.errors?.message, variant: "error" }, true);
				}

				return {
					data: undefined,
					error: data.errors,
				};
			}

			return {
				data: data.data,
				status: data.status,
			};
		});
	};

	Detail = ({ short_path }) => {
		return useQueryNotification({
			key: ["link.detail", short_path],
			func: async () => {
				const { data } = await xhr(`${constant.API_URL}/links/${short_path}`, {}, "GET", {}, {});
				if (data.error) {
					return {
						link: {},
					};
				}
				let { link } = data.data;

				return {
					link: { ...link } || {},
				};
			},
			options: {
				staleTime: 86400,
				alert: true,
				suspense: true,
				keepPreviousData: true,
				useErrorBoundary: (error) => error.response?.status >= 500,
			},
		});
	};

	Update = ({ link, shortener_path }, callback) => {
		return xhr(`${constant.API_URL}/links/${shortener_path}`, link, "PUT").then(({ data }) => {
			if (typeof data.errors !== "undefined") {
				if (typeof data.errors !== "undefined") {
					callback({ open: true, message: data.errors?.message, variant: "error" }, true);
				}

				return {
					data: undefined,
					error: data.errors,
				};
			}

			return {
				data: data.data,
				status: data.status,
			};
		});
	};
}
export default LinkApi = new LinkApi();

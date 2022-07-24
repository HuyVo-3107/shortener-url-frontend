import * as constant from "../constant/common";
import { xhr } from "../xhr";

import { useQueryNotification } from "../hooks/useQueryNotification";
const queryString = require("query-string");

class LinkApi {
	List = ({ params }) => {
		const paramsQueryString = queryString.stringify(params, { skipNull: true, arrayFormat: "bracket" });

		return useQueryNotification({
			key: ["link.list", params],
			func: async () => {
				console.log("LinkApi");
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
		console.log("short_path", short_path);
		return useQueryNotification({
			key: ["link.list", short_path],
			func: async () => {
				console.log("LinkApi");
				const { data } = await xhr(`${constant.API_URL}/links/${short_path}/get_url`, {}, "GET", {}, {});

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
}
export default LinkApi = new LinkApi();

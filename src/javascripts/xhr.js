import axios from "axios";
import * as constant from "./constant/common.js";

const axios_simple = axios.create();
const axios_config = axios.create();

const CancelToken = axios.CancelToken;

const refresh_token = async () => {
	return await axios_simple({
		method: "POST",
		url: constant.AUTH_URL + "/auth/refresh_token",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("SA"),
		},
		withCredentials: true,
	}).catch((exception) => {
		return { data: { status: exception.response.data.status, message: exception.message } };
	});
};

axios_config.interceptors.request.use(
	async (config) => {
		// perform a task before the request is sent
		const url = config.url;

		if (typeof url === "undefined") return config;

		if (url !== constant.AUTH_URL + "/auth/login" && url !== constant.AUTH_URL + "/auth/refresh_token") {
			config.headers.Authorization = localStorage.getItem("SA");

			if (localStorage.getItem("SA_EXP") < Math.floor(Date.now() / 1000)) {
				await refresh_token().then(({ data }) => {
					if (data.status === 200) {
						localStorage.setItem("SA", data.data["access_token"], { path: "/" });
						localStorage.setItem("SA_EXP", data.data["access_exp"], { path: "/" });

						config.headers.Authorization = "Bearer " + data.data["access_token"];
					} else if (data.status === 401) {
						config = {
							...config,
							cancelToken: new CancelToken((cancel) => cancel("cancelled.request")),
						};
					}
				});
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const xhr = async (url, data, method, headers = {}, options) => {
	headers = {
		"X-Requested-With": "XMLHttpRequest",
		Authorization: "Bearer " + localStorage.getItem("SA"),
		crossdomain: true,
		...headers,
	};

	return await axios_config({
		method: method,
		url: url,
		headers: headers,
		data: data,
		...options,
	});
};

export const xhr_simple = async (url, data, method, headers, option) => {
	headers = {
		"X-Requested-With": "XMLHttpRequest",
		crossdomain: true,
		...headers,
	};

	return await axios_simple({
		method: method,
		url: url,
		headers: headers,
		data: data,
		...option,
	}).catch((error) => {
		return { data: { status: error.response.data.status, message: error.message } };
	});
};

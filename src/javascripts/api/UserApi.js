import * as constant from "../constant/common";
import { xhr, xhr_simple } from "../xhr";

import { useQueryNotification } from "../hooks/useQueryNotification";

class UserApi {
	Login = (body, callback) => {
		return xhr_simple(`${constant.AUTH_URL}/auth/login`, body, "POST").then(({ data }) => {
			if (data.status !== 200 || typeof data.errors !== "undefined") {
				if (typeof data.errors !== "undefined") {
					callback({ open: true, message: data.errors?.message, variant: "error" }, true);
				}

				return {
					data: undefined,
				};
			}

			return {
				data: data,
			};
		});
	};

	Information = () => {
		return useQueryNotification({
			key: ["user.information"],
			func: async () => {
				console.log("User information request");
				const { data } = await xhr(`${constant.API_URL}/user/user_info`, {}, "GET", {}, {});

				if (data.error) return data;

				return data.data.user;
			},
			options: {
				staleTime: 86400,
				alert: true,
			},
		});
	};

	Update = ({ user }, callback) => {
		return xhr(`${constant.API_URL}/user`, user, "PUT").then(({ data }) => {
			console.log("data", data);
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
export default UserApi = new UserApi();

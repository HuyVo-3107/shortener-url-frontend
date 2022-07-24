import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import UserApi from "../api/UserApi";

const ProtectedRoute = (props) => {
	let location = useLocation();
	const { isFetching: loading, isSuccess: success } = UserApi.Information();
	return !loading ? success ? <Outlet /> : <Navigate to={`/auth/login/${location.pathname !== "/" ? "#" + location.pathname : ""}`} replace={true} /> : null;
};

export default ProtectedRoute;

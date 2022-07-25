import React from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "./context/notification";
import ProtectedRoute from "./containers/ProtectedRoute";
import DashboardRoute from "./containers/DashboardRoute";
import Loading from "./components/Loading";
import Login from "./features/Login";
import { SnackbarProvider } from "notistack";
import ErrorBoundary from "./containers/ErrorBoundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Links from "./features/Links";
import RedirectShortUrl from "./features/RedirectShortUrl";
import LinkDetail from "./features/Links/LinkDetail";
import Setting from "./features/Setting";

const App = () => {
	const queryClient = new QueryClient();
	return (
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<SnackbarProvider>
					<NotificationProvider>
						<React.Suspense fallback={<Loading />}>
							<Router>
								<Routes>
									<Route path="/auth/login" element={<Login />} />
									<Route path="/dashboard/*" element={<ProtectedRoute />}>
										<Route path="/dashboard/*" element={<DashboardRoute />}>
											<Route path="links" element={<Links />} />
											<Route path="links/:short_path" element={<LinkDetail />} />
											<Route path="setting" element={<Setting />} />

											<Route path="*" element={<Navigate to={`/dashboard/links`} replace={true} />} />
										</Route>
									</Route>
									<Route path="/s/*" element={<RedirectShortUrl />} />
									<Route path="/*" element={<Navigate to={`/dashboard/links`} replace={true} />} />
								</Routes>
							</Router>
						</React.Suspense>
					</NotificationProvider>
				</SnackbarProvider>
				{/* <ReactQueryDevtools initialIsOpen /> */}
			</QueryClientProvider>
		</ErrorBoundary>
	);
};

export default App;

import React from "react";

import { Grid, Typography, Alert, Link } from "@mui/material";
import { grey } from "@mui/material/colors";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false,
			message: "",
		};
	}

	static getDerivedStateFromError(error) {
		return { error: true };
	}

	componentDidCatch(error) {
		this.setState({ message: error.message });
	}

	render() {
		if (this.state.error) {
			return (
				<Grid container sx={{ flexGrow: 1, backgroundColor: grey[200], height: "100vh" }} justifyContent="center" alignItems="center">
					<Grid item xl={6} lg={6} md={6} xs={12} sx={{ p: { xs: 2 } }}>
						<Typography variant="h3" sx={{ mb: 2 }}>
							For some reason, This page couldn't load
						</Typography>
						<Typography sx={{ mb: 2, fontSize: 14 }}>We're quite sorry about this! A few things to try:</Typography>
						{this.state.message && this.state.message !== "" && (
							<Alert severity="warning" sx={{ mb: 2 }}>
								{this.state.message}
							</Alert>
						)}
						<Typography sx={{ mb: 1, fontSize: 14 }}>
							-{" "}
							<Link component="span" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
								<b>Refresh This Page</b>
							</Link>
							, maybe your network has a problem when downloading one of our modules.
						</Typography>
						<Typography sx={{ mb: 2, fontSize: 14 }}>
							-{" "}
							<Link target="_blank" href="https://www.pcmag.com/how-to/how-to-clear-your-cache-on-any-browser">
								<b>Clear Your Browser Caches</b>
							</Link>
							, because we always upgrade/replace new modules for this page. If you have visited on before, maybe some cache of our module was out date.
						</Typography>
					</Grid>
				</Grid>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

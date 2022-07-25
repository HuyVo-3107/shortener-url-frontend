import React, { useState } from "react";

import { Box, Button, Divider, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { LinkOutlined, LogoutOutlined, Settings, SettingsOutlined } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import { Link, NavLink, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { grey } from "@mui/material/colors";
import clsx from "clsx";
import Links from "../features/Links";
import Loading from "../components/Loading";
import LinkDetail from "../features/Links/LinkDetail";
import { ContentCut } from "@mui/icons-material";

const ToolbarStyles = makeStyles((theme) => ({
	drawer: {
		width: 240,
		flexShrink: 0,
		whiteSpace: "nowrap",
		"& .MuiListItem-root": {
			padding: `8px `,
		},
	},
}));

const DashboardRoute = () => {
	const classes = ToolbarStyles();
	const location = useLocation();

	const handleLogout = () => {
		localStorage.clear();
		window.location.href = "/auth/login/";
	};

	return (
		<React.Fragment>
			<Box sx={{ display: "flex" }}>
				<Drawer variant="permanent" position="relative" className={clsx(classes.drawer)}>
					<List component="nav" dense={true}>
						<ListItem replace sx={{ width: "240px" }}>
							<ListItemText disableTypography>
								<Typography sx={{ my: "auto", fontSize: 16, color: grey[700], fontWeight: 500 }}>Shortener URLs</Typography>
							</ListItemText>
						</ListItem>
						<Divider />
						<Box minHeight={250}>
							<ListItem button component={NavLink} selected={location.pathname == "/dashboard/links"} to={"/dashboard/links"} sx={{ width: "240px" }}>
								<ListItemIcon>
									<LinkOutlined />
								</ListItemIcon>
								<ListItemText disableTypography>
									<Typography sx={{ my: "auto", fontSize: 14, color: grey[700], fontWeight: 500 }}>All links</Typography>
								</ListItemText>
							</ListItem>
							<ListItem button component={NavLink} selected={location.pathname == "/dashboard/setting"} to={"/dashboard/setting"} sx={{ width: "240px" }}>
								<ListItemIcon>
									<SettingsOutlined />
								</ListItemIcon>
								<ListItemText disableTypography>
									<Typography sx={{ my: "auto", fontSize: 14, color: grey[700], fontWeight: 500 }}>Setting</Typography>
								</ListItemText>
							</ListItem>
						</Box>
						<Divider />
						<ListItem replace sx={{ width: "240px" }} component={Button} onClick={() => handleLogout()}>
							<ListItemIcon>
								<LogoutOutlined />
							</ListItemIcon>
							<ListItemText disableTypography>
								<Typography sx={{ my: "auto", fontSize: 14, color: grey[700], fontWeight: 500 }}>Logout</Typography>
							</ListItemText>
						</ListItem>
					</List>
				</Drawer>
				<Box sx={{ width: "100%" }}>
					<React.Suspense fallback={<Loading />}>
						<Outlet />
					</React.Suspense>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default DashboardRoute;

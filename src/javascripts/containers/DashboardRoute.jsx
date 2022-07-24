import React, { useState } from "react";

import { Box, Divider, Drawer, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, NavLink, Outlet, Route, Routes } from "react-router-dom";
import { grey } from "@mui/material/colors";
import clsx from "clsx";
import Links from "../features/Links";
import Loading from "../components/Loading";

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
	const [openDrawer, toggleDrawer] = useState(false);
	const classes = ToolbarStyles();

	return (
		<React.Fragment>
			<Box sx={{ display: "flex" }}>
				<Drawer
					variant="permanent"
					position="relative"
					className={clsx(classes.drawer)}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: openDrawer,
							[classes.drawerClose]: !openDrawer,
						}),
					}}>
					<List component="nav" dense={true}>
						<ListItem replace sx={{ width: "240px" }}>
							<ListItemText disableTypography>
								<Typography sx={{ my: "auto", fontSize: 16, color: grey[700], fontWeight: 500 }}>Shortener URLs</Typography>
							</ListItemText>
						</ListItem>

						<ListItem button component={NavLink} selected exact to={"/dashboard/links"} activeClassName="active" replace sx={{ width: "240px" }}>
							<ListItemText disableTypography>
								<Typography sx={{ my: "auto", fontSize: 14, color: grey[700], fontWeight: 500 }}>All links</Typography>
							</ListItemText>
						</ListItem>
						<ListItem button component={NavLink} exact to={"/"} activeClassName="active" replace sx={{ width: "240px" }}>
							<ListItemText disableTypography>
								<Typography sx={{ my: "auto", fontSize: 14, color: grey[700], fontWeight: 500 }}>Setting</Typography>
							</ListItemText>
						</ListItem>
						<Divider />
						<ListItem replace sx={{ width: "240px" }}>
							<ListItemText disableTypography>
								<Typography sx={{ my: "auto", fontSize: 14, color: grey[700], fontWeight: 500 }}>Logout</Typography>
							</ListItemText>
						</ListItem>
					</List>
				</Drawer>
				<Box>
					<React.Suspense fallback={<Loading />}>
						<Outlet />
					</React.Suspense>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default DashboardRoute;

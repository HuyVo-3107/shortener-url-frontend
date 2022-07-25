import React, { useContext, useEffect, useState } from "react";

import { Backdrop, Box, Button, CircularProgress, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { AddTwoTone, ArrowBack, RefreshTwoTone, LinkOutlined, ContentCopy, Edit } from "@mui/icons-material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LinkApi from "../../api/LinkApi";
import Loading from "../../components/Loading";
import { grey } from "@mui/material/colors";
import NotificationContext from "../../context/notification";
import LinkEdit from "./LinkEdit";

const LinkDetail = () => {
	const { setNotification } = useContext(NotificationContext);
	const [modal, setModal] = useState({ open: false });

	const navigate = useNavigate();
	const { short_path } = useParams();
	console.log("short_path", short_path);
	const { data: data, refetch, isError } = LinkApi.Detail({ short_path: short_path });
	const { link } = data || {};
	console.log("data", link);

	useEffect(() => {
		if (isError) {
			navigate("/dashboard/links");
		}
	}, [isError]);

	const copyTextToClipboard = async (text) => {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand("copy", true, text);
		}
	};

	const handleCopyClick = (copyText) => {
		// Asynchronously call copyTextToClipboard
		copyTextToClipboard(copyText)
			.then(() => {
				// If successful, update the isCopied state value
				console.log("copyText", copyText);
				setNotification({ open: true, message: "Copied in Clipboard", variant: "success" }, true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleModal = (props) => {
		setModal((prev) => ({ ...prev, ...props }));
	};

	return (
		<React.Fragment>
			<Box sx={{ width: "100%" }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<Box sx={{ borderBottom: 2, borderColor: "grey.200", display: { lg: "flex", md: "flex", xs: "block" } }}>
							<Box sx={{ borderBottom: { xl: 0, lg: 0, md: 0, xs: 2 }, borderColor: { xs: "grey.200" } }}>
								<IconButton aria-label="menu" component={NavLink} to="/dashboard/links">
									<ArrowBack />
								</IconButton>
							</Box>
							<Button sx={{ mt: "auto", mb: "auto", mr: 2 }} color="primary" startIcon={<RefreshTwoTone />} onClick={refetch}>
								<Typography sx={{ fontSize: 13, fontWeight: 500 }}>Refresh</Typography>
							</Button>
						</Box>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box padding={2} paddingBottom={0} paddingTop={0}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={12}>
									<Box sx={{ alignItems: "center", display: "flex" }} borderRadius={1} padding={1}>
										<Box width={"100%"}>
											<Typography variant="h6">{link.title}</Typography>
										</Box>
										<Box>
											<Button sx={{ color: grey[700], borderColor: grey[700], "&:hover": { borderColor: grey[700] } }} variant="outlined" startIcon={<Edit />} onClick={() => handleModal({ open: true })}>
												<Typography sx={{ fontSize: 13, fontWeight: 500 }}>Edit</Typography>
											</Button>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={12} md={12}>
									<Box border={1} borderColor={"grey.500"} sx={{ alignItems: "center", display: "flex" }} borderRadius={1} padding={1}>
										<Box width={"100%"}>
											<Typography component="a" rel="noopener noreferrer" color={"grey.700"} href={link.shortener_url} target="_blank" sx={{ textDecoration: "unset", fontSize: 18 }}>
												<Box component={"span"} sx={{ alignItems: "center", display: "flex" }}>
													<LinkOutlined />{" "}
													<Typography component="span" marginLeft={1}>
														{link.shortener_url}
													</Typography>
												</Box>
											</Typography>
										</Box>

										<Box>
											<Button sx={{ color: grey[700] }} startIcon={<ContentCopy />} onClick={() => handleCopyClick(link.shortener_url)}>
												<Typography sx={{ fontSize: 13, fontWeight: 500 }}>Copy</Typography>
											</Button>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={12} md={12}>
									<Typography variant="p">
										<Typography variant="span" fontWeight={"bold"}>
											Destination:
										</Typography>{" "}
										{link.url}
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box padding={2} paddingBottom={0} paddingTop={0}>
							<Divider />
						</Box>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box padding={2} paddingBottom={0} paddingTop={0}>
							<Grid container>
								<Grid item>
									<Box component={Paper} padding={1}>
										<Typography variant="h6">{link.clicked}</Typography>
										<Typography fontSize={12}>TOTAL CLICK</Typography>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<LinkEdit open={modal.open} defaultValue={link} handleClose={() => handleModal({ open: false })} callback={refetch} />
		</React.Fragment>
	);
};

export default LinkDetail;

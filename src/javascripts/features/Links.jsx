import React, { useState } from "react";
import { Grid, Typography, Box, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import LinkApi from "../api/LinkApi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AddTwoTone, ArrowBack, RefreshTwoTone } from "@mui/icons-material";
import LinkCreate from "./Links/LinkCreate";

const Links = () => {
	const navigate = useNavigate();
	const [prev, setPrev] = useState({ page: 1, pageSize: 10 });
	const [modal, setModal] = useState({ open: false });

	const { data: data, refetch, isFetching, isLoading } = LinkApi.List({ params: prev });
	const { links = [], pagination = {} } = data || {};
	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 100,
			valueGetter: (params) => params.id,
			renderCell: (params) => (
				<Box width="100%" onClick={() => navigate(params.row.shortener_path)}>
					{params.value}
				</Box>
			),
		},
		{
			field: "title",
			headerName: "Title",
			width: 300,
			valueGetter: (row) => row.row.title,
			renderCell: (params) => (
				<Box width="100%" onClick={() => navigate(params.row.shortener_path)}>
					{params.value}
				</Box>
			),
		},
		{
			field: "shortener_url",
			headerName: "",
			width: 300,
			valueGetter: (row) => row.row.shortener_url,
			renderCell: (params) => {
				return (
					<a rel="noopener noreferrer" href={params.value} target="_blank">
						{params.value}
					</a>
				);
			},
		},
		{
			field: "clicked",
			headerName: "TOTAL CLICKS",
			type: "number",
			width: 150,
			valueGetter: (row) => row.row.clicked,
		},
	];

	const handlePageChange = (page) => {
		console.log("page", page);
		const data = _.merge(prev, { page: (page += 1) });
		setPrev((prevData) => ({ ...prevData, ...data }));
	};

	const handlePageSizeChange = (pageSize) => {
		if (pageSize !== prev.pageSize) {
			const data = _.merge(prev, { page: 1, pageSize: pageSize });
			setPrev((prevData) => ({ ...prevData, ...data }));
		}
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
								<IconButton aria-label="menu" component={NavLink} to="/dashboard/">
									<ArrowBack />
								</IconButton>
							</Box>
							<Button sx={{ mt: "auto", mb: "auto", mr: 2 }} color="primary" startIcon={<AddTwoTone />} onClick={() => handleModal({ open: true })}>
								<Typography sx={{ fontSize: 13, fontWeight: 500 }}>Create Link</Typography>
							</Button>
							<Button sx={{ mt: "auto", mb: "auto", mr: 2 }} color="primary" startIcon={<RefreshTwoTone />} onClick={() => refetch()}>
								<Typography sx={{ fontSize: 13, fontWeight: 500 }}>Refresh</Typography>
							</Button>
						</Box>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box padding={2} paddingBottom={0} paddingTop={0}>
							<Grid container>
								<Grid item xs={12} md={10}>
									<DataGrid
										rows={links}
										columns={columns}
										page={prev.page - 1}
										pageSize={prev.pageSize}
										loading={isFetching || isLoading}
										rowCount={pagination?.total || 0}
										rowsPerPageOptions={[10, 20, 50, 100]}
										pagination={true}
										onPageChange={handlePageChange}
										onPageSizeChange={handlePageSizeChange}
										paginationMode="server"
										autoHeight
										rowHeight={40}
										headerHeight={40}
										disableColumnFilter
										disableColumnMenu
									/>
								</Grid>
								<Grid item xs={12} md={2}></Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<LinkCreate open={modal.open} handleClose={() => handleModal({ open: false })} callback={refetch} />
		</React.Fragment>
	);
};

export default Links;

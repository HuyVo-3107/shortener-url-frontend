import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import LinkApi from "../api/LinkApi";
import { Link, NavLink } from "react-router-dom";

const Links = () => {
	const [prev, setPrev] = useState({ page: 1, pageSize: 10 });

	const { data: data, refetch, isFetching, isLoading } = LinkApi.List({ params: prev });
	const { links = [], pagination = {} } = data || {};
	const columns = [
		{ field: "id", headerName: "ID", width: 100, valueGetter: (params) => params.id },
		{
			field: "title",
			headerName: "Title",
			width: 200,
			valueGetter: (row) => row.row.title,
		},
		{
			field: "shortener_url",
			headerName: "",
			width: 200,
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
			width: 200,
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

	return (
		<Box sx={{ padding: "1rem", width: "100%" }}>
			<Grid container spacing={2}>
				<Grid item md={12}>
					<Typography variant="h6">Links</Typography>
				</Grid>
				<Grid item md={12}>
					<Grid container>
						<Grid item md={6}>
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
						<Grid item md={6}></Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Links;

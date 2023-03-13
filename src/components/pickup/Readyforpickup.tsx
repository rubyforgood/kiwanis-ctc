import React, { useState }  from "react";



import {
	DataGrid,
	GridCellParams,
	GridToolbarColumnsButton,
	GridToolbarContainer
} from "@material-ui/data-grid";
import SearchBar, { SearchBarProps } from "material-ui-search-bar";

				
const CustomToolbar = (props: JSX.IntrinsicAttributes & SearchBarProps) => (
	<div>
		<GridToolbarContainer>
			<GridToolbarColumnsButton />
		</GridToolbarContainer>
		<SearchBar {...props} />
	</div>
);
			



const DATASET = [
				
	{ id: 1, no: 1, name: "Ava Miller", self: 1, afac: 4, total: 5 , method: "Credit Card", paid: "Yes" , pickup: "Ready" },
	{ id: 2, no: 2, name: "James Cole", self: 1, afac: 0, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 3, no: 3, name: "Vivian Eggers", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 4, no: 4, name: "Ellijiah Sandis", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 5, no: 5, name: "Anjali Sharma", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 6, no: 6, name: "Sarah Smith", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 7, no: 7, name: "Noah Davis", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 8, no: 8, name: " Mary Brown", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 9, no: 9, name: " Miller", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 10, no: 10, name: " Miller", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 11, no: 11, name: " Miller", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  },
	{ id: 12, no: 12, name: " Miller", self: 1, afac: 4, total: 4, method: "Credit Card", paid: "Yes", pickup: "Ready"  }



];

				
export default function Readyforpickup() {
	const [searchText, setSearchText] = useState("");
	const [tableData, setTableData] = useState<any[]>(DATASET);
	const [columns] = useState<any[]>([
		{ headerName: "No.", field: "no" },
		{ headerName: "Name", field: "name", width: 130 },
		{ headerName: "Self", field: "self", width: 120 },
		{ headerName: "AFAC", field: "afac", width: 130 },
		{ headerName: "Total", field: "total", width: 120 },
		{ headerName: "Method", field: "method", width: 130 },
		{ headerName: "Paid", field: "paid", width: 130,
			renderCell: (params: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal; }) => (
						
				<span style={{ 
					padding:"1px 5px" ,
					backgroundColor:"#FFF0CB" }}>
					{params.value}
				</span>
			)},
			
		{ headerName: "Pickup", field: "pickup", width: 130 },
	]);
				
	const requestSearch = (searchValue: string) => {
		const searchRegex = new RegExp(`.*${searchValue}.*`, "ig");
		const filteredRows = DATASET.filter((o: any) => {
			return Object.keys(o).some((k: any) => {
				return searchRegex.test(o[k].toString());
			});
		});
		setTableData(filteredRows);
	};
				
	const cancelSearch = () => {
		setSearchText("");
		requestSearch(searchText);
	};
				
	return (
		<div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
			<DataGrid
				components={{ Toolbar: CustomToolbar }}
				rows={tableData}
				columns={columns}
				componentsProps={{
					toolbar: {
						value: searchText,
						onChange: (searchVal: string) => requestSearch(searchVal),
						onCancelSearch: () => cancelSearch()
					}
				}}
			/>
		</div>
	);
}


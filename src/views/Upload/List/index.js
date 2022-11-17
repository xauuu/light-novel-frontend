import React from "react";
import "./List.scss";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "story", headerName: "Truyện", width: 400 },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 200
  },
  {
    field: "chapter",
    headerName: "Số chương",
    type: "number",
    width: 150
  },
  {
    field: "view",
    headerName: "Lươt xem",
    type: "number",
    width: 150
  }
];

const rows = [];

const List = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />;
    </div>
  );
};

export default List;

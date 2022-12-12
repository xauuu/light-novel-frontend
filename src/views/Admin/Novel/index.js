import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getNovelByStatus, updateNovel } from "./../../../apis/novel";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableFooter, TablePagination, TableHead, IconButton, Grid, Tooltip } from "@mui/material";
import TablePaginationActions from "./../../../components/TablePaginationActions/index";
import { formatDateTime } from "../../../utils/helper.js";
import { MdDelete, MdDone } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";

const Novel = () => {
  const queryClient = useQueryClient();
  const { data: listNovel } = useQuery(["getNovelByStatus", "draft"], () => getNovelByStatus("draft"));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const setStatusMutation = useMutation(updateNovel, {
    onSuccess: () => {
      queryClient.invalidateQueries("getNovelByStatus");
    }
  });

  const handleClick = (id, status) => {
    setStatusMutation.mutate({ id: id, data: { status: status } });
  };

  return (
    <Grid container spacing={3}>
      <TableContainer>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Chapter</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? listNovel?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : listNovel)?.map((row) => (
              <TableRow className="tableRow" key={row.id}>
                <TableCell className="novel-title" component="th" scope="row">
                  <img src={row.image_url} alt="" /> {row.title}
                </TableCell>
                <TableCell>{row.chapters}</TableCell>
                <TableCell>{formatDateTime(row.created_at)}</TableCell>
                <TableCell className="action" align="right">
                  <Tooltip title="Accept">
                    <button className="accept" onClick={(e) => handleClick(row.id, "new")}>
                      <MdDone />
                    </button>
                  </Tooltip>
                  <Tooltip title="Preview">
                    <button className="preview">
                      <VscPreview />
                    </button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <button className="delete" onClick={(e) => handleClick(row.id, "reject")}>
                      <MdDelete />
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                // colSpan={3}
                count={listNovel?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Novel;

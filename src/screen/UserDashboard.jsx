import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteSingleUserById, userItemsSelector } from "../redux/user";
import ConfirmationModal from "../components/common/ConfirmationModal";
import CreateNewUser from "../dialog/CreateNewUser";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { allUserList } = useSelector(userItemsSelector);
  const [deleteData, setDeleteData] = useState({});
  const navigate = useNavigate();
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const headers = [
    {
      label: "User Id",
      key: "id",
    },
    { label: "User Name", key: "username" },
    { label: "User Email", key: "email" },
    { label: "User Role", key: "role" },
  ];
  const handleDelete = async (value) => {
    try {
      if (value && deleteData) {
        dispatch(DeleteSingleUserById(deleteData));
        setPage(0);
      } else {
        setDeleteData(null);
      }
    } catch (e) {}
  };

  const handleCofirmModalOpen = (value) => {
    setConfirmDelete(value);
  };
  const handleAdd = (value) => {
    setOpenAddEditDialog(value);
  };
  return (
    <>
      <Layout>
        <div style={{ marginTop: "2rem" }}>
          <div>
            <div className="table-layout-cta">
              <div className="table-layout-title">Users List</div>
              <Button
                variant="secondary"
                onClick={() => {
                  handleAdd(true);
                }}
                sx={{
                  padding: "8px 16px",
                  marginRight: 1,
                  fontSize: "16px",
                  borderRadius: "1rem",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  bgcolor: "rgb(88, 205, 255)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgb(88, 205, 255)",
                    color: "white",
                  },
                }}
              >
                Add New User
              </Button>
            </div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer>
                <Table aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {headers.map((column, index) => (
                        <TableCell key={index} align="center">
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allUserList?.items
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell align="center">{row?.id}</TableCell>
                            <TableCell align="center">
                              {row?.username}
                            </TableCell>
                            <TableCell align="center">{row?.email}</TableCell>
                            <TableCell align="center">{row?.role}</TableCell>
                            <TableCell
                              align="center"
                              sx={{ display: "flex", gap: "0.5rem" }}
                            >
                              <Button
                                onClick={() => {
                                  navigate(`/userDetail/${row?.id}`);
                                }}
                                variant="secondary"
                                sx={{
                                  padding: "5px 10px",
                                  marginRight: 1,
                                  fontSize: "12px",
                                  borderRadius: "0.5rem",
                                  whiteSpace: "nowrap",
                                  bgcolor: "rgb(70, 66, 85)",
                                  color: "white",
                                  "&:hover": {
                                    bgcolor: "rgb(70, 66, 85)",
                                    color: "white",
                                  },
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  handleCofirmModalOpen(true);
                                  setDeleteData(row?.id);
                                }}
                                sx={{
                                  padding: "5px 10px",
                                  marginRight: 1,
                                  fontSize: "12px",
                                  borderRadius: "0.5rem",
                                  bgcolor: "rgb(177, 73, 73)",
                                  color: "white",
                                  "&:hover": {
                                    bgcolor: "rgb(177, 73, 73)",
                                    color: "white",
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={allUserList?.items?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </Layout>
      {confirmDelete && (
        <ConfirmationModal
          open={confirmDelete}
          handleConfirm={handleDelete}
          setOpen={handleCofirmModalOpen}
        />
      )}
      {openAddEditDialog && (
        <CreateNewUser open={openAddEditDialog} handleOpen={handleAdd} />
      )}
    </>
  );
};

export default UserDashboard;

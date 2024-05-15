import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Box, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleUserDetails,
  userItemsSelector,
  EditSingleUserById,
} from "../redux/user";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { allUserList, singleUserList } = useSelector(userItemsSelector);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (allUserList && allUserList?.items?.length > 0) {
      dispatch(getSingleUserDetails(userId));
    }
  }, [userId]);

  const handleConfirm = async (values, { resetForm }) => {
    const payload = {
      id: userId,
      ...values,
    };
    dispatch(EditSingleUserById(payload));
    resetForm({
      username: "",
      email: "",
      role: "",
    });
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      username: singleUserList?.items?.username || "",
      email: singleUserList?.items?.email || "",
      role: singleUserList?.items?.role || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("User Name is required"),
      email: Yup.string()
        .email("Email is Invalid")
        .required("User Email is required"),
      role: Yup.string().required("User Role is required"),
    }),
    onSubmit: handleConfirm,
  });
  return (
    <>
      <Layout>
        <div style={{ marginTop: "2rem" }}>
          <div>
            <div className="table-layout-cta">
              <div className="table-layout-title">Edit User {}</div>
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/");
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
                Back
              </Button>
            </div>
            <div>
              <Box
                noValidate
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{
                  marginTop: "1rem",
                  maxWidth: "600px",
                  marginRight: "auto",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="username"
                      id="username"
                      label="User Name"
                      type="text"
                      placeholder="User Name"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        classes: {
                          notchedOutline: "rounded",
                        },
                      }}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="email"
                      id="email"
                      type="email"
                      label="User Email"
                      placeholder="User Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        classes: {
                          notchedOutline: "rounded",
                        },
                      }}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      name="role"
                      id="role"
                      label="User Role"
                      fullWidth
                      placeholder="User Role"
                      value={formik.values.role}
                      InputLabelProps={{ shrink: true }}
                      select
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: "rounded",
                        },
                      }}
                      onChange={formik.handleChange}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role && formik.errors.role}
                    >
                      <option key="Select User Role" value="">
                        Select User Role
                      </option>
                      <option key="admin" value="admin">
                        Admin
                      </option>
                      <option key="user" value="user">
                        User
                      </option>
                    </TextField>
                  </Grid>
                </Grid>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: 15,
                  }}
                >
                  <Button
                    variant="secondary"
                    type="submit"
                    onClick={formik.handleSubmit}
                    sx={{
                      padding: "5px 10px",
                      marginRight: 1,
                      fontSize: "16px",
                      borderRadius: "0.5rem",
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
                    Confirm
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/");
                    }}
                    variant="secondary"
                    sx={{
                      padding: "5px 10px",
                      marginRight: 1,
                      textTransform: "capitalize",
                      fontSize: "16px",
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
                    Cancel
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserDetails;

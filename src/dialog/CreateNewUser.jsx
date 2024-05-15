import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { AddNewSingleUser, userItemsSelector } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";

function CreateNewUser({ open, handleOpen }) {
  const { allUserList } = useSelector(userItemsSelector);
  const dispatch = useDispatch();
  function findLatestHighestId() {
    let highestId = 0;
    allUserList?.items?.forEach((item) => {
      if (item.id > highestId) {
        highestId = item.id;
      }
    });
    return highestId;
  }
  function generateDynamicId(data) {
    const latestHighestId = findLatestHighestId(data);
    return latestHighestId + 1;
  }
  const handleConfirm = async (values, { resetForm }) => {
    const newId = generateDynamicId();
    const newUserPayload = {
      id: newId,
      ...values,
    };
    if (newUserPayload) {
      dispatch(AddNewSingleUser(newUserPayload));
      resetForm({
        username: "",
        email: "",
        role: "",
      });
      handleOpen(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      role: "",
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
    <div>
      <Dialog maxWidth={"sm"} fullWidth open={open}>
        <DialogTitle variant="h6">Add New User</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ marginTop: "1rem" }}
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
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
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
                  error={formik.touched.email && Boolean(formik.errors.email)}
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
              style={{ display: "flex", justifyContent: "end", marginTop: 15 }}
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
                  formik.resetForm({
                    username: "",
                    email: "",
                    role: "",
                  });
                  handleOpen(false);
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateNewUser;

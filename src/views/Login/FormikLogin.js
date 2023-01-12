import React from "react";
import { Formik } from "formik";
import { Box, Button, FormHelperText, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "./../../apis/auth";
import { login as dispatchLogin } from "../../store/features/userSlice.js";

const FormikLogin = ({ toggleForm }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: null
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        try {
          const res = await login(values.email, values.password);
          console.log(res);
          if (res.code === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch(dispatchLogin(res.data.user));
            if (res.data.user.role === "admin") {
              window.location.href = "/admin/dashboard";
            }
            resetForm({});
          } else {
            setStatus({ success: false });
            setErrors({ submit: res.message });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            autoFocus
            label="Email"
            margin="normal"
            size="medium"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            margin="normal"
            name="password"
            size="medium"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
              Login
            </Button>
          </Box>
          <Box mt={3}>
            <Typography color="textPrimary" variant="body1">
              Don't have an account?{" "}
              <span className="hover_login" onClick={(e) => toggleForm(false)}>
                Register here
              </span>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormikLogin;

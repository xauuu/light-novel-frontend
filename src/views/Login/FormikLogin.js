import React from "react";
import { Formik } from "formik";
import { Box, Button, FormHelperText, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { login } from "./../../apis/auth";
import { login as dispatchLogin } from "../../store/features/userSlice.js";

const FormikLogin = () => {
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
          if (res.code === 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(dispatchLogin(res.data.user));
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
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off"
              }
            }}
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
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off"
              }
            }}
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
              Đăng nhập
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormikLogin;

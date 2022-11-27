import apiServices from "./../utils/api";

export const login = (email, password) => {
  return apiServices
    .post("/auth/login", { email, password })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return error;
    });
};

export const register = (name, email, password, passwordConfirm, photo = "") => {
  return apiServices
    .post("/auth/register", { name, email, photo, password, passwordConfirm })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return error;
    });
};

export const logout = () => {
  return apiServices
    .get("/auth/logout")
    .then((response) => {
      return;
    })
    .catch((error) => {
      console.log(error);
    });
};

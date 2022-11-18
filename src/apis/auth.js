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

export const register = (email, password, name) => {
  return apiServices
    .post("/auth/register", { email, password, name })
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

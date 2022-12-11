import apiServices from "./../utils/api";

export const getNovelDetail = (id) => {
  if (!id) return {};
  return apiServices.get("/novel/detail/" + id).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return {};
    }
  });
};

export const getNovelListByUser = () => {
  return apiServices.get("/novel/my").then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const createNovel = ({ data }) => {
  return apiServices.post("/novel/create", { ...data }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const updateNovel = ({ id, data }) => {
  return apiServices.put("/novel/update/" + id, { ...data }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const getNovelLastUpdate = (number) => {
  return apiServices.get("/novel/last-update/" + number).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getNovelByStatus = (status) => {
  return apiServices.get("/novel/status/" + status).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

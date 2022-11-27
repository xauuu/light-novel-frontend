import apiServices from "./../utils/api";

export const getNovelDetail = (id) => {
  return apiServices.get("/novel/detail/" + id).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getNovelListByUser = () => {
  return apiServices.get("/novel/my/").then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const createNovel = (data) => {
  return apiServices.post("/novel/create", data).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

import apiServices from "./../utils/api";

export const getNovelDetail = (id) => {
  return apiServices.get("/novel/" + id).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getNovelListByUser = (id) => {
  return apiServices.get("/novel/user/" + id).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

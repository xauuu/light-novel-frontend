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

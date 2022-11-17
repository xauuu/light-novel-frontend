import apiServices from "./../utils/api";

export const getTopNovels = (number) => {
  return apiServices.get("/novel/top/" + number).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

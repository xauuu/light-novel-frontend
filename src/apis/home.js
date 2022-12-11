import apiServices from "./../utils/api";

export const getRandomNovels = (number) => {
  return apiServices.get("/novel/random/" + number).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getTopNovels = (number) => {
  return apiServices.get("/novel/top/" + number).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

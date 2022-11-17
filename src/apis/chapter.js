import apiServices from "./../utils/api";

export const getChapterDetail = (chapter_number, novel_id) => {
  return apiServices.get("novel/chapter/detail", { params: { chapter_number, novel_id } }).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

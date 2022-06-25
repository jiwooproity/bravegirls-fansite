import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const getMethod = (url, params) => {
  return instance.get(url);
};

const settingMethod = async (url, params, method) => {
  switch (method) {
    case "GET":
      const { data } = await getMethod(url, params);
      return data;
    case "POST":
      break;
    default:
      break;
  }
};

export const photocardService = {
  getPhotocardData: (params) => settingMethod("photocard/getPhotocard.php", params, "GET"),
};

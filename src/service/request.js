import axios from "axios";

const header = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const httpGet = (url, params) => {
  const withParam = (url, params) => {
    return header.get(url, { params: { ...params } });
  };
  const onlyUrl = (url) => {
    return header.get(url);
  };

  return params ? withParam(url, params) : onlyUrl(url);
};

const request = async ({ method, url, params }) => {
  switch (method) {
    case "GET":
      const { data } = await httpGet(url, params);
      return data;
    case "POST":
      break;
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      break;
  }
};

export default request;

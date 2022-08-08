import axios from "axios";

const header = axios.create({
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
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

const httpPost = (url, params, data) => {
  const withParam = (url, params) => {
    return axios.post(url, { ...params });
  };

  const withData = (url, data) => {
    return header.post(url, data);
  };

  return params ? withParam(url, params) : withData(url, data);
};

const httpDelete = (url, data) => {
  return axios.delete(url, { data });
};

const request = async ({ method, url, params, data }) => {
  switch (method) {
    case "GET":
      const { data: getData } = await httpGet(url, params);
      return getData;
    case "POST":
      const { data: postData } = await httpPost(url, params, data);
      return postData;
    case "PUT":
      break;
    case "DELETE":
      const { data: deleteData } = await httpDelete(url, data);
      return deleteData;
    default:
      break;
  }
};

export default request;

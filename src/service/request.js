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

const httpPost = (url, params, data) => {
  const withParam = (url, params) => {
    return axios.post(url, { ...params });
  };

  const withData = (url, data) => {
    return header.post(url, data);
  };

  return params ? withParam(url, params) : withData(url, data);
};

const request = async ({ method, url, params, data }) => {
  switch (method) {
    case "GET":
      const { data: getData } = await httpGet(url, params);
      return getData;
    case "POST":
      const { data: postData } = await httpPost(url, params, data);
      console.log(postData);
      return postData;
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      break;
  }
};

export default request;

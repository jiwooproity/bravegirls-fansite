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

export const onDownload = async (e, member_name, photocardName) => {
  e.preventDefault();

  if (window.confirm(`[${member_name}] ${photocardName} 시안을 다운로드 받으시겠습니까?`)) {
    const image = e.target.src;

    // 다운로드 파일 이름 지정
    const image_split = image.split(".");
    const image_url = image_split[image_split.length - 1];

    // URL 이미지 다운로드 구현
    fetch(image, {
      method: "GET",
      header: {},
    }).then((response) => {
      response.arrayBuffer().then((buffer) => {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `${member_name}_${photocardName}.${image_url}`);

        document.body.appendChild(link);

        link.click();
      });
    });
  }
};

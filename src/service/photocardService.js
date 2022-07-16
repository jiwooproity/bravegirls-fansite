import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const getMethod = (url, params) => {
  if (params) {
    return instance.get(url, { params: { ...params } });
  } else {
    return instance.get(url);
  }
};

const postMethod = (url, params) => {
  return instance.post(url, null, {
    params: {
      ...params,
    },
  });
};

const settingMethod = async (url, params, method) => {
  switch (method) {
    case "GET":
      if (params) {
        const { data } = await getMethod(url, params);
        return data;
      } else {
        const { data } = await getMethod(url);
        return data;
      }
    case "POST":
      const { data } = await postMethod(url, params);
      return data;
    default:
      break;
  }
};

export const photocardService = {
  getPhotocardData: (params) => settingMethod("photocard/getPhotocard.php", params, "GET"),
  getVideoList: (params) => settingMethod("photocard/getVideoList.php", params, "GET"),
  getMusicList: (params) => settingMethod("photocard/getMusicList.php", params, "GET"),
  getMemberList: (params) => settingMethod("photocard/getMemberList.php", params, "GET"),
  getHistoryList: (params) => settingMethod("photocard/getHistoryList.php", params, "GET"),
};

export const onDownload = async (e, member_name, photocardName, photocard_image, photocard_image_back) => {
  e.preventDefault();

  if (!localStorage.getItem("login_id")) {
    alert("로그인 기능 구현 후 이용 가능합니다.");
    return;
  }

  const dataArr = [photocard_image, photocard_image_back];

  if (window.confirm(`[${member_name}] ${photocardName} 시안을 다운로드 받으시겠습니까?`)) {
    // URL 이미지 다운로드 구현
    dataArr.forEach((item, index) => {
      const image = item;

      // 다운로드 파일 이름 지정
      const image_split = image.split(".");
      const image_url = image_split[image_split.length - 1];
      const direction = index === 0 ? "앞면" : "뒷면";

      fetch(item, {
        method: "GET",
        header: {},
      }).then((response) => {
        response.arrayBuffer().then((buffer) => {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");

          link.href = url;
          link.setAttribute("download", `${member_name}_${photocardName}_${direction}.${image_url}`);

          document.body.appendChild(link);

          link.click();
        });
      });
    });
  }
};

import axios from "axios";

const youtubeApiKey = process.env.REACT_APP_YOUTUBE_KEY;

const playListID = {
  music: process.env.REACT_APP_PLAYLIST_VIDEO,
  queendom: process.env.REACT_APP_PLAYLIST_QUEENDOM,
  bgclip: process.env.REACT_APP_PLAYLIST_BGCLIP,
};

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

export const configService = {
  getPhotocardData: (params) =>
    settingMethod(
      `${process.env.REACT_APP_DATABASE_URL}/getetPhotocard.php`,
      params,
      "GET"
    ),
  getVideoList: (params) =>
    settingMethod(
      `${process.env.REACT_APP_DATABASE_URL}/getVideoList.php`,
      params,
      "GET"
    ),
  getMusicList: (params) =>
    settingMethod(
      `${process.env.REACT_APP_DATABASE_URL}/getMusicList.php`,
      params,
      "GET"
    ),
  getTrackList: (params) =>
    settingMethod(
      `${process.env.REACT_APP_DATABASE_URL}/getTrackList.php`,
      params,
      "GET"
    ),
  getMemberList: (params) =>
    settingMethod(
      `${process.env.REACT_APP_DATABASE_URL}/getMemberList.php`,
      params,
      "GET"
    ),
  getAllMemberList: (params) =>
    settingMethod(
      `${process.env.REACT_APP_DATABASE_URL}/getAllMemberList.php`,
      params,
      "GET"
    ),
  getHistoryList: (params) =>
    settingMethod(
      `${process.env.REACT_APP_DATABASE_URL}/photocard/getHistoryList.php`,
      params,
      "GET"
    ),
};

export const youtubeService = {
  getPlayList: (location, params) =>
    settingMethod(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playListID[location]}&key=${youtubeApiKey}`,
      params,
      "GET"
    ),
  getVideo: (params) =>
    settingMethod(
      `https://www.googleapis.com/youtube/v3/videos?key=${youtubeApiKey}`,
      params,
      "GET"
    ),
};

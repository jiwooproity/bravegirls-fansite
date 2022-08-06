const REQUEST_URL = process.env.REACT_APP_DATABASE_URL;

export const API = {
  HTTP_METHOD: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },

  URL: {
    PHOTOCARD_LIST: `${REQUEST_URL}/getPhotocard.php`,
    VIDEO_LIST: `${REQUEST_URL}/getVideoList.php`,
    MUSIC_LIST: `${REQUEST_URL}/getMusicList.php`,
    TRACK_LIST: `${REQUEST_URL}/getTrackList.php`,
    MEMBER_LIST: `${REQUEST_URL}/getMemberList.php`,
    ALL_MEMBER_LIST: `${REQUEST_URL}/getAllMemberList.php`,
    HISTORY_LIST: `${REQUEST_URL}/getHistoryList.php`,
    CANVAS_LIST: `${REQUEST_URL}/getCanvasList.php`,
    CANVAS_DETAIL: `${REQUEST_URL}/getCanvas.php`,
    INSERT_CANVAS: `${REQUEST_URL}/insertCanvas.php`,
    COMMENT_LIST: `${REQUEST_URL}/getComment.php`,
    INSERT_COMMENT: `${REQUEST_URL}/insertComment.php`,
    IMAGE_UPLOAD: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_USER_NAME}/image/upload`,
  },

  YOUTUBE_KEY: {
    MUSIC: process.env.REACT_APP_PLAYLIST_VIDEO,
    QUEENDOM: process.env.REACT_APP_PLAYLIST_QUEENDOM,
    BGCLIP: process.env.REACT_APP_PLAYLIST_BGCLIP,
  },

  YOUTUBE: {
    PLAYLIST: `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.REACT_APP_YOUTUBE_KEY}`,
    PLAYITEM: `https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_YOUTUBE_KEY}`,
  },
};

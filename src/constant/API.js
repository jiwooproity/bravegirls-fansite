// const REQUEST_URL = process.env.REACT_APP_DATABASE_URL;
// const REQUEST_URL = process.env.REACT_APP_DEVELOP_URL;

export const API = {
  HTTP_METHOD: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },

  URL: {
    PHOTOCARD_LIST: `/photocard/getPhotocard.php`,
    VIDEO_LIST: `/photocard/getVideoList.php`,
    MUSIC_LIST: `/photocard/getMusicList.php`,
    TRACK_LIST: `/photocard/getTrackList.php`,
    MEMBER_LIST: `/photocard/getMemberList.php`,
    ALL_MEMBER_LIST: `/photocard/getAllMemberList.php`,
    HISTORY_LIST: `/photocard/getHistoryList.php`,
    CANVAS_LIST: `/photocard/getCanvasList.php`,
    CANVAS_DETAIL: `/photocard/getCanvas.php`,
    INSERT_CANVAS: `/photocard/insertCanvas.php`,
    COMMENT_LIST: `/photocard/getComment.php`,
    INSERT_COMMENT: `/photocard/insertComment.php`,
    USER_LIST: `/photocard/getUserList.php`,
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

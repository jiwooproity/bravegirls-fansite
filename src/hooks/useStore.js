import { themeStore } from "store/themeStore";
import { memberStore } from "store/memberStore";
import { loginStore } from "store/loginStore";

const useStore = () => {
  return { themeStore, memberStore, loginStore };
};

export default useStore;

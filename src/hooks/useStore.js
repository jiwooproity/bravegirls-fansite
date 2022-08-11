import { themeStore } from "store/themeStore";
import { memberStore } from "store/memberStore";
import { loginStore } from "store/loginStore";
import { loadingStore } from "store/loadingStore";

const useStore = () => {
  return { themeStore, memberStore, loginStore, loadingStore };
};

export default useStore;

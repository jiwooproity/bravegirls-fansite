import { themeStore } from "store/themeStore";
import { memberStore } from "store/memberStore";
import { loginStore } from "store/loginStore";
import { loadingStore } from "store/loadingStore";
import { toastStore } from "store/toastStore";

const useStore = () => {
  return { themeStore, memberStore, loginStore, loadingStore, toastStore };
};

export default useStore;

import { themeStore } from "store/themeStore";
import { memberStore } from "store/memberStore";

const useStore = () => {
  return { themeStore, memberStore };
};

export default useStore;

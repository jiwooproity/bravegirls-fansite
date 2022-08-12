import React, { useEffect } from "react";
import { useObserver } from "mobx-react";
import { useStore } from "hooks";
import { Toast as CSS } from "style";

const Toast = () => {
  const { toastStore } = useStore();
  const { show } = toastStore;

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        toastStore.clsoeToast();
      }, 2000);
    }
  }, [show, toastStore]);

  return useObserver(() => {
    const { show, msg } = toastStore;

    return (
      show && (
        <CSS.Box>
          <CSS.Text>{msg}</CSS.Text>
        </CSS.Box>
      )
    );
  });
};

export default Toast;

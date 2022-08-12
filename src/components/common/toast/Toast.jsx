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
    const { show, status, msg } = toastStore;

    return (
      <CSS.Box show={show}>
        <CSS.StatusColor className={`Type-${status}`} />
        <CSS.TextWrap>
          <CSS.Text>{status}</CSS.Text>
          <CSS.SubText>{msg}</CSS.SubText>
        </CSS.TextWrap>
      </CSS.Box>
    );
  });
};

export default Toast;

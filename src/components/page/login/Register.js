import React, { useEffect, useState } from "react";
import _ from "lodash";

import { canvasService, userService } from "services";
import { FontIcon, Register as CSS } from "style";
import { useStore } from "hooks";
import { Reg } from "constant/Reg";
import { useNavigate } from "react-router-dom";

const defProfile = "https://res.cloudinary.com/jiwooproity/image/upload/v1659851648/profile/logo_vpzyuv.jpg";

const Register = () => {
  const navigate = useNavigate();
  const { toastStore, loadingStore } = useStore();
  const [certiNum, setCertiNum] = useState("");
  const [timer, setTimer] = useState(60);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(defProfile);
  // eslint-disable-next-line
  const [intervalData, setIntervalData] = useState(null);
  const [duplicate, setDuplicate] = useState({
    email: false,
    nickname: false,
    password: false,
  });
  const [info, setInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    certi: "",
  });

  // 타이머 시작 함수
  const Timer = () => {
    setIntervalData(
      setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000)
    );
  };

  // 비밀번호 확인
  useEffect(() => {
    const { password, confirmPassword } = info;

    const change = (type) => {
      setDuplicate({
        ...duplicate,
        password: type,
      });
    };

    change(_.isEqual(password, confirmPassword));
    // eslint-disable-next-line
  }, [info]);

  // 타이머가 0초가 될 경우, 초기화
  useEffect(() => {
    if (timer < 0) {
      setTimer(60);
      setCertiNum("");
      clearInterval(intervalData);
    }
    // eslint-disable-next-line
  }, [timer]);

  // 인증번호가 바뀌게 될 경우 실행
  useEffect(() => {
    if (certiNum) {
      Timer();
    }
  }, [certiNum, setCertiNum]);

  // Input 입력 감지
  const onChange = (e) => {
    let { name, value } = e.target;
    value = _.isEqual(name, "certi") ? String(value) : value;

    setInfo({
      ...info,
      [name]: value,
    });

    setDuplicate({
      ...duplicate,
      [name]: false,
    });

    const reset = () => {
      setSuccess(false);
      setTimer(60);
      setCertiNum("");
      clearInterval(intervalData);
    };

    _.isEqual(name, "email") && reset();
  };

  // 중복 검사
  const onDuplicate = async ({ type }) => {
    const params = {
      type,
      check: _.isEqual(type, "email") ? info.email : info.nickname,
    };

    if (_.isEqual(type, "email") && !Reg.email(info.email)) {
      toastStore.showToast({ status: 1, msg: "이메일 형식이 올바르지 않습니다." });
      return;
    }

    if (_.isEqual(type, "nickname") && !Reg.nickname(info.nickname)) {
      toastStore.showToast({ status: 1, msg: "아이디는 특수문자 사용이 불가능하며, 4 ~ 15자 사이로 입력해 주세요." });
      return;
    }

    const { status, message: msg } = await userService.checkDuplicate({ data: params });

    if (status === 0) {
      setDuplicate({
        ...duplicate,
        [type]: true,
      });
    } else {
      setDuplicate({
        ...duplicate,
        [type]: false,
      });
    }

    toastStore.showToast({ status, msg });
  };

  // 인증번호 입력 확인
  const onCerti = async () => {
    const isEmail = !_.isEmpty(info.email) && duplicate.email;

    if (isEmail) {
      const params = {
        email: info.email,
      };

      const { status, message: msg, certiNum } = await userService.getCerti({ params });
      // 인증번호 발급 및 에러 표시
      certiNum !== "" ? setCertiNum(String(certiNum)) : toastStore.showToast({ status, msg });
    } else {
      const msg = duplicate.email ? "인증번호를 발급 받을 이메일을 입력해 주세요." : "이메일 중복체크를 확인해 주세요.";
      toastStore.showToast({ status: 2, msg });
    }
  };

  // 인증번호 확인
  const onCheck = () => {
    const isCerti = _.isEqual(info.certi, certiNum);

    if (isCerti) {
      toastStore.showToast({ status: 0, msg: "인증이 완료되었습니다." });
      setTimer(60);
      setCertiNum("");
      setSuccess(true);
      clearInterval(Timer);
    } else {
      toastStore.showToast({ status: 1, msg: "인증번호가 일치하지 않습니다." });
    }
  };

  // 가입 검사
  const onRegister = async () => {
    const isEmail = _.isEmpty(info.email);
    const isNickname = _.isEmpty(info.nickname);
    const isPassword = _.isEmpty(info.password);
    const isConfirmPassword = _.isEmpty(info.confirmPassword);
    const dupliEmail = duplicate.email;
    const dupliNickname = duplicate.nickname;
    const dupliPassword = duplicate.password;

    if (isEmail || isNickname) {
      toastStore.showToast({ status: 2, msg: "빈 칸을 모두 입력해 주세요." });
      return;
    }

    if (!dupliEmail || !dupliNickname) {
      toastStore.showToast({ status: 2, msg: "중복체크를 확인해 주세요." });
      return;
    }

    if (isPassword || isConfirmPassword) {
      toastStore.showToast({ status: 2, msg: "비밀번호 정보를 모두 입력해 주세요." });
      return;
    }

    if (!dupliPassword) {
      toastStore.showToast({ status: 2, msg: "입력하신 두 비밀번호가 다릅니다." });
      return;
    }

    if (!success) {
      toastStore.showToast({ status: 2, msg: "인증번호를 입력해 주세요." });
      return;
    }

    loadingStore.setLoading(false);
    let upload = "";
    const setImage = !_.isEqual(defProfile, file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "swbqeean");

    if (setImage) {
      upload = await canvasService.canvasUpload({ data });
    }

    const params = {
      email: info.email,
      nickname: info.nickname,
      password: info.password,
      profile: setImage ? upload.secure_url : defProfile,
    };

    const { status, message: msg } = await userService.insertUser({ data: params });
    toastStore.showToast({ status, msg });
    loadingStore.setLoading(true);
    navigate(_.isEqual(status, 0) ? "/login" : "/register");
  };

  const onFile = (e) => {
    const { files } = e.target;
    const reader = new FileReader();

    const setImage = ({ data }) => {
      const previewImage = document.getElementById("profileImage");
      previewImage.src = data;
      setFile(data);
    };

    reader.onload = (e) => {
      setImage({ data: e.target.result });
    };

    files[0] ? reader.readAsDataURL(files[0]) : setImage({ data: defProfile });
  };

  return (
    <CSS.Container>
      <CSS.Box>
        <CSS.InputWrap>
          <CSS.ProfileWrap>
            <CSS.ProfileLayout>
              <CSS.ProfileBackdrop htmlFor="profile">
                <CSS.ProfileText>프로필 선택</CSS.ProfileText>
              </CSS.ProfileBackdrop>
              <CSS.FileInput id="profile" type="file" onChange={onFile} />
              <CSS.Profile id="profileImage" src={defProfile} />
            </CSS.ProfileLayout>
          </CSS.ProfileWrap>
          <CSS.InputGrid>
            <CSS.CheckWrap>
              <CSS.Icon icon={duplicate.email ? FontIcon.Check : FontIcon.Error} status={duplicate.email} visible={info.email !== ""} />
              <CSS.Input type="email" name="email" placeholder="이메일" onChange={onChange} />
            </CSS.CheckWrap>
            <CSS.Button onClick={() => onDuplicate({ type: "email" })}>중복체크</CSS.Button>
          </CSS.InputGrid>
          <CSS.InputGrid>
            <CSS.CheckWrap>
              <CSS.Icon icon={duplicate.nickname ? FontIcon.Check : FontIcon.Error} status={duplicate.nickname} visible={info.nickname !== ""} />
              <CSS.Input type="text" name="nickname" placeholder="닉네임" onChange={onChange} />
            </CSS.CheckWrap>
            <CSS.Button onClick={() => onDuplicate({ type: "nickname" })}>중복체크</CSS.Button>
          </CSS.InputGrid>
          <CSS.InputBox>
            <CSS.CheckWrap>
              <CSS.Icon icon={duplicate.password ? FontIcon.Check : FontIcon.Error} status={duplicate.password} visible={info.password} />
              <CSS.Input type="password" name="password" placeholder="비밀번호" onChange={onChange} />
            </CSS.CheckWrap>
          </CSS.InputBox>
          <CSS.InputBox>
            <CSS.CheckWrap>
              <CSS.Icon icon={duplicate.password ? FontIcon.Check : FontIcon.Error} status={duplicate.password} visible={info.confirmPassword} />
              <CSS.Input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={onChange} />
            </CSS.CheckWrap>
          </CSS.InputBox>
          <CSS.InputGrid>
            <CSS.CheckWrap>
              <CSS.Input type="text" name="certi" placeholder="인증번호" onChange={onChange} disabled={success} />
              {certiNum && <CSS.Timer>{`00:${String(timer).padStart(2, "0")}`}</CSS.Timer>}
            </CSS.CheckWrap>
            {certiNum ? (
              <CSS.Button onClick={onCheck}>인증확인</CSS.Button>
            ) : (
              <CSS.Button onClick={onCerti} disabled={success}>
                {success ? "인증완료" : "인증하기"}
              </CSS.Button>
            )}
          </CSS.InputGrid>
        </CSS.InputWrap>
        <CSS.Submit onClick={onRegister}>회원가입</CSS.Submit>
      </CSS.Box>
    </CSS.Container>
  );
};

export default Register;

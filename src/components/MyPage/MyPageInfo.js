import React, { useEffect, useState, useTransition } from "react";
// import axios from "axios"; // 백엔드 연결 시 사용
import "../../styles/input.css";
import "../../styles/common.css";
import "./MyPageInfo.css";
import { useNavigate } from "react-router-dom";

function Info() {
  const [userInfo, setUserInfo] = useState({
    id: "2021111350",
    nickname: "25기_이송하",
    email: "songha1744@naver.com",
    phone: "010-1111-2222",
  });

  const navigate = useNavigate();
  const [ _, startTransition] = useTransition();

  const handlePasswordReset = () => {
    startTransition(() => {
      navigate("/users/update", { state: { fromMyPage: true } });
    });
  };

  useEffect(() => {
    // ** 실제 백엔드 연결 코드 **
    /*
    axios
      .post("/users/mypage", { id: "2021111350", pw: "hihi" })
      .then((response) => setUserInfo(response.data))
      .catch((error) => console.error("회원 정보 불러오기 실패", error));
    */
  }, []);

  return (
    <div className="info-form">
      <h1 className="form_subtitle">회원 정보</h1>
      <h4 className="info-text">회원정보 수정 및 탈퇴는 운영진에게 문의해주세요</h4>
      <div className="info-form_field">
        <div className="input-wrapper">
          <label>아이디</label>
          <input value={userInfo.id} className="info-form_input" />
        </div>
      </div>
      <div className="info-form_field">
        <div className="input-wrapper">
          <label>닉네임</label>
          <input value={userInfo.nickname} className="info-form_input" />
        </div>
      </div>

      {/* 비밀번호 재설정 버튼 */}
      <div className="info-form_field">
        <div className="input-wrapper">
          <label>비밀번호</label>
            <button
              onClick={handlePasswordReset}
              className="password-reset-button"
            >
              비밀번호 재설정
            </button>
          </div>
      </div>

      <div className="info-form_field">
        <div className="input-wrapper">
          <label>이메일</label>
          <input value={userInfo.email} className="info-form_input" />
        </div>
      </div>
      <div className="info-form_field">
        <div className="input-wrapper">
          <label>전화 번호</label>
          <input value={userInfo.phone} className="info-form_input" />
        </div>
      </div>
    </div>
  );
}

export default Info;

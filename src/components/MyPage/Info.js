import React, { useEffect, useState } from "react"; 
// import axios from "axios"; // 백엔드 연결 시 사용
import "../../styles/input.css"
import "../../styles/common.css"
import "./info.css"

function Info() {
  const [userInfo, setUserInfo] = useState({
    id: "2021111350",
    nickname: "25기_이송하",
    email: "songha1744@naver.com",
    phone: "010-1111-2222",
  });

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
          <input value={userInfo.id} disabled className="info-form_input" />
        </div>
      </div>
      <div className="info-form_field">
        <div className="input-wrapper">
          <label>닉네임</label>
          <input value={userInfo.nickname} disabled className="info-form_input" />
        </div>
      </div>
      <div className="info-form_field">
        <div className="input-wrapper">
          <label>이메일</label>
          <input value={userInfo.email} disabled className="info-form_input" />
        </div>
      </div>
      <div className="info-form_field">
        <div className="input-wrapper">
          <label>전화 번호</label>
          <input value={userInfo.phone} disabled className="info-form_input" />
        </div>
      </div>
    </div>
  );
}

export default Info;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/ResetPassword.css";
import "../../styles/common.css";
import "../../styles/input.css";

function ResetPassword() {
  const location = useLocation();
  const isFromMyPage = location.state && location.state.fromMyPage; // 마이페이지에서 온지 확인

  const [formData, setFormData] = useState({
    id: "", // 기본 ID, 실제로는 동적으로 전달 필요
    email: "",
    authCode: "",
    currentPw: "",
    newPw: "",
    confirmPw: "",
  });

  const [error, setError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 비밀번호 확인 로직
    if (name === "newPw" || name === "confirmPw") {
      const match = name === "newPw" ? value === formData.confirmPw : value === formData.newPw;
      setPasswordMatch(match);
      setError(match ? "" : "비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = () => {
    if (formData.newPw !== formData.confirmPw) {
      setError("일치하지 않습니다.");
      return;
    }

    // API 요청 (로그인 화면과 마이페이지 로직 통합)
    const requestBody = {
      id: formData.id,
      pw: formData.newPw,
      pwdCheck: isFromMyPage ? true : false,
    };

    console.log("API 요청:", requestBody);

    // API 호출 예제 (axios 사용)
    /*
    axios.post("/users/update", requestBody)
      .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        // 페이지 리다이렉트 등 추가 로직
      })
      .catch((err) => {
        console.error("API 요청 실패:", err);
      });
    */
  };

  const handleCancel = () => {
    alert("변경이 취소되었습니다.");
    // 추가 로직이 필요한 경우 여기에 작성
  };

  return (
    <div className="password-reset">
        <h2>{isFromMyPage ? "마이페이지" : "비밀번호 재설정"}</h2>

        {!isFromMyPage ? (
            <>
            <div className="form-field">
                <div className="input-wrapper">
                <label>아이디</label>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="아이디(학번) 입력"
                />
                </div>
            </div>
            <div className="form-field">
                <div className="input-wrapper">
                <label>이메일</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일 입력"
                />
                </div>
            </div>
            <div className="form-field">
                <div className="input-wrapper">
                <label>인증 번호</label>
                <input
                    type="text"
                    name="authCode"
                    value={formData.authCode}
                    onChange={handleChange}
                />
                </div>
            </div>
            <div className="form-field">
        <div className="input-wrapper">
          <label>새로운 비밀번호</label>
          <div className="input-container">
            <input
              type="password"
              name="newPw"
              value={formData.newPw}
              onChange={handleChange}
              placeholder="새 비밀번호 입력"
              className="info-form_input"
            />
          </div>
        </div>
      </div>
      <div className="form-field">
        <div className="input-wrapper">
          <label>비밀번호 확인</label>
          <div className="input-container">
            <input
              type="password"
              name="confirmPw"
              value={formData.confirmPw}
              onChange={handleChange}
              placeholder="비밀번호 확인 입력"
              className="info-form_input"
            />
            {passwordMatch && (
              <img
                src="/pwCheck.png"
                alt="check"
                className="check-icon"
              />
            )}
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
            </>
        ) : (
            <div className="mypage-section">
            <h3>비밀번호 재설정</h3>
            
            <div className="form-field">
                <div className="input-wrapper">
                    <label>현재 비밀번호</label>
                    <input
                        type="password"
                        name="currentPw"
                        value={formData.currentPw}
                        onChange={handleChange}
                        placeholder="현재 비밀번호 입력"
                    />
                </div>
            </div>

            <div className="form-field">
                <div className="input-wrapper">
                    <label>새로운 비밀번호</label>
                    <div className="input-container">
                        <input
                            type="password"
                            name="newPw"
                            value={formData.newPw}
                            onChange={handleChange}
                            placeholder="새 비밀번호 입력"
                        />
                    </div>
                </div>
            </div>

            <div className="form-field">
                <div className="input-wrapper">
                    <label>비밀번호 확인</label>
                    <div className="input-container">
                        <input
                            type="password"
                            name="confirmPw"
                            value={formData.confirmPw}
                            onChange={handleChange}
                            placeholder="비밀번호 확인 입력"
                        />
                        {passwordMatch && (
                            <img 
                                src="/pwCheck.png" 
                                alt="check" 
                                className="check-icon"
                            />
                        )}
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>

            <div className="resetBtn">
                <div className="MyResetBtn">
                    <button onClick={handleSubmit}>확인</button>
                </div>
                <div className="MyResetBtn">
                    <button onClick={handleCancel}>취소</button>
                </div>
            </div>
        </div>
        )}

        {!isFromMyPage && (
            <div className="resetBtn">
            <div className="LoginResetBtn">
                <button onClick={handleSubmit}>변경 내용 저장</button>
            </div>
            </div>
        )}
        </div>
  );
}

export default ResetPassword;

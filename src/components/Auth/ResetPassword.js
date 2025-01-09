import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PrevNextButtons from "../../components/Auth/PrevNextButtons";
import "../../styles/ResetPassword.css";
import "../../styles/common.css";
import "../../styles/input.css";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFromMyPage = location.state?.fromMyPage;

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    authCode: "",
    currentPw: "",
    newPw: "",
    confirmPw: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "newPw" || name === "confirmPw") {
      const match = name === "newPw" ? value === formData.confirmPw : value === formData.newPw;
      setPasswordMatch(match);
      setError(match ? "" : "비밀번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleRequestAuth = async () => {
    if (!formData.id || !formData.email) {
      setError("아이디와 이메일을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post('/api/v1/password/verify', {
        userId: formData.id,
        email: formData.email
      });
      setTimer(300);
      setSuccess(response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data || "인증 요청에 실패했습니다.");
    }
  };

  const handleVerifyAuth = async () => {
    if (!timer) {
      setError("인증 시간이 만료되었습니다. 다시 인증번호를 요청해주세요.");
      return;
    }

    if (!formData.authCode) {
      setError("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post('/api/v1/password/verify-auth', {
        userId: formData.id,
        email: formData.email,
        authNumber: parseInt(formData.authCode)
      });
      setIsVerified(true);
      setSuccess(response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data || "인증번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = async () => {
    if (!isFromMyPage && !isVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }

    if (formData.newPw !== formData.confirmPw) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post('/api/v1/password/reset', {
        userId: formData.id,
        newPassword: formData.newPw
      });
      setSuccess(response.data);
      setError("");
      setTimeout(() => {
        navigate('/users/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data || "비밀번호 변경에 실패했습니다.");
    }
  };

  const handlePrev = () => {
    navigate(-1);
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
                      disabled={isVerified}
                  />
                </div>
              </div>
              <div className="form-field">
                <div className="input-wrapper">
                  <label>이메일</label>
                  <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일 입력"
                        disabled={isVerified}
                    />
                    <button
                        className="auth-button"
                        onClick={handleRequestAuth}
                        disabled={isVerified}
                    >
                      인증번호 요청
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-field">
                <div className="input-wrapper">
                  <label>인증 번호</label>
                  <div className="input-group">
                    <input
                        type="text"
                        name="authCode"
                        value={formData.authCode}
                        onChange={handleChange}
                        disabled={isVerified}
                        placeholder="인증번호 6자리 입력"
                    />
                    <button
                        className="auth-button"
                        onClick={handleVerifyAuth}
                        disabled={isVerified}
                    >
                      확인
                    </button>
                    {timer > 0 && <span className="timer">{formatTime(timer)}</span>}
                  </div>
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
                        <img src="/pwCheck.png" alt="check" className="check-icon" />
                    )}
                  </div>
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
              <div className="resetBtn">
                <div className="LoginResetBtn">
                  <button onClick={handleSubmit}>변경 내용 저장</button>
                </div>
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
                        <img src="/pwCheck.png" alt="check" className="check-icon" />
                    )}
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
              </div>
              <div className="resetBtn">
                <div className="MyResetBtn">
                  <button onClick={handleSubmit}>확인</button>
                </div>
                <div className="MyResetBtn">
                  <PrevNextButtons
                      onPrev={handlePrev}
                      showNextButton={false}
                      prevText="취소"
                  />
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default ResetPassword;
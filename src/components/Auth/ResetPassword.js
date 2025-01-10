// ResetPassword.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ResetPassword.css";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFromMyPage = location.state?.fromMyPage;
  const userInfo = location.state?.userInfo;

  const [formData, setFormData] = useState({
    id: userInfo?.userId || "",
    email: userInfo?.email || "",
    authCode: "",
    newPw: "",
    confirmPw: "",
  });

  const [error, setError] = useState({
    email: "",
    auth: "",
    password: "",
    confirmPassword: ""
  });

  const [success, setSuccess] = useState({
    email: "",
    auth: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [timer, setTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 입력값이 없을 때는 모든 메시지를 초기화
    if (!value) {
      setError(prev => ({ ...prev, [name]: "" }));
      setSuccess(prev => ({ ...prev, [name]: "" }));
      if (name === "newPw") {
        setPasswordValid(false);
        // 비밀번호 필드가 비워졌을 때 확인 필드 메시지도 초기화
        if (formData.confirmPw) {
          setError(prev => ({ ...prev, confirmPassword: "" }));
          setSuccess(prev => ({ ...prev, confirmPassword: "" }));
          setPasswordMatch(false);
        }
      }
      return;
    }

    if (name === "newPw") {
      const isValid = PASSWORD_REGEX.test(value);
      setPasswordValid(isValid);
      setError(prev => ({
        ...prev,
        password: isValid ? "" : "비밀번호는 영문, 숫자, 특수문자를 포함하여 10자 이상이어야 합니다."
      }));
      setSuccess(prev => ({
        ...prev,
        password: isValid ? "사용 가능한 비밀번호입니다." : ""
      }));

      if (formData.confirmPw) {
        const match = value === formData.confirmPw;
        setPasswordMatch(match);
        setError(prev => ({
          ...prev,
          confirmPassword: match ? "" : "비밀번호가 일치하지 않습니다."
        }));
        setSuccess(prev => ({
          ...prev,
          confirmPassword: match ? "비밀번호가 일치합니다." : ""
        }));
      }
    }

    if (name === "confirmPw") {
      const match = value === formData.newPw;
      setPasswordMatch(match);
      setError(prev => ({
        ...prev,
        confirmPassword: match ? "" : "비밀번호가 일치하지 않습니다."
      }));
      setSuccess(prev => ({
        ...prev,
        confirmPassword: match ? "비밀번호가 일치합니다." : ""
      }));
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && isEmailSent && !emailVerified) {
      setError(prev => ({
        ...prev,
        auth: "인증 시간이 만료되었습니다. 다시 인증번호를 요청해주세요."
      }));
    }
  }, [timer, isEmailSent, emailVerified]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleRequestAuth = async () => {
    try {
      await axios.post('/api/v1/password/verify', {
        userId: formData.id,
        email: formData.email
      });
      setTimer(300);
      setIsEmailSent(true);
      setError(prev => ({ ...prev, email: "" }));
      setSuccess(prev => ({ ...prev, email: "인증번호가 발송되었습니다." }));
    } catch (err) {
      setError(prev => ({
        ...prev,
        email: err.response?.data || "인증번호 발송에 실패했습니다."
      }));
      setSuccess(prev => ({ ...prev, email: "" }));
    }
  };

  const handleVerifyAuth = async () => {
    if (!timer) {
      setError(prev => ({
        ...prev,
        auth: "인증 시간이 만료되었습니다. 다시 인증번호를 요청해주세요."
      }));
      setSuccess(prev => ({ ...prev, auth: "" }));
      return;
    }

    try {
      await axios.post('/api/v1/password/verify-auth', {
        userId: formData.id,
        email: formData.email,
        authNumber: parseInt(formData.authCode)
      });
      setEmailVerified(true);
      setError(prev => ({ ...prev, auth: "" }));
      setSuccess(prev => ({ ...prev, auth: "인증이 완료되었습니다." }));
    } catch (err) {
      setError(prev => ({
        ...prev,
        auth: err.response?.data || "인증번호가 일치하지 않습니다."
      }));
      setSuccess(prev => ({ ...prev, auth: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!emailVerified) {
      setError(prev => ({
        ...prev,
        auth: "이메일 인증을 완료해주세요."
      }));
      return;
    }

    if (!passwordValid || !passwordMatch) {
      return;
    }

    try {
      const response = await axios.post('/api/v1/password/reset', {
        userId: formData.id,
        newPassword: formData.newPw
      });
      setSuccess(prev => ({ ...prev, submit: response.data }));
      setTimeout(() => {
        navigate('/users/login');
      }, 2000);
    } catch (err) {
      setError(prev => ({
        ...prev,
        password: err.response?.data || "비밀번호 변경에 실패했습니다."
      }));
    }
  };

  return (
      <div className="password-reset">
        <h2>비밀번호 재설정</h2>

        <div className="form-field">
          <div className="input-wrapper">
            <label>아이디</label>
            <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="아이디(학번) 입력"
                disabled={isFromMyPage}
                className={isFromMyPage ? "disabled-input" : ""}
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
                  disabled={isFromMyPage || emailVerified}
                  className={isFromMyPage ? "disabled-input" : ""}
              />
              <button
                  className="auth-button"
                  onClick={handleRequestAuth}
                  disabled={!formData.email || emailVerified}
              >
                {isEmailSent ? "재전송" : "인증번호 요청"}
              </button>
            </div>
          </div>
          {(error.email || success.email) && (
              <div className="message-container">
                {error.email && <div className="error-message">{error.email}</div>}
                {success.email && <div className="success-message">{success.email}</div>}
              </div>
          )}
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
                  placeholder="인증번호 6자리 입력"
                  disabled={!isEmailSent || emailVerified}
              />
              {timer > 0 && !emailVerified && <span className="timer">{formatTime(timer)}</span>}
              <button
                  className="auth-button"
                  onClick={handleVerifyAuth}
                  disabled={!formData.authCode || emailVerified || !isEmailSent}
              >
                확인
              </button>
            </div>
          </div>
          {(error.auth || success.auth) && (
              <div className="message-container">
                {error.auth && <div className="error-message">{error.auth}</div>}
                {success.auth && <div className="success-message">{success.auth}</div>}
              </div>
          )}
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
                  disabled={!emailVerified}
              />
            </div>
          </div>
          {(error.password || success.password) && (
              <div className="message-container">
                {error.password && <div className="error-message">{error.password}</div>}
                {success.password && <div className="success-message">{success.password}</div>}
              </div>
          )}
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
                  disabled={!emailVerified}
              />
              {passwordMatch && (
                  <img src="/pwCheck.png" alt="check" className="check-icon" />
              )}
            </div>
          </div>
          {(error.confirmPassword || success.confirmPassword) && (
              <div className="message-container">
                {error.confirmPassword && <div className="error-message">{error.confirmPassword}</div>}
                {success.confirmPassword && <div className="success-message">{success.confirmPassword}</div>}
              </div>
          )}
        </div>

        <div className="resetBtn">
          <div className="LoginResetBtn">
            <button
                onClick={handleSubmit}
                disabled={!emailVerified || !passwordValid || !passwordMatch}
            >
              변경 내용 저장
            </button>
          </div>
        </div>
      </div>
  );
}

export default ResetPassword;
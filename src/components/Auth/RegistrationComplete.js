import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/common.css";
import "../../styles/RegistrationComplete.css"

const RegistrationComplete = ({ formData }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Mock 데이터를 사용 (백엔드 연결 시 주석 처리)
    fetch("/mock-join.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((mockData) => {
        const { response } = mockData;
        if (response && response.roleType) {
          setMessage(`회원가입 성공 - Role: ${response.roleType}`);
        } else {
          setMessage("회원가입 실패: 유효하지 않은 응답 데이터");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Mock 데이터 로드 실패: " + error.message);
      });
  }, [formData]);

  const handleHomeClick = () => {
    navigate("/main");
  };

  return (
    <div className="form">
      <h1 className="form_title">회원가입</h1>

      <div className="form_steps">
        <span className="form_step">1. 개인정보 수집 이용 약관 동의</span>
        <span className="form_step">2. 정보 입력</span>
        <span className="form_step current">3. 회원 가입 신청 완료</span>
      </div>

      <div className="join_com">
        <img src="/img/Logo4.png" alt="SWLUG Logo" className="join_logo" />
        <p className="join_message">
          회원 가입 신청이 완료되었습니다.
          <br />
          최종 회원 가입을 위해서는 가입 신청 후 별도의 승인처리가 진행되며,
          <br />
          승인완료까지 1~2일이 소요될 수 있습니다.
        </p>
        <button type="button" className="btn_home" onClick={handleHomeClick}>
          홈으로
        </button>
      </div>
    </div>
  );
};

export default RegistrationComplete;

// 백엔드 연결 후 사용 
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RegistrationComplete = ({ formData }) => {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const registerUser = async () => {
//       try {
//         const response = await axios.post("http://localhost:8080/users/join", formData);
//         if (response.data && response.data.roleType) {
//           setMessage(`회원가입 성공 - Role: ${response.data.roleType}`);
//         } else {
//           setMessage("회원가입 실패: 유효하지 않은 응답 데이터");
//         }
//       } catch (error) {
//         console.error("Registration error:", error);
//         if (error.response) {
//           // 서버가 응답을 반환했지만 2xx 범위를 벗어난 상태 코드
//           setMessage(`회원가입 실패: ${error.response.data.message || "알 수 없는 오류"}`);
//         } else if (error.request) {
//           // 요청이 전송되었지만 응답을 받지 못함
//           setMessage("서버에 연결할 수 없습니다. 네트워크를 확인해주세요.");
//         } else {
//           // 요청 설정 중에 오류가 발생
//           setMessage("회원가입 요청 중 오류가 발생했습니다.");
//         }
//       }
//     };

//     registerUser();
//   }, [formData]);

//   return (
//     <div>
//       <h1>회원가입 완료</h1>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default RegistrationComplete;
// import axios from 'axios';

// const API_URL = 'http://localhost:8080'; // 백엔드 API URL

// // 로그인 API 요청
// export const login = async (credentials) => {
//   return axios.post(`${API_URL}/users/login`, credentials);
// }

// // 회원가입 API 요청
// export const register = async (formData) => {
//   return axios.post(`${API_URL}/users/register`, formData);
// }

// // 이메일 인증 코드 전송 API 요청
// export const sendAuthCode = async (email) => {
//   return axios.post(`${API_URL}/users/send-auth-code`, { email }); -> 이 부분은 임시로 이렇게 둠..
// }




// 백엔드 연결하면 위에있는 코드 주석 지우고 사용

export const login = async (credentials) => {
    try {
      const response = await fetch('/mock-login.json'); // JSON 파일 로드
      if (!response.ok) {
        throw new Error('네트워크 응답이 실패했습니다.');
      }
  
      const data = await response.json();
      const user = data.users.find(
        (user) => user.id === credentials.id && user.pw === credentials.pw
      );
  
      if (user) {
        return { status: 200, message: 'Login successful' };
      } else {
        return { status: 401, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('JSON 파일을 읽는 중 오류 발생:', error);
      throw error;
    }
  };
  
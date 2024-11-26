import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// 로그인 관련 API
export const login = async (credentials) => {
  if (process.env.NODE_ENV === 'development') {
    try {
      const response = await fetch('/mock-login.json');
      if (!response.ok) throw new Error('네트워크 응답이 실패했습니다.');
      const data = await response.json();
      
      // 로그인 시도 횟수 확인
      if (credentials.try >= 5) {
        return { 
          status: 300, 
          message: '비밀번호 입력 횟수를 초과했습니다. 관리자에게 문의하세요.' 
        };
      }

      const user = data.users.find(
        (user) => user.id === credentials.id && user.pw === credentials.pw
      );

      return user 
        ? { status: 200, message: 'Login successful' }
        : { 
            status: 401, 
            message: 'Invalid credentials',
            try: credentials.try + 1
          };
    } catch (error) {
      console.error('JSON 파일을 읽는 중 오류 발생:', error);
      throw error;
    }
  }
  
  // 실제 API 호출 시에도 try 카운트 포함
  return axios.post(`${API_URL}/users/login`, {
    id: credentials.id,
    pw: credentials.pw,
    try: credentials.try
  });
};

export const logout = async () => {
  return axios.get(`${API_URL}/users/logout`);
};

export const register = async (formData) => {
  if (process.env.NODE_ENV === 'development') {
    return fetch('/mock-join.json');
  }
  return axios.post(`${API_URL}/users/join`, formData);
};

// 회원정보 관련 API
export const deleteUser = async (userData) => {
  return axios.post(`${API_URL}/users/delete`, userData);
};

export const updateUser = async (userData) => {
  return axios.put(`${API_URL}/users/update`, userData);
};

export const getUserInfo = async (userData) => {
  return axios.post(`${API_URL}/users/mypage`, userData);
};

// 게시판 관련 API
export const getPost = async (page, boardId) => {
  return axios.get(`${API_URL}/${page}/board/view/${boardId}`);
};

export const deletePost = async (page, postData) => {
  return axios.delete(`${API_URL}/${page}/board/delete`, { data: postData });
};

export const updatePost = async (page, postData) => {
  return axios.put(`${API_URL}/${page}/board/write`, postData);
};


export const sendAuthCode = async (email) => {
  if (process.env.NODE_ENV === 'development') {
    // 개발용 mock 데이터 처리
    return new Promise(resolve => 
      setTimeout(() => resolve({ status: 200, message: 'Auth code sent' }), 1000)
    );
  }
  return axios.post(`${API_URL}/users/send-auth-code`, { email });
};
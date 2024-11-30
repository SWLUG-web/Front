import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, loginSuccess } from '../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBlogHover, setIsBlogHover] = useState(false); // 블로그 hover 상태 관리

  // 컴포넌트 마운트 시 로그인 상태 복원
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    if (storedUser && token && !isAuthenticated) {
      dispatch(loginSuccess({
        user: JSON.parse(storedUser),
        token
      }));
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout(); // API 호출
      dispatch(logout()); // Redux 상태 초기화
      localStorage.removeItem('authToken'); // 로컬 스토리지 토큰 제거
      localStorage.removeItem('user'); // 로컬 스토리지 사용자 정보 제거
      window.location.href = '/main';
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };


  return (
    <header className="bg-white">
      <div className="container mx-auto flex items-center justify-between h-20 px-8">
        <div className="logo">
          <img src="/swlug.png" alt="SWLUG Logo" className="w-24 h-auto" />
        </div>
        <nav className="flex-1">
          <ul className="flex justify-center items-center space-x-8 text-lg font-medium text-gray-700">
            <li><a href="/intro" className="hover:text-blue-600">소개</a></li>
            <li
                onMouseEnter={() => setIsBlogHover(true)}
                onMouseLeave={() => setIsBlogHover(false)}
                className="relative"
            >
              <a href="/blog" className="hover:text-blue-600">
                블로그
              </a>
              {isBlogHover && (
                  <div
                      className="absolute top-full left-0 bg-gray-100 shadow-lg rounded-lg px-4 py-2"
                      style={{
                        display: "flex", // Flexbox 사용
                        flexDirection: "row", // 가로 정렬
                        gap: "10px", // 항목 간 간격
                        whiteSpace: "nowrap", // 줄바꿈
                      }}
                  >
                    <a href="/blog?category=성과" className="hover:bg-gray-200 px-4 py-2 rounded-lg">
                      성과
                    </a>
                    <a href="/blog?category=정보" className="hover:bg-gray-200 px-4 py-2 rounded-lg">
                      정보
                    </a>
                    <a href="/blog?category=후기" className="hover:bg-gray-200 px-4 py-2 rounded-lg">
                      후기
                    </a>
                    <a href="/blog?category=활동" className="hover:bg-gray-200 px-4 py-2 rounded-lg">
                      활동
                    </a>
                  </div>
              )}
            </li>
            <li><a href="/notice" className="hover:text-blue-600">공지</a></li>
            <li><a href="/apply" className="hover:text-blue-600">지원</a></li>
            <li><a href="/faq" className="hover:text-blue-600">FAQ</a></li>
          </ul>
        </nav>
        <div className="relative">
          {!isAuthenticated ? (
              <button
                  onClick={() => window.location.href = '/users/login'}
                  className="text-lg font-medium text-gray-700 hover:text-blue-600"
              >
                로그인 ▼
              </button>
          ) : (
              <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-700 hover:text-blue-600 text-lg font-medium"
                >
                  {user?.id || '사용자'} <span className="ml-1">▼</span>
                </button>
                {isDropdownOpen && (
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-4">
                      <div className="flex flex-col items-center">
                        <a
                            href="/users/mypage"
                            className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          마이페이지
                        </a>
                        <hr className="w-4/5 border-gray-300 my-2"/>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>              
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
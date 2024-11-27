import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/main';
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
            <li><a href="/blog" className="hover:text-blue-600">블로그</a></li>
            <li><a href="/notice" className="hover:text-blue-600">공지</a></li>
            <li><a href="/support" className="hover:text-blue-600">지원</a></li>
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
                {user?.name || '사용자'} <span className="ml-1">▼</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <a
                    href="/users/mypage"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    마이페이지
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
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
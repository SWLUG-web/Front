import React from 'react';
import "../styles/Header.css";

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between h-20 px-8">
                <div className="logo">
                    {/* 수정된 경로 */}
                    <img src="/swlug.png" alt="SWLUG Logo" className="w-24 h-auto" />
                </div>
                <nav className="navigation flex-1">
                    {/* 중앙 정렬 */}
                    <ul className="flex justify-center items-center space-x-8 text-lg font-medium text-gray-700">
                        <li><a href="/intro" className="hover:text-blue-600">소개</a></li>
                        <li><a href="/blog" className="hover:text-blue-600">블로그</a></li>
                        <li><a href="/notice" className="hover:text-blue-600">공지</a></li>
                        <li><a href="/support" className="hover:text-blue-600">지원</a></li>
                        <li><a href="/faq" className="hover:text-blue-600">FAQ</a></li>
                    </ul>
                </nav>
                {/* 오른쪽 여유 공간 */}
                <div className="flex-none"></div>
            </div>
        </header>
    );
};

export default Header;

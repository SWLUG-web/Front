import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/swlug.png" alt="SWLUG Logo" />
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/intro">소개</a></li>
                    <li><a href="/blog">블로그</a></li>
                    <li><a href="/notice">공지</a></li>
                    <li><a href="/support">지원</a></li>
                    <li><a href="/faq">FAQ</a></li>
                </ul>
            </nav>
            <div className="auth">
                <a href="/login">로그인 ▼</a>
            </div>
        </header>
    );
};

export default Header;

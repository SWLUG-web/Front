import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 스크롤을 페이지 상단으로 초기화
    window.scrollTo(0, 0);
  }, [pathname]); // pathname이 변경될 때마다 실행

  return null; // 화면에 렌더링하지 않음
};

export default ScrollToTop;

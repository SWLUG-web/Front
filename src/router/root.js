import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Privacy from "../pages/Privacy";
import ProtectedRoute from "../ProtectedRoute"

// Lazy-loaded components
const Login = lazy(() => import("../pages/Auth/LoginPage"));
const Join = lazy(() => import("../pages/Auth/JoinPage"));
const MyPage = lazy(() => import("../pages/MyPage/MyPage"));
const ResetPasswordPage = lazy(() => import("../pages/Auth/ResetPasswordPage"));
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const NoticePage = lazy(() => import("../pages/Notice/NoticePage"));
const NoticeDetailPage = lazy(() => import("../pages/Notice/NoticeDetailPage"));
const NoticeWrite = lazy(() => import("../pages/Notice/NoticeWrite")); // 추가
const FAQPage = lazy(() => import("../pages/FAQ/FAQPage"));
const ApplyPage = lazy(() => import("../pages/Apply/ApplyPage"));
const Intro = lazy(() => import("../pages/Intro/Intro"));
const BlogMain = lazy(() => import("../pages/Blog/BlogMain"));
const BlogPost = lazy(() => import("../pages/Blog/BlogPost"));
const BlogWrite = lazy(() => import("../pages/Blog/BlogWrite"));
const NotFound = lazy(() => import("../components/NotFound"))

const root = createBrowserRouter([
  // 게시판 작성 경로
  {
    path: "/board/write",
    element: (
        <ProtectedRoute>
          <BlogWrite />
        </ProtectedRoute>
    ),
  },
  // 공지사항 작성 경로 추가
  {
    path: "/notice/write",
    element: (
        <ProtectedRoute>
          <NoticeWrite />
        </ProtectedRoute>
    ),
  },
  // /users 경로
  { path: "/users/login", element: <Login /> },
  { path: "/users/join", element: <Join /> },
  { path: "/users/mypage", element: <MyPage /> },
  { path: "/users/update", element: <ResetPasswordPage /> },
  { path: "*", element: <NotFound /> },
  // 기존 경로
  { path: "/main", element: <HomePage /> },
  { path: "/notice", element: <NoticePage /> },
  { path: "/notice/:noticeId", element: <NoticeDetailPage /> },
  { path: "/faq", element: <FAQPage /> },
  { path: "/apply", element: <ApplyPage /> },
  { path: "/intro", element: <Intro /> },
  { path: "/blog", element: <BlogMain /> },
  { path: "/board/:boardId", element: <BlogPost /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/", element: <HomePage /> }, // 기본 경로
]);

export default root;
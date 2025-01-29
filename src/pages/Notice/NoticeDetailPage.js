import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/NoticeDetail.css";

const NoticeDetail = () => {
    const { noticeId } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adjacentNotice, setAdjacentNotice] = useState({ previous: null, next: null });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [noticeId]);

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                const response = await axios.post("/api/notice/delete", { id: noticeId });

                if (response.status === 401) {
                    alert("삭제 권한이 없습니다.");
                    return;
                }

                if (response.data?.redirect) {
                    alert("게시물이 삭제되었습니다.");
                    navigate("/notice");
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (error) {
                console.error("게시물 삭제 실패:", error);
                if (error.response?.status === 401) {
                    alert("로그인이 필요하거나 삭제 권한이 없습니다.");
                } else {
                    alert("게시물 삭제에 실패했습니다. 다시 시도해주세요.");
                }
            }
        }
    };

    const handleEdit = () => {
        navigate("/notice/write", { state: { notice } });
        window.scrollTo(0, 0);
    };

    const handleNavigate = (id) => {
        navigate(`/notice/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [noticeResponse, adjacentResponse] = await Promise.all([
                    axios.post("/api/notice/detail", { id: noticeId }),
                    axios.post("/api/notice/adjacent", { id: noticeId })
                ]);

                setNotice({
                    id: noticeResponse.data.id,
                    title: noticeResponse.data.noticeTitle,
                    date: noticeResponse.data.createAt,
                    author: noticeResponse.data.userId,
                    content: noticeResponse.data.noticeContents
                });

                setAdjacentNotice({
                    previous: adjacentResponse.data.previous || null,
                    next: adjacentResponse.data.next || null
                });

                setLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [noticeId]);

    if (loading) return <p>Loading...</p>;

    if (!notice) return <p>공지사항을 찾을 수 없습니다.</p>;

    return (
        <div className="notice-detail">
            <div className="notice-category">공지사항</div>
            <h1 className="notice-title">{notice.title}</h1>
            <div className="notice-actions">
                <button className="edit-button" onClick={handleEdit}>
                    수정
                </button>
                <span className="divider">|</span>
                <button className="delete-button" onClick={handleDelete}>
                    삭제
                </button>
            </div>
            <div className="notice-content" dangerouslySetInnerHTML={{ __html: notice.content }} />
            {/* 이전 글/다음 글 네비게이션 */}
            <div className="notice-navigation">
                <button
                    onClick={() => adjacentNotice.previous && handleNavigate(adjacentNotice.previous.id)}
                    disabled={!adjacentNotice.previous}
                >
                    {adjacentNotice.previous ? (
                        <>
                            <span className="nav-label">&lt;&nbsp;&nbsp;이전글</span>
                            <span className="nav-title">{adjacentNotice.previous.noticeTitle}</span>
                        </>
                    ) : (
                        "<  글이 없습니다"
                    )}
                </button>
                <button
                    onClick={() => adjacentNotice.next && handleNavigate(adjacentNotice.next.id)}
                    disabled={!adjacentNotice.next}
                >
                    {adjacentNotice.next ? (
                        <>
                            <span className="nav-title">{adjacentNotice.next.noticeTitle}</span>
                            <span className="nav-label">다음글&nbsp;&nbsp;&gt;</span>
                        </>
                    ) : (
                        "글이 없습니다  >"
                    )}
                </button>
            </div>

        </div>
    );
};

export default NoticeDetail;
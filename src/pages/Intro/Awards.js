import React from "react";
import "../../styles/Awards.css";

const Awards = () => {
    const awardsData = [
        {
            year: "2024",
            events: ["3월 - 정보보호 올림피아드 본선 진출", "4월 - 교내 CTF 대회 개최", "5월 - 보안 컨퍼런스 발표", "7월 - 교내 정보보안 세미나 개최"],
        },
        {
            year: "2023",
            events: ["3월 - KISA 해킹방어대회 본선 진출", "4월 - 전국 대학생 보안 경진대회 수상", "5월 - 보안 프로젝트 경진대회 우수상", "7월 - 정보보안 논문 공모전 수상"],
        },
        {
            year: "2022",
            events: ["3월 - 사이버 공격방어 대회 참가", "4월 - 정보보안 세미나 주최", "5월 - 보안 취약점 발견 공로상", "7월 - 교내 정보보호 페스티벌 개최"],
        },
        {
            year: "2021",
            events: ["3월 - 보안 컨퍼런스 발표", "4월 - 취약점 분석 대회 수상", "5월 - 정보보안 아이디어 공모전 우승", "7월 - 보안 프로젝트 경진대회 장려상"],
        },
        {
            year: "2020",
            events: ["3월 - 사이버 보안 콘테스트 참가", "4월 - 정보보안 세미나 개최", "5월 - 보안 연구 프로젝트 수행", "7월 - 교내 CTF 대회 우승"],
        },
    ];

    return (
        <div className="awards-history-container">
            {awardsData.map((item, index) => (
                <div key={index} className="awards-history-card">
                    <div className="awards-year">{item.year}</div>
                    <div className="awards-events">
                        {item.events.map((event, idx) => (
                            <p key={idx}>{event}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Awards;
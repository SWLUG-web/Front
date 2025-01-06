import React, {useEffect, useState} from 'react';
import FAQItem from '../../components/FAQ/FAQItem';
import faqs from '../../data/faqs';
import '../../styles/FAQPage.css';
import axios from "axios";

const FAQPage = () => {
  // const [category, setCategory] = useState('전체');
    const [index, setIndex] = useState('');
    const categories = ['전체', '지원', '활동', '기타'];

    useEffect(() => {
        axios.get('/faq')
            .then(res => setIndex(res.data))
            .catch(err => console.log(err))
    }, []);


    const filteredFaqs =
    index === 0
      ? faqs
      : faqs.filter((faq) => faq.category === categories[index]);

  return (
    <div className="faq-page container mx-auto px-4 py-8">
      <h1 className="apply-title text-3xl font-bold text-center mb-6" style={{ fontSize: '24px' }}>FAQ</h1>
      <p className="faq-text">SWLUG 관련하여 궁금한 부분을 확인해보세요</p>
      <div className="faq-filters">
        {categories.map((cat, index) => (
            <button
                key={index}
                onClick={() => setIndex(index)} // 버튼 클릭 시 선택된 인덱스로 상태 업데이트
                className={`faq-filter-button ${
                    index === index ? 'selected' : '' // 현재 선택된 인덱스에 따라 스타일 변경
                }`}
            >
                {cat}
            </button>
        ))}
      </div>
        {filteredFaqs.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer}/>
        ))}
        <p className="faq-footer-text">
            ※ 이 밖의 문의사항은 Contact Us를 참고해 문의 바랍니다.
        </p>
    </div>
  );
};

export default FAQPage;

import React, { useState } from 'react';
import FAQItem from '../../components/FAQ/FAQItem';
import faqs from '../../data/faqs';
import '../../styles/FAQPage.css';

const FAQPage = () => {
  const [category, setCategory] = useState('전체');

  const categories = ['전체', '지원', '활동', '기타'];

  const filteredFaqs =
    category === '전체'
      ? faqs
      : faqs.filter((faq) => faq.category === category);

  return (
    <div className="faq-page container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">FAQ</h1>
      <div className="faq-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`faq-filter-button ${
              category === cat ? 'selected' : ''
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {filteredFaqs.map((faq) => (
        <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
      ))}
      <p className="faq-footer-text">
        ※ 이 밖의 문의사항은 Contact Us를 참고해 문의 바랍니다.
      </p>
    </div>
  );
};

export default FAQPage;

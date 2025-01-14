import React, { useState } from 'react';
import '../../styles/FAQPage.css';

const FAQItem = ({ image = '/qna.png', question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item">
            <div
                className="faq-question"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <img src={image} alt="FAQ Icon" className="faq-icon" />
                <span>{question}</span>
                <img
                    src={isOpen ? '/faq_up.png' : '/faq_down.png'}
                    alt="Toggle"
                    className="faq-toggle-icon"
                />
            </div>
            {isOpen && (
                <div className="faq-answer">
                    <img
                        src="/faq_penguin.png"
                        alt="Penguin"
                        className="faq-penguin"
                    />
                    <div className="faq-speech-bubble">
                        <p className="speech-bubble-text">{answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQItem;
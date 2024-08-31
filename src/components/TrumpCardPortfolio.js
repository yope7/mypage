import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PokerTablePortfolio = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const cards = [
    { id: 1, title: 'About Me', content: 'Web developer passionate about creating unique experiences.' },
    { id: 2, title: 'Web Skills', content: 'HTML, CSS, JavaScript, React, Vue.js, Node.js' },
    { id: 3, title: 'Machine Learning', content: 'Python, TensorFlow, PyTorch, Scikit-learn' },
    { id: 4, title: 'Study', content: 'Continuous learner, focusing on AI and cloud technologies' },
    { id: 5, title: 'Contact', content: 'Get in touch for collaborations or opportunities.' },
  ];

  const handleCardFlip = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <div className="poker-table-portfolio">
      <div className="shortcut-cards">
        {[1, 2, 3].map(num => (
          <div key={num} className="shortcut-card">{num}</div>
        ))}
      </div>
      <div className="main-cards">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`card ${flippedCard === card.id ? 'flipped' : ''}`}
            onClick={() => handleCardFlip(card.id)}
            whileHover={{ scale: 1.05 }}
            layout
          >
            <div className="card-inner">
              <div className="card-front">
                <h2>{card.title}</h2>
              </div>
              <div className="card-back">
                <p>{card.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PokerTablePortfolio;
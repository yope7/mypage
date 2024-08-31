import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PokerTablePortfolio = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dealtCards, setDealtCards] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const cards = [
    { id: 1, title: 'About Me', summary: 'Web developer passionate about creating unique experiences.' },
    { id: 2, title: 'Web Skills', summary: 'HTML, CSS, JavaScript, React, Vue.js, Node.js' },
    { id: 3, title: 'Machine Learning', summary: 'Python, TensorFlow, PyTorch, Scikit-learn' },
    { id: 4, title: 'Study', summary: 'Continuous learner, focusing on AI and cloud technologies' },
    { id: 5, title: 'Contact', summary: 'Get in touch for collaborations or opportunities.' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const dealCards = async () => {
      for (let i = 0; i < cards.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setDealtCards(prev => [...prev, cards[i].id]);
      }
    };
    dealCards();
  }, []);

  const handleCardHover = (id) => setHoveredCard(id);
  const handleCardLeave = () => setHoveredCard(null);
  const handleCardClick = (id) => setSelectedCard(id);

  const cardPosition = (index) => {
    const totalCards = cards.length;
    const isMobile = windowSize.width <= 768;
    
    if (isMobile) {
      const verticalSpacing = windowSize.height / (totalCards + 1);
      return {
        left: '50%',
        top: `${verticalSpacing * (index + 1)}px`,
        transform: 'translateX(-50%)',
      };
    } else {
      const angle = (index - (totalCards - 1) / 2) * 20;
      const radius = Math.min(windowSize.width, windowSize.height) * 0.35;
      return {
        left: `calc(50% + ${radius * Math.sin(angle * Math.PI / 180)}px)`,
        top: `calc(50% + ${radius * Math.cos(angle * Math.PI / 180)}px)`,
        transform: 'translate(-50%, -50%)',
      };
    }
  };

  return (
    <div className="poker-table-portfolio">
      <div className="deck">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="card"
            initial={{ opacity: 0, scale: 0.7, rotateY: 180 }}
            animate={dealtCards.includes(card.id) ? {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              ...cardPosition(index),
            } : {}}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              duration: 0.5,
            }}
          >
            <motion.div
              className={`card-inner ${hoveredCard === card.id ? 'hovered' : ''}`}
              onMouseEnter={() => handleCardHover(card.id)}
              onMouseLeave={handleCardLeave}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 180,
                transition: { duration: 0.3 }
              }}
            >
              <div className="card-front">
                <h2>{card.title}</h2>
              </div>
              <div className="card-back">
                <p>{card.summary}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div 
            className="card-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div 
              className="card-popup"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{cards.find(c => c.id === selectedCard).title}</h2>
              <p>{cards.find(c => c.id === selectedCard).summary}</p>
              <button onClick={() => setSelectedCard(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PokerTablePortfolio;
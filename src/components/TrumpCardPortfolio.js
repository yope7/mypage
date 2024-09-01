import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PokerTablePortfolio = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dealtCards, setDealtCards] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });



const cards = [
  { id: 1, title: 'About Me', summary:
    `所属 \n 
    2020年3月　私立須磨学園高校　普通科　卒業
    2020年4月　大阪大学　工学部　電子情報工学科　入学 
    2024年3月　大阪大学　工学部　電子情報工学科　卒業
    2024年4月　大阪大学　大学院　情報科学研究科　
    マルチメディア工学専攻　入学
    2026年3月　大阪大学　大学院　情報科学研究科　
    マルチメディア工学専攻　修了予定
     
趣味 \n
    水泳
    カメラ
    グルメ旅


     
    ` },
  { id: 2, title: 'Web Skills', summary: 'HTML, CSS, JavaScript, React, Vue.js, Node.js' },
  { id: 3, title: 'Machine Learning', summary: 'Python, TensorFlow, PyTorch, Scikit-learn' },
  { id: 4, title: 'Study', summary: 'Continuous learner, focusing on AI and cloud technologies' },
  { id: 5, title: 'Contact', summary: 
    `mail: noguchi.yoshiki & ist.osaka-u.ac.jp 
    (&を@に変えてお使いください)
    
    Github: yope7` },

];


  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    const dealInterval = 500; // カードを配る間隔（ミリ秒）
    
    cards.forEach((card, index) => {
      setTimeout(() => {
        setDealtCards(prev => [...prev, card.id]);
      }, index * dealInterval);
    });
  }, []);

  const handleCardHover = (id) => setHoveredCard(id);
  const handleCardLeave = () => setHoveredCard(null);
  const handleCardClick = (id) => setSelectedCard(id);

  const getCardSize = () => {
    const baseWidth = Math.min(dimensions.width * 0.3, 150);
    const baseHeight = baseWidth * 1.4;
    const totalCards = cards.length;
    const totalWidth = totalCards * baseWidth + (totalCards - 1) * (baseWidth * 0.3);
    const scaleFactor = Math.min(1, dimensions.width / totalWidth);
    
    return {
      width: baseWidth * scaleFactor,
      height: baseHeight * scaleFactor,
    };
  };

  const cardSize = getCardSize();

  const deckPosition = {
    x: dimensions.width / 2,
    y: dimensions.height * 0.3, // デッキの位置を下げる
  };

  const getCardPosition = (index) => {
    const totalCards = cards.length;
    const baseCardWidth = Math.min(dimensions.width * 0.15, 150);
    const baseCardHeight = baseCardWidth * 1.4;
    const baseCardSpacing = baseCardWidth * 0.3;
  
    // 全カードの幅と間隔の合計を計算
    const totalWidth = (totalCards * baseCardWidth) + ((totalCards - 1) * baseCardSpacing);
    
    // スケールファクターを計算（必要に応じてカードを縮小）
    const scaleFactor = Math.min(1, (dimensions.width * 0.9) / totalWidth);
    
    // スケールを適用した幅と間隔を計算
    const cardWidth = baseCardWidth * scaleFactor;
    const cardHeight = baseCardHeight * scaleFactor;
    const cardSpacing = baseCardSpacing * scaleFactor;
  
    // 中心のインデックスを計算
    const centerIndex = (totalCards - 1) / 2;
    
    // 中心からのオフセットを計算
    const offset = index - centerIndex;
    
    // xの位置を計算（中心を基準に）
    const x = (dimensions.width / 2.2) + (offset * (cardWidth + cardSpacing));
    const y = dimensions.height * 0.7;
  
    return { x, y, width: cardWidth, height: cardHeight };
  };

  return (
    <div className="poker-table-portfolio" style={{
      backgroundColor: '#006633',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* デッキの表示 */}
      <motion.div
    style={{
        position: 'absolute',
        width: cardSize.width,
        height: cardSize.height,
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: `${cardSize.width * 0.16}px`,
        fontWeight: 'bold',
        left: '50%',
        top: `${dimensions.height * 0.3}px`,
        transform: 'translate(-50%, -50%)',
    }}
    >
    DECK
    </motion.div>

      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`card ${dealtCards.includes(card.id) ? 'dealt' : ''}`}
          initial={deckPosition}
          animate={dealtCards.includes(card.id) ? getCardPosition(index) : deckPosition}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            duration: 0.2,
          }}
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
          }}
        >
          <motion.div
            className={`card-inner ${hoveredCard === card.id ? 'hovered' : ''}`}
            onMouseEnter={() => handleCardHover(card.id)}
            onMouseLeave={handleCardLeave}
            onClick={() => handleCardClick(card.id)}
            // whileHover={{ 
            //   rotateY: 180,
            //   transition: { duration: 0.01}
            // }}
            style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="card-front" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1em',
              
            }}>
              <h2>{card.title}</h2>
            </div>
            <div className="card-back" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundColor: '#f0f0f0',
              border: '2px solid black',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'rotateY(180deg)',
              fontSize: '0.8em',
              whiteSpace: 'pre-wrap',
            //   padding: '10px',
            }}>
              <p>{card.summary}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}

    <AnimatePresence>
    {selectedCard && (
        <motion.div 
        className="card-popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedCard(null)}
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}
        >
        <motion.div 
        className="card-popup"
        initial={{ scale: 0, rotateY: 180, opacity: 0 }}
        animate={{ scale: 1, rotateY: 360, opacity: 1 }}
        exit={{ scale: 0, rotateY: 0, opacity: 0 }}
        transition={{
            duration: 1.4, // アニメーション全体の時間を1.5秒に設定
            scale: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.8
            },
            rotateY: {
            type: 'tween', // 線形の回転アニメーション
            ease: 'easeInOut',
            duration: 0.4 // 回転のみ1.5秒かけて行う
            },
            opacity: { duration: 0.8 } // 透明度の変化は0.5秒で完了
        }}   
            onClick={(e) => e.stopPropagation()}
            style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '15px',
            width: '80%',
            maxWidth: '400px',
            height: '70vh',
            maxHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            fontSize: '85%',
            whiteSpace: 'pre-wrap',
            }}
        >
            <div style={{ overflowY: 'auto', flex: 1 }}>
            <h2>{cards.find(c => c.id === selectedCard).title}</h2>
            <p>{cards.find(c => c.id === selectedCard).summary}</p>
            </div>
            <button 
            onClick={() => setSelectedCard(null)}
            >
            Close
            </button>
        </motion.div>
        </motion.div>
    )}
    </AnimatePresence>
      {/* <div style={{
  position: 'absolute',
  left: '50%',
  top: 0,
  bottom: 0,
  width: '1px',
  backgroundColor: 'red',
  zIndex: 1000
}} /> */}
    </div>
  );
};

export default PokerTablePortfolio;
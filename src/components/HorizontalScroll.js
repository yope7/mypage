import { useCallback, useEffect, useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion, useScroll, useInView } from "framer-motion";
import foxImage from '../img/fox.png';
import cycling from '../img/cycling.jpg';
import treeBack from '../img/back/ki.png';
import waterBack from '../img/back/water.jpg';
import waterBackbig from '../img/back/water_big.jpg';
import { ins } from "framer-motion/client";

const cards = [
    { name: 'Cycling', description: '定期的に自転車で旅をしています。京都や神戸など、遠すぎず、近すぎずな場所にサイクリングした時の達成感は最高です。', image: cycling , back: waterBack},
    { name: 'Photography', description: 'Capturing moments in time', image: foxImage,  back: waterBack},
    { name: 'Gaming', description: 'Immersing in virtual worlds', image: foxImage,  back: waterBack},
    { name: 'Swimming', description: 'Staying fit in the water', image: foxImage,  back: waterBack},
    { name: 'Cooking', description: 'Experimenting with flavors', image: foxImage,  back: waterBack},
    { name: 'Traveling', description: 'Discovering new cultures', image: foxImage, back: waterBack},
];

// カードコンポーネント
// どれだけ移動させるかを0~100%で指定
export function Cards({ containerRef, transformXPercent }) {
    const [cardWidth, setCardWidth] = useState(300);
    const [cardGap, setCardGap] = useState(20);
    const [containerPadding, setContainerPadding] = useState(20);
    const [transformX, setTransformX] = useState(0);
    const ref = useRef(null);

    const updateTransformX = useCallback(() => {
        // console.log(containerRef.current);
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const cardCount = cards.length;
            const totalCardWidth = cardWidth * cardCount;
            const totalCardGap = cardGap * (cardCount - 1);
            const totalWidth = totalCardWidth + totalCardGap + containerPadding * 2;
            const maxTransformX = totalWidth - containerWidth;
            setTransformX(maxTransformX * transformXPercent / 100);
        }
    }, [containerRef, cardWidth, cardGap, containerPadding, transformXPercent]);

    useEffect(() => {
        updateTransformX();

        // リサイズ時にtransformXを更新
        window.addEventListener('resize', updateTransformX);

        return () => {
            window.removeEventListener('resize', updateTransformX);
        };
    }, [containerRef, cardWidth, cardGap, containerPadding, transformXPercent]);

    return (
        <div
            ref={ref}
            style={{
                display: "flex",
                gap: `${cardGap}px`,
                padding: `${containerPadding}px`,
                transform: `translateX(-${transformX}px)`,
                // clipPath: 'inset(0)', // クリッピングパスを設定


                // transition: "transform 0.5s",
            }}
        >
 {cards.map((card, idx) => (
    <Card
        key={idx}
        style={{
            width: `${cardWidth - 40 - 2}px`,
            height: "400px",
            padding: `20px`,
            border: "1px solid black",
            borderRadius: "10px",
            position: "relative", // 追加: 相対位置指定
            overflow: "hidden", // 追加: はみ出た部分を隠す
            backgroundColor: "transparent",
            boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5)", // 影を追加
            // backgroundblur: "blur(10px)",


        }}
    >
        {/* 追加: 背景画像用の疑似要素 */}
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // backgroundImage: `url(${card.back})`,
                // backgroundSize: "cover",
                // opacity: 0.8, // 透明度を設定
                // zIndex: 1, // コンテンツの背面に配置
                // clipPath: 'inset(0)', // クリッピングパスを設定

            }}
        />
        <CardMedia
            style={{ opacity: "1", }}
            sx={{ height: 180 }}
            image={card.image}
        />
        <CardContent 
            style={{
                color: "#100202",
            }}>
            <Typography gutterBottom variant="h5" component="div">
                {card.name}
            </Typography>
            <Typography variant="body2">
                {card.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
        </CardActions>
    </Card>
))}
        </div>
    );
}

export function HorizontalScroll() {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef });
    const isInView = useInView(scrollRef, { amount: "all" });
    const [transformXPercent, setTransformXPercent] = useState(0);

    useEffect(() => {
        if (isInView) {
            console.log("In view");
        } else {
            console.log("Out of view");
        }
    }, [isInView]);

    // scrollYProgressの値に基づいてtransformXPercentを更新
    const updateTransformXPercent = useCallback(() => {
        const progress = scrollYProgress.get();
        // console.log(progress);
        setTransformXPercent(progress * 100);
    }, [scrollYProgress]);

    useEffect(() => {
        // スクロール位置に応じてtransformXPercentを更新
        updateTransformXPercent();

        // スクロール時にtransformXPercentを更新
        window.addEventListener('scroll', updateTransformXPercent);

        return () => {
            window.removeEventListener('scroll', updateTransformXPercent);
        };
    
    }, [scrollYProgress]);

    return (
        <div style={{ 
            height: "340vh",
            }}>
                <Typography variant="h4" gutterBottom align="center" display="block">
                    Contact Me
                </Typography>
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "0px",
                    // background: "red",
                    transformOrigin: "0%",
                    scaleX: scrollYProgress,
                }}
            />
            
            <div
                ref={scrollRef}
                style={{
                    paddingTop: "20vh",
                    height: "300vh",
                    // background: "orange",
                    // whiteSpace: "nowrap",
                    // display: "flex",
                    alignItems: "center",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    contain : "paint",
                    

                }}
            >

                <div style={
                    {   
                        display : "flex",
                        position: "sticky",
                        top: "30vh",
                }}>
                    
                <Cards
                    containerRef={scrollRef}
                    transformXPercent={transformXPercent}
                />
            </div>
        </div>
    </div>
    );
}
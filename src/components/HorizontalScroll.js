import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useInView } from "framer-motion";

const cards = [
    {
        "title": "Card 1",
        "description": "This is a description for card 1",
    },
    {
        "title": "Card 2",
        "description": "This is a description for card 2",
    },
    {
        "title": "Card 3",
        "description": "This is a description for card 3",
    },
    {
        "title": "Card 4",
        "description": "This is a description for card 4",
    },
    {
        "title": "Card 5",
        "description": "This is a description for card 5",
    },
    {
        "title": "Card 6",
        "description": "This is a description for card 6",
    },
    {
        "title": "Card 7",
        "description": "This is a description for card 7",
    },
    {
        "title": "Card 8",
        "description": "This is a description for card 8",
    },
    {
        "title": "Card 9",
        "description": "This is a description for card 9",
    },
    {
        "title": "Card 10",
        "description": "This is a description for card 10",
    },
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


                // transition: "transform 0.5s",
            }}
        >
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    style={{
                        // paddingとborderの分だけ引いて補正
                        width: `${cardWidth - 40 - 2}px`,
                        height: "400px",
                        background: "white",
                        padding: `20px`,
                        border: "1px solid black",
                        borderRadius: "10px",
                    }}
                >
                    <h1>{card.title}</h1>
                    <p>{card.description}</p>
                </div>
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
            height: "200vh",
            }}>
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "0px",
                    background: "red",
                    transformOrigin: "0%",
                    scaleX: scrollYProgress,
                    backgtound: "red",
                }}
            />
            <div
                ref={scrollRef}
                style={{
                    height: "200vh",
                    position: "sticky",
                    top: "60vh",


                    background: "orange",
                    overflowX: "hidden",
                    overflowY: "hidden",
                    whiteSpace: "nowrap",
                    // display: "flex",
                    alignItems: "center",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                <Cards
                    containerRef={scrollRef}
                    transformXPercent={transformXPercent}
                />
            </div>
        </div>
    );
}
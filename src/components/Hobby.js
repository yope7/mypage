import { useState, useRef, useEffect } from "react";
import {
    Typography,
    CardMedia,
    CardContent,
    Card,
} from "@mui/material";
import { styled } from '@mui/system';
import { useInView } from 'react-intersection-observer';

import foxImage from '../img/fox.png';

const HobbiesContainer = styled('div')({
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '500px',
});

const HobbiesTrack = styled('div')(({ scrollPosition }) => ({
    display: 'flex',
    transition: 'transform 0.1s linear',
    transform: `translateX(-${scrollPosition}px)`,
}));

const HobbyCard = styled(Card)({
    flex: '0 0 300px',
    margin: '0 20px',
    height: '400px',
});

const hobbiesData = [
    { name: 'Cycling', description: 'Exploring nature on two wheels', image: foxImage },
    { name: 'Photography', description: 'Capturing moments in time', image: foxImage },
    { name: 'Gaming', description: 'Immersing in virtual worlds', image: foxImage },
    { name: 'Swimming', description: 'Staying fit in the water', image: foxImage },
    { name: 'Cooking', description: 'Experimenting with flavors', image: foxImage },
    { name: 'Traveling', description: 'Discovering new cultures', image: foxImage },
];

export function Hobby() {
    const [cardsScrollPosition, setCardsScrollPosition] = useState(0);
    const [maxCardsScrollPosition, setMaxCardsScrollPosition] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const { ref: hobbiesRef, inView: cardsIsInView } = useInView({
        threshold: 1,
    });
    const cardsAreaRef = useRef(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (cardsAreaRef.current) {
            const cardsAreaWidth = cardsAreaRef.current.getBoundingClientRect().width;
            const cardsTrackWidth = (300 + 20 * 2) * hobbiesData.length;
            const maxScrollPosition = cardsTrackWidth - cardsAreaWidth;
            setMaxCardsScrollPosition(maxScrollPosition);
        }
    }, [viewportWidth]);

    useEffect(() => {
        const handleScroll = () => {
            if (!cardsIsInView) return;

            const scrollTop = window.scrollY;
            const scrollDirection = scrollTop > lastScrollY.current ? 'down' : 'up';
            console.log('scrollTop:', scrollTop);
            console.log('scrollDirection:', scrollDirection);

            if (cardsIsInView) {
                console.log('isHorizontalScroll');
                // 横スクロールに切り替え
                setCardsScrollPosition((prev) => Math.max(0, Math.min(maxCardsScrollPosition, prev + (scrollDirection === 'down' ? 10 : -10))));
            } else {
                // 縦スクロール処理
                if (scrollTop > cardsAreaRef.current.offsetTop && scrollTop < cardsAreaRef.current.offsetTop + cardsAreaRef.current.offsetHeight) {
                } else {
                    setCardsScrollPosition(0);
                }
            }
            
            lastScrollY.current = scrollTop;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [cardsIsInView, maxCardsScrollPosition]);

    return (
        <HobbiesContainer ref={hobbiesRef}>
            <Typography variant="h4" gutterBottom align="center">
                趣味
            </Typography>
            <HobbiesTrack scrollPosition={cardsScrollPosition} ref={cardsAreaRef}>
                {hobbiesData.map((hobby, index) => (
                    <HobbyCard key={index}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={hobby.image}
                            alt={hobby.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {hobby.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {hobby.description}
                            </Typography>
                        </CardContent>
                    </HobbyCard>
                ))}
            </HobbiesTrack>
        </HobbiesContainer>
    );
}

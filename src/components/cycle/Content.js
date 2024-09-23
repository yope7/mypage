import React, { useRef, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import bikeImage from '../../img/bike.png';
import { fontGrid } from '@mui/material/styles/cssUtils';
// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import {Cards} from './Cards';

const theme = createTheme({
  palette: {
    background: {
      default: '#1a1a1a',
    },
    text: {
      primary: '#fad5b0',
      fontFamily: "Helvetica Neue",
      fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif'
    },
  },
});

const GradientBackground = styled('div')({
  width: '100%',
  height: '100vh',
  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(26,26,26,1) 70%)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
});

const HorizontalScroll = styled('div')({
  // display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  overflowX: 'auto',
  overflowY: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
});

const Section = styled('div')({//画面全体っぽい
  // Width: '300vw',
  height: '100vh',
  display: 'flex',
  // alignItems: 'center',
  gap: '10rem',
});

const BikeSection = styled(Section)({
  // scale: 0.6,
  position : 'fixed',
  zIndex:3,


});

const ContentSection = styled(Section)({
  // justifyContent: 'flex-start',
  paddingLeft: '45vw',
  // desplay: 'flex',
  width: '500vw',
  gap: '5%',
  // overflowX: 'auto',
});

const BikeImage = styled('img')({
  width: '50vw',
  height: 'auto',
  position: 'absolute',
  top: '40vh',
  left: '0vw',
  // zIndex: 2,
});

const EachContent = styled(Box)({
  // position: 'absolute',
  height: '80vh',
  width: '50vw',
  marginTop: '5vh',
  // left: '45vw',
  flexDirection: 'column',
  // justifyContent: 'center',
  //下の記述は、コンテンツの間に余白を追加するためのもの
  zIndex: 2,
  '& > *': {
    marginBottom: '1rem',
  },
  backgroundColor: 'rgba(50, 14, 0, 0.5)',
  borderRadius: '0.8rem',
  boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
});


const Lines = styled('div')({
  padding: '1rem',
  color: 'rgba(0, 0, 0, 0.35)',
  textShadow: '0.15rem 0.1rem 0.0rem #fecfaf, 0 0 black',
  fontSize: '2rem',
  fontWeight: 'bold',
  
});

const App = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollRef.current) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Prevent default scroll behavior on the document
    document.body.style.overflow = 'hidden';

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('wheel', handleWheel);
      }
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* <div style={{fontSize:'10vw'}}>あ</div> */}
      <CssBaseline />
      <GradientBackground />
      <HorizontalScroll ref={scrollRef}>
        <BikeSection>
          <BikeImage src={bikeImage} alt="自転車" />
        </BikeSection>
        <ContentSection>
          <EachContent>
            <Lines>
            <Typography variant="h2" style={{ marginBottom: '2rem',fontSize:'5cqw'}}>ポートフォリオ</Typography>
            <Typography variant="h4" style={{ marginBottom: '1.5rem' }}>目次</Typography>
            <Typography variant="h5">About me</Typography>
            <Typography variant="h5">Works</Typography>
            <Typography variant="h5">My Skill set</Typography>
            <Typography variant="h5">Profile</Typography>
            </Lines>
          </EachContent>


        <EachContent>
          <Lines>
          <Typography variant="h2">About me</Typography>
          <Typography variant="body1">
            野口祥生です。大阪大学大学院 情報科学研究科の修士1年生です。<br/>
            専攻は情報科学、特にHPCとAIです。<br/><br/>
            父親にExcelベースのカードゲームを作ってもらった経験からプログラミングに興味を持ち、ポケモンの乱数調整を通してゲームやシステムそのものの仕組みに興味を持つようになりました。<br/>
            今はクラウドコンピューティング技術に魅了され、手元に高性能な計算資源を持たない人も最新技術を享受できる社会の実現を夢見ています。<br/>

          </Typography>
          </Lines>
        </EachContent>

        <EachContent>
          <Lines>
          <Typography variant="h2">Works</Typography>
          <Typography variant="body1">
            過去の制作物を紹介します。

            <Cards/>

          </Typography>
          </Lines>
        </EachContent>

        <EachContent>
          <Lines>
          <Typography variant="h2">My Skill set</Typography>
          <Typography variant="body1">
            作成中
          </Typography>
          </Lines>
        </EachContent>

        <EachContent>
          <Lines>
          <Typography variant="h2">Profile</Typography>
          <Typography variant="body1">
            作成中
          </Typography>
          </Lines>

        </EachContent>
        </ContentSection>
        {/* 追加のセクションをここに配置できます */}
      </HorizontalScroll>
    </ThemeProvider>
  );
};

export default App;
import React, { useState, useEffect, useRef } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Box, 
  LinearProgress,
  TextField,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


import foxImage from '../img/fox.png'; // srcディレクトリ内の画像をインポート

// Styled components
const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // height: '100vh',  // ビューポートの高さいっぱいに
});
const HeroSection = styled('section')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#0f0f0f',
}));

const WaterEffect = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(0deg, rgba(0, 119, 182, 0.8) 0%, rgba(0, 119, 182, 0.3) 50%, rgba(173, 216, 230, 0.2) 100%)',
  opacity: 1,
});

const PoolTiles = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
});

const PoolEdge = styled('div')({
  position: 'absolute',
  left: 0,
  width: '100%',
  height: '20px',
  background: 'repeating-linear-gradient(90deg, #ffffff, #ffffff 40px, #2c3e50 40px, #2c3e50 80px)',
});

const Bear = styled('div')({
  position: 'relative',
  width: 200,
  height: 180,
  backgroundColor: 'white',
  borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: '50%',
    top: -20,
  },
  '&::before': { left: 10 },
  '&::after': { right: 10 },
});

const Eye = styled('div')({
  position: 'absolute',
  width: 40,
  height: 40,
  backgroundColor: 'white',
  borderRadius: '50%',
  top: 50,
  overflow: 'visible',
  border: '2px solid #fcf8f8',
});

const Pupil = styled('div')({
  position: 'absolute',
  width: 10,
  height: 10,
  backgroundColor: 'black',
  borderRadius: '50%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
const GalleryContainer = styled('div')({
  columnCount: 3,
  columnGap: '16px',
  padding: '16px',
  '@media (max-width: 800px)': {
    columnCount: 2,
  },
  '@media (max-width: 500px)': {
    columnCount: 1,
  },
});

const ImageWrapper = styled('div')({
  breakInside: 'avoid',
  marginBottom: '16px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const Image = styled('img')({
  width: '100%',
  display: 'block',
});

const ProjectOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  color: 'white',
  textAlign: 'center',
  padding: '20px',
  '&:hover': {
    opacity: 1,
  },
});

const ProjectInfo = styled(Box)({
  padding: '16px',
});
const AnimatedImageWrapper = motion(ImageWrapper);

const MasonryGallery = ({ hobbies }) => {
  return (
    <GalleryContainer>
      {hobbies.map((hobby, index) => (
        <HobbyCard key={index} hobby={hobby} index={index} />
      ))}
    </GalleryContainer>
  );
};


const HobbyImage = styled('img')({
  width: '60%',
  height: 'auto',
  marginBottom: '20px',
});

const HobbiesContainer = styled('div')({
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
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

// Main component
const Portfolio = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeSection, setActiveSection] = useState('hero');
  const bearRef = useRef(null);
  const hobbiesRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false);
  const [isHorizontalScrollComplete, setIsHorizontalScrollComplete] = useState(false);


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bearRef.current) {
        const eyes = bearRef.current.querySelectorAll('.eye');
        eyes.forEach(eye => {
          const rect = eye.getBoundingClientRect();
          const eyeCenterX = rect.left + rect.width / 3;
          const eyeCenterY = rect.top + rect.height / 3;
          
          const angleRad = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
          
          const pupil = eye.querySelector('.pupil');
          if (pupil) {
            const maxDistance = (rect.width - pupil.offsetWidth) / 6;
            
            const distanceX = Math.cos(angleRad) * maxDistance;
            const distanceY = Math.sin(angleRad) * maxDistance;
            
            pupil.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
          }
        });
      }
    };


    window.addEventListener('mousemove', handleMouseMove);
    return (
      
    ) => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
    useEffect(() => {
      const handleScroll = (e) => {
        const hobbiesElement = hobbiesRef.current;
        if (!hobbiesElement) return;

        const rect = hobbiesElement.getBoundingClientRect();
        const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

        if (isInView && !isHorizontalScrollComplete) {
          e.preventDefault();
          setIsHorizontalScrolling(true);
          setScrollPosition(prev => {
            const newPosition = prev + e.deltaY;
            const maxScroll = hobbiesElement.scrollWidth - hobbiesElement.clientWidth;
            console.log('Scroll Position:', newPosition, 'Max Scroll:', maxScroll); // デバッグ用
            if (newPosition >= maxScroll) {
              setIsHorizontalScrollComplete(true);
              setIsHorizontalScrolling(false);
            }
            return Math.max(0, Math.min(newPosition, maxScroll));
          });
        } else if (isHorizontalScrollComplete) {
          setIsHorizontalScrolling(false);
        }
      };

      window.addEventListener('wheel', handleScroll, { passive: false });
      return () => window.removeEventListener('wheel', handleScroll);
    }, [isHorizontalScrollComplete]);

  const Me = () => {
    return (
      <Grid container spacing={4} alignItems="center" direction='row'>
        <Grid item md={3} xs={4} >
          <img 
            src={foxImage}
            alt="My-icon" 
            style={{ width: '100%', borderRadius: '50%' }} 
          />
        </Grid>
        <Grid item md={13} style={{ flex: 1}}>
          <Typography>
            Web開発と機械学習の分野で5年以上の経験を持つエンジニアです。
            最新の技術トレンドに常に注目し、効率的で革新的なソリューションの開発に情熱を注いでいます。
            趣味の経験を活かし、ユーザー体験を重視した直感的なインターフェースの設計を得意としています。(サンプル)
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const HobbyGallery = ({ images }) => {
    return (
    <Box sx={{ flexGrow: 1, bgcolor:'#dfdfdf' }}>
      <Box my={4}>
        <Typography variant="h4" gutterBottom align="center">
          Hobbies
        </Typography>
        <MasonryGallery hobbies={hobbiesData} />
      </Box>

      {/* ... (他のセクションはそのまま) */}
    </Box>
    );
  };

  const skillsData = [
    { name: 'Web Development', level: 90 },
    { name: 'Machine Learning', level: 85 },
    { name: 'React', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'Data Analysis', level: 80 },
    { name: 'UI/UX Design', level: 75 },
  ];

  const projectsData = [
    { name: 'Project 1', description: 'A cool web app', image:foxImage },
    { name: 'Project 2', description: 'ML-powered tool', image:foxImage },
    { name: 'Project 3', description: 'Responsive website', image: foxImage },
  ];

  const hobbiesData = [
    { name: 'Cycling', description: 'Exploring nature on two wheels', image: foxImage },
    { name: 'Photography', description: 'Capturing moments in time', image: foxImage },
    { name: 'Gaming', description: 'Immersing in virtual worlds', image: foxImage },
    { name: 'Swimming', description: 'Staying fit in the water', image: foxImage },
    { name: 'Cooking', description: 'Experimenting with flavors', image: foxImage },
    { name: 'Traveling', description: 'Discovering new cultures', image: foxImage },
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor:'#dfdfdf' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            野口祥生のポートフォリオ
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This empty Toolbar is for spacing */}

      <HeroSection>
        <WaterEffect />
        <PoolTiles />
        <PoolEdge style={{ top: 0 }} />
        <PoolEdge style={{ bottom: 0 }} />
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', color: 'common.white', zIndex: 10, position: 'relative' }}>
            <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
              大阪大学 大学院
              情報科学研究科
              マルチメディア工学専攻
            </Typography>
            <Typography variant={isMobile ? 'h3' : 'h2'} gutterBottom>
              野口祥生
            </Typography>
            <Typography variant={isMobile ? 'body1' : 'h6'} paragraph>
              ポートフォリオページ
            </Typography>
            <Button variant="contained" color="primary" size="large">
              作品を見る
            </Button>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" gutterBottom align="center">
            About Me
          </Typography>
          <Grid container spacing={1} alignItems="center">
              <Me />
          </Grid>
        </Box>

        <Box my={4}>
          <Typography variant="h4" gutterBottom align="center">
            Skills
          </Typography>

          <Grid container spacing={2}>
            {skillsData.map((skill) => (
              <Grid item xs={12} sm={6} md={4} key={skill.name}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div" mb={2}>
                      {skill.name}
                    </Typography>
                    <LinearProgress variant="determinate" value={skill.level} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box my={4}>
          <Typography variant="h4" gutterBottom align="center">
            Projects
          </Typography>
          <Grid container spacing={2}>
            {projectsData.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.name}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={project.image}
                    alt={project.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>


        <HobbiesContainer ref={hobbiesRef}>
        <Typography variant="h4" gutterBottom align="center">
          趣味
        </Typography>
        <HobbiesTrack scrollPosition={scrollPosition}>
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
      

        

        <Box my={4}>
          <Typography variant="h4" gutterBottom align="center">
            Contact Me
          </Typography>
          <CenteredBox>
            <Bear ref={bearRef}>
              <Eye className="eye" style={{ left: 60 }}><Pupil className="pupil" /></Eye>
              <Eye className="eye" style={{ right: 60 }}><Pupil className="pupil" /></Eye>
            </Bear>
          </CenteredBox>
          <Box component="form" noValidate autoComplete="off">
            <TextField fullWidth margin="normal" label="Name" variant="outlined" />
            <TextField fullWidth margin="normal" label="Email" variant="outlined" />
            <TextField fullWidth margin="normal" label="Message" variant="outlined" multiline rows={4} />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Send Message
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Portfolio;
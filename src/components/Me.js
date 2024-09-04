import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  Camera, 
  bike, 
  Gamepad, 
  waves, 
  Code, 
  gamepad, 
  Fish,
  Triangle
} from 'lucide-react';


const Me = () => {

  const bearRef = useRef(null);

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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  const [activeSection, setActiveSection] = useState('hero');
  const controls = useAnimation();

  const [flagCount, setFlagCount] = useState(10);

  useEffect(() => {
    const calculateFlagCount = () => {
      const screenWidth = window.innerWidth;
      const flagWidth = 40; // Adjust this value based on your flag size
      const newFlagCount = Math.ceil(screenWidth / flagWidth);
      setFlagCount(newFlagCount);
    };

    calculateFlagCount();
    window.addEventListener('resize', calculateFlagCount);


    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      const sections = ['hero', 'about', 'skills', 'projects', 'hobbies', 'contact'];
      
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top < windowHeight / 2 && bottom > windowHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const flagColors = ['#002bff', '#ffff00'];

  const skillsData = [
    { name: 'Web Development', icon: <Code />, level: 90 },
    { name: 'Machine Learning', icon: <Code />, level: 85 },
    { name: 'React', icon: <Code />, level: 95 },
    { name: 'Python', icon: <Code />, level: 90 },
    { name: 'Data Analysis', icon: <Code />, level: 80 },
    { name: 'UI/UX Design', icon: <Gamepad />, level: 75 },
  ];

  const projectsData = [
    { name: 'Project 1', description: 'A cool web app', image: '/project1.jpg' },
    { name: 'Project 2', description: 'ML-powered tool', image: '/project2.jpg' },
    { name: 'Project 3', description: 'Responsive website', image: '/project3.jpg' },
  ];

  const hobbiesData = [
    { name: 'Cycling', icon: <bike /> },
    { name: 'Photography', icon: <Camera /> },
    { name: 'Gaming', icon: <gamepad /> },
    { name: 'Swimming', icon: <waves /> },
    { name: 'Web Development', icon: <Code /> },
    { name: 'Granblue Fantasy', icon: <Gamepad /> },
  ];

  return (
    <div className="portfolio">
      {/* <nav className="main-nav">
        <ul className="nav-list">
          {['Home', 'About', 'Skills', 'Projects', 'Hobbies', 'Contact'].map((item) => (
            <li key={item} className={`nav-item ${activeSection === item.toLowerCase() ? 'active' : ''}`}>
              <a href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            </li>
          ))}
        </ul>
      </nav> */}

      <section id="hero" className="hero-section">
        <div className="hero-background">
          <div className="water-effect"></div>
          <div className="pool-tiles"></div>
          <div className="pool-edge-top"></div>
          <div className="pool-edge-bottom"></div>
          <div className="swimming-flags">
            {[...Array(flagCount)].map((_, index) => (
              <Triangle
                key={index}
                color={flagColors[index % flagColors.length]}
                fill={flagColors[index % flagColors.length]}
                size={40}
                className="flag-triangle"
              />
            ))}
          </div>
          <svg className="water-ripple" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="ripple">
                <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="5" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="B" />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#ripple)" />
          </svg>
        </div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            大阪大学 大学院
            情報科学研究科
            マルチメディア工学専攻
          </h1>
          <h2 className="hero-subtitle">野口祥生</h2>

          <p className="hero-description">ポートフォリオページ</p>
          <motion.a
            href="#projects"
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            作品を見る
          </motion.a>
        </motion.div>
        <div className="float-ring"></div>
        <div className="fish-icon"><Fish /></div>
        <div className="fish-icon"><Fish /></div>
        <div className="fish-icon"><Fish /></div>
      </section>

      <motion.section
        id="about"
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <img src="/profile-photo.jpg" alt="野口祥生" className="profile-photo" />
          <p className="about-description">
            Web開発と機械学習の分野で5年以上の経験を持つエンジニアです。
            最新の技術トレンドに常に注目し、効率的で革新的なソリューションの開発に情熱を注いでいます。
            趣味の経験を活かし、ユーザー体験を重視した直感的なインターフェースの設計を得意としています。
          </p>
        </div>
      </motion.section>

      <motion.section
        id="skills"
        className="skills-section"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        <div className="bear" ref={bearRef}>
          <div className="eye left"><div className="pupil"></div></div>
          <div className="eye right"><div className="pupil"></div></div>
          <div className="nose"></div>
          <div className="device"></div>
          <div className="arm"></div>
        </div>
        
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-item"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {skill.icon}
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-bar">
                <div className="skill-level" style={{ width: `${skill.level}%` }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        <h2>Projects</h2>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={project.image} alt={project.name} />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="hobbies"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        <h2>Hobbies</h2>
        <div className="hobbies-container">
          {hobbiesData.map((hobby, index) => (
            <motion.div
              key={hobby.name}
              className="hobby-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {hobby.icon}
              <span>{hobby.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        <h2>Contact Me</h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </motion.section>
    </div>
  );
};

export default Me;
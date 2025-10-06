import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'
import './App.css'


// Component Loading Screen
function LoadingScreen({ onComplete }) {
  const [currentText, setCurrentText] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showMoon, setShowMoon] = useState(false)
  
  const loadingTexts = [
    "🌕",
    "chúc bé",
    "tết",
    "trung thu",
    "vui vẻ",
    "🌕"
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText(prev => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          setShowConfetti(true)
          setShowMoon(true)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => {
              onComplete()
            }, 1500)
          }, 3000)
          return prev
        }
      })
    }, 600)
    
    return () => clearInterval(timer)
  }, [loadingTexts.length, onComplete])
  
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Animated background */}
      <div className="loading-background">
        <motion.div
          className="loading-gradient"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 165, 0, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Floating moon */}
      <AnimatePresence>
        {showMoon && (
          <motion.div
            className="loading-moon"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 2, 
              ease: "easeOut",
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            🌕
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background particles */}
      <div className="loading-particles">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="loading-particle"
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              y: [null, -150],
              rotate: [0, 360],
              x: [null, Math.random() * 100 - 50]
            }}
            transition={{
              duration: 4,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            {['⭐', '🌟', '✨', '💫', '🌙'][i % 5]}
          </motion.div>
        ))}
      </div>
      
      {/* Main text animation */}
      <div className="loading-text-container">
        {loadingTexts.map((text, index) => (
          <motion.div
            key={index}
            className="loading-text"
            initial={{ 
              opacity: 0, 
              scale: 0, 
              y: 150,
              rotate: -360,
              filter: "blur(10px)"
            }}
            animate={index <= currentText ? { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotate: 0,
              filter: "blur(0px)"
            } : {}}
            transition={{
              duration: 1.2,
              ease: "backOut",
              delay: index * 0.15
            }}
            style={{
              fontSize: text.includes('🌕') || text.includes('🎉') ? '5rem' : '3.5rem',
              color: text.includes('🌕') ? '#FFD700' : 
                     text.includes('🎉') ? '#FF6B6B' : '#FFA500',
              textShadow: text.includes('🌕') ? 
                '0 0 30px #FFD700, 0 0 60px #FFA500' :
                text.includes('🎉') ?
                '0 0 30px #FF6B6B, 0 0 60px #FF69B4' :
                '0 0 20px #FFA500, 0 0 40px #FFD700'
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>
      
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={400}
            colors={['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#9B59B6', '#FF69B4', '#FF1493']}
            gravity={0.3}
            initialVelocityY={20}
            initialVelocityX={10}
          />
        )}
      </AnimatePresence>
      
      {/* Loading progress */}
      <motion.div
        className="loading-progress"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      
      {/* Progress percentage */}
      <motion.div
        className="loading-percentage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          animate={{ 
            textShadow: [
              "0 0 10px #FFD700",
              "0 0 20px #FFA500",
              "0 0 10px #FFD700"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Math.round((currentText / loadingTexts.length) * 100)}%
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

// Component đèn lồng bay lơ lửng
function FloatingLantern({ delay = 0, duration = 3, x = 0, y = 0 }) {
  return (
    <motion.div
      className="lantern"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: [0, 1, 0.9, 1],
        scale: [0, 1, 1.15, 1],
        y: [0, -25, -50, -75],
        x: [0, 15, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      whileHover={{ 
        scale: 1.2,
        rotate: 10,
        transition: { duration: 0.3 }
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 2
      }}
    >
      <div className="lantern-body">
        <div className="lantern-light"></div>
        <div className="lantern-glow"></div>
      </div>
    </motion.div>
  )
}

// Component bánh trung thu với variations
function MoonCake({ delay = 0, size = 'normal', position = 'center', flavor = 'traditional' }) {
  const [isTouched, setIsTouched] = useState(false)
  
  const sizeVariations = {
    small: { width: 50, height: 60, fontSize: '0.4rem' },
    normal: { width: 70, height: 70, fontSize: '0.6rem' },
    large: { width: 90, height: 90, fontSize: '0.8rem' }
  }
  
  const flavorColors = {
    traditional: { top: '#8B4513', body: '#D2691E', pattern: '#FFD700' },
    lotus: { top: '#CD853F', body: '#DEB887', pattern: '#FFA500' },
    redBean: { top: '#A0522D', body: '#D2691E', pattern: '#FF6B6B' }
  }
  
  const currentSize = sizeVariations[size]
  const currentFlavor = flavorColors[flavor]
  
  return (
    <motion.div
      className="moon-cake"
      initial={{ opacity: 0, rotate: -180, scale: 0 }}
      animate={{ 
        opacity: 1,
        rotate: 0,
        scale: [1, 1.05 + (size === 'large' ? 0.1 : 0), 1]
      }}
      transition={{
        duration: 2.5 + (size === 'small' ? 0.5 : 0),
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      whileHover={{ 
        scale: 1.2 + (size === 'large' ? 0.1 : 0),
        rotate: 15 + (size === 'small' ? -5 : 0),
        transition: { duration: 0.4 }
      }}
      whileTap={{ 
        scale: 0.85,
        rotate: -8,
        transition: { duration: 0.15 }
      }}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setIsTouched(false)}
      style={{
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        width: currentSize.width,
        height: currentSize.height,
        transform: position === 'left' ? 'translateX(-20px)' : 
                   position === 'right' ? 'translateX(20px)' : 'translateX(0)'
      }}
    >
      <div 
        className="cake-top"
        style={{ 
          background: `linear-gradient(45deg, ${currentFlavor.top}, ${currentFlavor.body})`,
          fontSize: currentSize.fontSize
        }}
      ></div>
      <div 
        className="cake-body"
        style={{ 
          background: `linear-gradient(45deg, ${currentFlavor.body}, ${currentFlavor.top})`
        }}
      ></div>
      <div 
        className={`cake-pattern ${isTouched ? 'touched' : ''}`}
        style={{
          background: `radial-gradient(circle, ${currentFlavor.pattern} 0%, transparent 70%)`
        }}
      ></div>
      <div className="cake-shine"></div>
      
      {/* Flavor indicator */}
      <div className="cake-flavor-indicator">
        {flavor === 'lotus' && '🌸'}
        {flavor === 'redBean' && '❤️'}
        {flavor === 'traditional' && '🥮'}
      </div>
    </motion.div>
  )
}

// Component sao lấp lánh
function TwinklingStar({ delay = 0, size = 'small', x = 0, y = 0 }) {
  return (
    <motion.div
      className={`star ${size}`}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: [0, 1, 0.3, 1],
        scale: [0, 1, 0.6, 1],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 2.5,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ 
        scale: 1.3,
        rotate: 180,
        transition: { duration: 0.3 }
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 1
      }}
    >
      ⭐
    </motion.div>
  )
}

// Component mặt trăng
function Moon() {
  return (
    <motion.div
      className="moon"
      initial={{ opacity: 0, scale: 0, rotate: -90 }}
      animate={{ 
        opacity: 1,
        scale: 1,
        rotate: [0, 8, -8, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ 
        scale: 1.1,
        rotate: 15,
        transition: { duration: 0.4 }
      }}
    >
      <div className="moon-surface">
        <div className="moon-crater"></div>
        <div className="moon-crater small"></div>
        <div className="moon-crater tiny"></div>
        <div className="moon-glow"></div>
      </div>
    </motion.div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPoem, setShowPoem] = useState(false)
  const [particlesInit, setParticlesInit] = useState(null)


  useEffect(() => {
    const initParticles = async () => {
      await loadSlim(setParticlesInit)
    }
    initParticles()
  }, [])

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
        setShowPoem(true) // Hiển thị câu thơ sau khi pháo hoa kết thúc
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  const particlesLoaded = (container) => {
    console.log(container)
  }

  // Detect mobile device for performance optimization
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: isMobile ? 60 : 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: !isMobile,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: isMobile ? 3 : 6,
        },
        repulse: {
          distance: isMobile ? 120 : 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#FFD700", "#FFA500", "#FF6B6B", "#4ECDC4", "#9B59B6", "#FF69B4"],
      },
      links: {
        color: "#FFD700",
        distance: isMobile ? 120 : 180,
        enable: true,
        opacity: 0.4,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.1,
        },
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: isMobile ? 1.5 : 2.5,
        straight: false,
        trail: {
          enable: true,
          length: 3,
          fill: {
            color: "#FFD700",
          },
        },
      },
      number: {
        density: {
          enable: true,
          area: isMobile ? 1000 : 800,
        },
        value: isMobile ? 50 : 100,
      },
      opacity: {
        value: 0.6,
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      shape: {
        type: ["circle", "triangle"],
      },
      size: {
        value: { min: 1, max: isMobile ? 4 : 6 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    detectRetina: true,
  }

  return (
    <div className="app-container">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            className="mid-autumn-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Particles Background */}
            {particlesInit && (
              <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particlesOptions}
              />
            )}

            {/* Confetti */}
            <AnimatePresence>
              {showConfetti && (
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  recycle={false}
                  numberOfPieces={200}
                  colors={['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#9B59B6']}
                />
              )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.div
              className="main-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Header */}
              <motion.div
                className="header"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className="title">
                  <motion.span
                    animate={{ 
                      textShadow: [
                        "0 0 20px #FFD700",
                        "0 0 30px #FFA500", 
                        "0 0 20px #FFD700"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌕 Tết Trung Thu của bé Trâm nè 🌕
                  </motion.span>
                </h1>
                <motion.p
                  className="subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  Đêm trăng rằm tháng tám - Bao lời chúc bé nhỏ
                </motion.p>
              </motion.div>

              {/* Moon */}
              <Moon />

              {/* Floating Lanterns */}
              <FloatingLantern delay={0} duration={4} x={10} y={20} />
              <FloatingLantern delay={1} duration={3.5} x={80} y={15} />
              <FloatingLantern delay={2} duration={4.5} x={20} y={60} />
              <FloatingLantern delay={1.5} duration={3} x={70} y={70} />

              {/* Twinkling Stars */}
              <TwinklingStar delay={0} size="large" x={15} y={10} />
              <TwinklingStar delay={0.5} size="medium" x={85} y={25} />
              <TwinklingStar delay={1} size="small" x={25} y={35} />
              <TwinklingStar delay={1.5} size="medium" x={75} y={45} />
              <TwinklingStar delay={2} size="small" x={5} y={55} />
              <TwinklingStar delay={2.5} size="large" x={90} y={65} />

              {/* Moon Cakes */}
              <div className="moon-cakes-container">
                <MoonCake delay={0} size="small" position="left" flavor="lotus" />
                <MoonCake delay={3} size="large" position="center" flavor="traditional" />
                <MoonCake delay={1.5} size="normal" position="right" flavor="redBean" />
              </div>

              {/* Interactive Button */}
              <motion.button
                className="celebration-btn"
                onClick={() => {
                  setShowConfetti(true)
                  setShowPoem(false) // Reset câu thơ khi bấm lại
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3 }}
              >
                ❤️ Bấm vào anh điii ❤️
              </motion.button>

              {/* Traditional Poem */}
              <AnimatePresence>
                {showPoem && (
                  <motion.div
                    className="poem"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      "Trăng rằm lấp lánh đầu hiên"
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      "Thay anh nhắn nhủ đôi lời đến em"
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      "Anh chúc em mãi vui tươi"
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      "Ngủ ngon, mộng đẹp, nụ cười trên môi"
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      "Mai sau hết những tháng ngày"
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      "Trăng này ta ngắm — kề vai… cùng nhìn. 💖"
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
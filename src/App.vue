<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import DoctorCard from './components/DoctorCard.vue'
import StatsSection from './components/StatsSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import AppointmentForm from './components/AppointmentForm.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import FaqSection from './components/FaqSection.vue'
import ContactLinks from './components/ContactLinks.vue'
import FooterMap from './components/FooterMap.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const scrollToAppointment = () => {
  const element = document.querySelector('.appointment-form')
  element?.scrollIntoView({ behavior: 'smooth' })
}

const showHeader = ref(true)
const heroParallax = ref(0)
const typedText = ref('')
const showCursor = ref(true)
let lastScrollY = 0

const fullText = ref('')
let typingTimer = null
let cursorTimer = null

const startTyping = () => {
  // Очистка предыдущих таймеров и состояния
  if (typingTimer) clearInterval(typingTimer)
  if (cursorTimer) clearInterval(cursorTimer)
  typedText.value = ''
  showCursor.value = true

  // Берем актуальный локализованный текст
  fullText.value = t('hero.title')

  let charIndex = 0
  typingTimer = setInterval(() => {
    if (charIndex < fullText.value.length) {
      typedText.value = fullText.value.substring(0, charIndex + 1)
      charIndex++
    } else {
      clearInterval(typingTimer)
      setTimeout(() => (showCursor.value = false), 300)
    }
  }, 100)

  // Моргание курсора
  cursorTimer = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
}

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY <= 100) {
    showHeader.value = true
  } else if (currentScrollY < lastScrollY) {
    showHeader.value = currentScrollY < 150
  } else if (currentScrollY > lastScrollY) {
    showHeader.value = false
  }

  heroParallax.value = currentScrollY * 0.5
  lastScrollY = currentScrollY
}

onMounted(() => {
  startTyping()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (typingTimer) clearInterval(typingTimer)
  if (cursorTimer) clearInterval(cursorTimer)
  window.removeEventListener('scroll', handleScroll)
})

// Перезапускаем анимацию набора при смене языка и сохраняем выбор
watch(locale, (newLocale) => {
  try { localStorage.setItem('locale', newLocale) } catch (e) {}
  try { document.documentElement.setAttribute('lang', newLocale) } catch (e) {}
  startTyping()
})
</script>

<template>
  <div class="app">
    <section class="hero-section" aria-label="Главная секция">
  <div class="hero-background" :style="{ transform: `translate3d(0, ${heroParallax}px, 0)` }" aria-hidden="true"></div>
      <div class="stars"></div>
      <div class="container">
        <header class="header" :class="{ 'header-hidden': !showHeader }">
          <div class="logo">
            <span class="logo-icon" aria-hidden="true">🦷</span>
            <span class="logo-text">{{ $t('footer.title') }}</span>
          </div>
          <div class="lang-switcher">
            <button :class="{ active: locale === 'ru' }" @click="locale = 'ru'" aria-label="Русский">RU</button>
            <button :class="{ active: locale === 'en' }" @click="locale = 'en'" aria-label="English">EN</button>
          </div>
        </header>
        
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="typed-text">{{ typedText }}</span>
            <span class="typing-cursor" :class="{ 'hidden': !showCursor }">|</span>
          </h1>
          <p class="hero-subtitle">{{ $t('hero.subtitle') }}</p>
          <button 
            @click="scrollToAppointment" 
            class="cta-button"
            aria-label="Перейти к форме записи на консультацию"
          >
            {{ $t('hero.cta') }}
          </button>
        </div>
      </div>
    </section>

    <main class="container main-content">
      <DoctorCard />
      <StatsSection />
      <FeaturesSection />
      <ServicesSection />
      <AppointmentForm />
      <ReviewsSection />
      <FaqSection />
      <ContactLinks />
    </main>

    <FooterMap />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--background);
}

.hero-section {
  position: relative;
  padding: 0;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a202c 0%, #2c5282 50%, #2d3748 100%);
  z-index: 0;
  will-change: transform;
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(99, 179, 237, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(49, 130, 206, 0.1) 0%, transparent 50%);
  animation: pulseGlow 8s ease-in-out infinite;
  will-change: opacity;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1px 1px at 15% 25%, white, transparent),
    radial-gradient(1px 1px at 55% 65%, white, transparent),
    radial-gradient(2px 2px at 75% 15%, white, transparent),
    radial-gradient(1px 1px at 85% 55%, white, transparent),
    radial-gradient(1px 1px at 30% 75%, white, transparent),
    radial-gradient(1px 1px at 90% 30%, white, transparent);
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: twinkle 4s ease-in-out infinite, moveStars 20s linear infinite;
  opacity: 0.5;
  will-change: opacity, transform;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes moveStars {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-200px, -200px, 0); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.header {
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.header > * {
  pointer-events: auto;
}

.lang-switcher {
  position: static;
  top: auto;
  right: auto;
  display: flex;
  gap: 0.5rem;
  padding: 1.5rem;
}

.lang-switcher button {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  padding: 0.5rem 0.9rem;
  font-size: 0.75rem;
  letter-spacing: 1px;
  font-weight: 600;
  border-radius: 8px;
  backdrop-filter: blur(6px);
  transition: var(--transition-base);
  cursor: pointer;
}

.lang-switcher button:hover {
  background: rgba(255,255,255,0.3);
}

.lang-switcher button.active {
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  box-shadow: 0 4px 12px rgba(44,82,130,0.4);
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  padding: 1.5rem;
}

.logo-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  line-height: 1.3;
  opacity: 0.95;
}

.hero-content {
  text-align: center;
  padding: 8rem 0 4rem;
  color: white;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
  letter-spacing: -0.5px;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
  will-change: transform, opacity;
  display: inline-block;
}

.typed-text {
  display: inline;
  color: white;
}

.typing-cursor {
  display: inline-block;
  font-weight: 400;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  color: white;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.typing-cursor.hidden {
  opacity: 0;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 1;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  font-weight: 400;
  animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) both 0.2s;
  will-change: transform, opacity;
  color: white;
}

.cta-button {
  background: white;
  color: var(--primary-blue);
  border: none;
  padding: 1.5rem 3.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 0 0 0 rgba(255, 255, 255, 0.5);
  animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) both 0.4s;
  position: relative;
  overflow: hidden;
  will-change: transform;
  z-index: 1;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(49, 130, 206, 0.2) 0%, rgba(99, 179, 237, 0.2) 100%);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease-out, height 0.6s ease-out;
  z-index: -1;
}

.cta-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: -1;
}

.cta-button:hover::before {
  width: 500px;
  height: 500px;
}

.cta-button:active::after {
  transform: translate(-50%, -50%) scale(2);
  opacity: 1;
  transition: 0s;
}

.cta-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 0 8px rgba(255, 255, 255, 0.1),
    0 0 30px rgba(99, 179, 237, 0.5);
}

.cta-button:active {
  transform: translateY(-2px) scale(1.02);
}

.main-content {
  padding: 4rem 0 4rem;
  position: relative;
}

.main-content > * + * {
  margin-top: 2rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
  }

  .hero-content {
    padding: 10rem 0 4rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .cta-button {
    padding: 1.25rem 2.5rem;
    font-size: 1.1rem;
  }

  .container {
    padding: 0 1rem;
  }

  .header {
    padding: 0;
  }
  
  .logo {
    padding: 1rem;
    gap: 0.75rem;
  }

  .logo-icon {
    font-size: 2rem;
  }
  
  .logo-text {
    font-size: 0.95rem;
    max-width: 160px;
    line-height: 1.2;
  }

  .lang-switcher {
    padding: 1rem;
    gap: 0.4rem;
  }

  .lang-switcher button {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
  }

  .main-content {
    padding: 2rem 0 2rem;
  }
}
</style>

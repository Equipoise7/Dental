import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { i18n } from './i18n/index.js'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

const app = createApp(App)
app.use(i18n)

// Прелоадер с минимальной задержкой
const hidePreloader = () => {
	const preloader = document.getElementById('preloader')
	const body = document.body
	const html = document.documentElement
	
	if (preloader) {
		preloader.classList.add('fade-out')
		body.classList.remove('preloader-active')
		body.style.overflow = ''
		body.style.position = ''
		body.style.width = ''
		html.style.overflow = ''
		
		setTimeout(() => {
			preloader.remove()
		}, 500)
	}
}

// Монтируем приложение и показываем через минимальную задержку
app.mount('#app')

// Показываем контент после загрузки или через 1 секунду минимум
const minDisplayTime = 1000
const startTime = performance.now()

if (document.readyState === 'complete') {
	const elapsed = performance.now() - startTime
	setTimeout(hidePreloader, Math.max(0, minDisplayTime - elapsed))
} else {
	window.addEventListener('load', () => {
		const elapsed = performance.now() - startTime
		setTimeout(hidePreloader, Math.max(0, minDisplayTime - elapsed))
	})
}

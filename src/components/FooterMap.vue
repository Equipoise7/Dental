<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const mapLoaded = ref(false)
const mapError = ref(false)
const YANDEX_MAP_API_KEY = import.meta.env.VITE_YANDEX_MAPS_API_KEY || '' // API-ключ Яндекс.Карт (опционально)
// Координаты: Кырджалийская улица, 10к2, Владикавказ
const CLINIC_COORDINATES = [43.022369, 44.650600] // [широта, долгота] для Яндекс.Карт

let mapInstance = null

const loadYandexMapsScript = () => {
	return new Promise((resolve, reject) => {
		if (window.ymaps) {
			resolve()
			return
		}

		const script = document.createElement('script')
		// Загружаем без API-ключа для разработки (допустимо для небольших проектов)
		const apiUrl = (YANDEX_MAP_API_KEY && YANDEX_MAP_API_KEY.trim())
			? `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAP_API_KEY}&lang=ru_RU`
			: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
    
		script.src = apiUrl
		script.async = true
		script.defer = true
		script.onload = () => resolve()
		script.onerror = () => reject(new Error('Ошибка загрузки Яндекс.Карт'))
    
		document.head.appendChild(script)
	})
}

const initMap = async () => {
	try {
		await loadYandexMapsScript()
    
		window.ymaps.ready(() => {
			try {
				mapInstance = new window.ymaps.Map('yandex-map', {
					center: CLINIC_COORDINATES,
					zoom: 15,
					controls: ['zoomControl', 'fullscreenControl']
				})

			const placemark = new window.ymaps.Placemark(
				CLINIC_COORDINATES,
				{
					balloonContent: '<strong>Стоматологическая клиника</strong><br>Кырджалийская ул., 10к2<br>Владикавказ',
					hintContent: 'Наша клиника'
				},
				{
					preset: 'islands#blueMedicalIcon',
					iconColor: '#2c5282'
				}
			)

			mapInstance.geoObjects.add(placemark)
				mapLoaded.value = true
			} catch (error) {
				console.error('Ошибка инициализации карты:', error)
				mapError.value = true
			}
		})
	} catch (error) {
		console.error('Ошибка загрузки API Яндекс.Карт:', error)
		mapError.value = true
	}
}

onMounted(() => {
	initMap()
})

onUnmounted(() => {
	if (mapInstance) {
		mapInstance.destroy()
		mapInstance = null
	}
})
</script>

<template>
	<footer class="footer">
		<div class="container">
			<div class="footer-content">
				<!-- Информационный блок -->
				<div class="footer-info">
					<h3 class="footer-title">{{ $t('footer.title') }}</h3>
					<div class="info-block">
						<div class="info-item">
							<span class="info-icon">📍</span>
							<div>
								<strong>{{ $t('footer.addressLabel') }}:</strong>
								<p>{{ $t('contact.addressValue') }}</p>
							</div>
						</div>
						<div class="info-item">
							<span class="info-icon">📞</span>
							<div>
								<strong>{{ $t('footer.phoneLabel') }}:</strong>
								<p>+7 989 744 39 62</p>
							</div>
						</div>
						<div class="info-item">
							<span class="info-icon">🕐</span>
							<div>
								<strong>{{ $t('footer.scheduleLabel') }}:</strong>
								<p>{{ $t('contact.scheduleValue') }}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Блок с картой -->
				<div class="map-block">
					<h4 class="map-title">{{ $t('footer.mapTitle') }}</h4>
						<div id="yandex-map" class="yandex-map" :class="{ 'map-loading': !mapLoaded && !mapError }">
							<div v-if="!mapLoaded && !mapError" class="map-loader">{{ $t('footer.loading') }}</div>
							<div v-if="mapError" class="map-error">{{ $t('footer.error') }}</div>
						</div>
				</div>
			</div>
		</div>
    
		<div class="footer-bottom">
			<div class="container">
				<div class="bottom-content">
					<p>&copy; 2025 {{ $t('footer.copyright') }}</p>
					<div class="footer-links">
						<a href="#privacy">{{ $t('footer.privacyPolicy') }}</a>
						<a href="#terms">{{ $t('footer.terms') }}</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped>
.footer {
	background: linear-gradient(180deg, var(--primary-dark) 0%, #1a1f2e 100%);
	color: white;
	margin-top: 4rem;
	padding: 4rem 2rem 0;
}

.footer-content {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3rem;
	margin-bottom: 3rem;
}

/* Информационный блок */
.footer-info {
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(20px);
	border-radius: 20px;
	padding: 3rem;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
	animation: fadeInUp 0.8s ease-out;
	will-change: transform, opacity;
}

.footer-title {
	font-size: 2rem;
	font-weight: 800;
	margin: 0 0 2rem;
	color: white;
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.info-block {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.info-item {
	display: flex;
	align-items: flex-start;
	gap: 1rem;
}

.info-icon {
	font-size: 1.8rem;
	flex-shrink: 0;
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.info-item strong {
	display: block;
	font-size: 1.05rem;
	margin-bottom: 0.3rem;
	color: rgba(255, 255, 255, 0.95);
}

.info-item p {
	margin: 0;
	font-size: 0.95rem;
	color: rgba(255, 255, 255, 0.85);
	line-height: 1.6;
}

/* Блок с картой */
.map-block {
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(20px);
	border-radius: 20px;
	padding: 2rem;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
	animation: fadeInUp 0.8s ease-out 0.2s backwards;
	will-change: transform, opacity;
}

.map-title {
	font-size: 1.5rem;
	font-weight: 700;
	margin: 0 0 1.5rem;
	color: white;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.yandex-map {
	width: 100%;
	height: 400px;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		position: relative;
		background: rgba(255, 255, 255, 0.05);
	}

	.map-loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.map-loader,
	.map-error {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: rgba(255, 255, 255, 0.8);
		font-size: 1rem;
		text-align: center;
	}

	.map-loader::after {
		content: '';
		display: block;
		width: 30px;
		height: 30px;
		margin: 10px auto 0;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	.map-error {
		color: rgba(255, 100, 100, 0.9);
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
}

/* Нижняя часть футера */
.footer-bottom {
	background: rgba(0, 0, 0, 0.3);
	padding: 2rem;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.bottom-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
}

.bottom-content p {
	margin: 0;
	font-size: 0.95rem;
	opacity: 0.8;
}

.footer-links {
	display: flex;
	gap: 2rem;
}

.footer-links a {
	color: rgba(255, 255, 255, 0.8);
	text-decoration: none;
	font-size: 0.95rem;
	transition: color 0.3s ease;
}

.footer-links a:hover {
	color: white;
	text-decoration: underline;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translate3d(0, 30px, 0);
	}
	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}

@media (max-width: 968px) {
	.footer-content {
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	.footer-info {
		padding: 2rem 1.5rem;
	}

	.footer-title {
		font-size: 1.8rem;
	}

	.yandex-map {
		height: 350px;
	}
}

@media (max-width: 768px) {
	.footer {
		padding: 3rem 1.5rem 0;
	}

	.footer-bottom {
		padding: 2rem 1.5rem;
	}

	.footer-info,
	.map-block {
		padding: 1.5rem;
	}

	.footer-title {
		font-size: 1.5rem;
	}

	.map-title {
		font-size: 1.3rem;
	}

	.info-icon {
		font-size: 1.5rem;
	}

	.yandex-map {
		height: 300px;
	}

	.bottom-content {
		flex-direction: column;
		text-align: center;
	}

	.footer-links {
		flex-direction: column;
		gap: 0.5rem;
	}
}
</style>
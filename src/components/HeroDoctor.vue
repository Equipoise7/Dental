<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ZarinaPhoto from '../images/Zarina.jpg'

const { t, tm } = useI18n()

const doctor = computed(() => ({
	name: t('doctor.name'),
	specialization: t('doctor.specialization'),
	experience: t('doctor.experience'),
	education: t('doctor.education'),
	specialties: tm('doctor.specialties'),
	description: t('doctor.description')
}))

const emit = defineEmits(['scrollToAppointment'])

const scrollToAppointment = () => {
	emit('scrollToAppointment')
}
</script>

<template>
	<section class="hero-doctor">
		<div class="hero-background"></div>
		<div class="hero-container">
			<div class="hero-grid">
				<!-- Левая колонка - информация о враче -->
				<div class="doctor-info-section">
					<div class="doctor-badge">
						<span class="badge-icon">👩‍⚕️</span>
						<span class="badge-text">{{ doctor.specialization }}</span>
					</div>
					
					<h1 class="doctor-name">{{ doctor.name }}</h1>
					<p class="doctor-experience">{{ doctor.experience }}</p>
					
					<div class="hero-message">
						<h2 class="message-title">{{ $t('hero.title') }}</h2>
						<p class="message-text">{{ $t('hero.subtitle') }}</p>
					</div>

					<div class="quick-info">
						<div class="info-item">
							<span class="info-icon">🎓</span>
							<span class="info-text">{{ doctor.education }}</span>
						</div>
						<div class="info-item">
							<span class="info-icon">⭐</span>
							<span class="info-text">{{ doctor.description }}</span>
						</div>
					</div>

					<div class="action-buttons">
						<button @click="scrollToAppointment" class="cta-button primary">
							{{ $t('hero.cta') }}
						</button>
						<a href="#services" class="cta-button secondary">
							{{ $t('services.title') }}
						</a>
					</div>
				</div>

				<!-- Правая колонка - фото врача -->
				<div class="doctor-photo-section">
					<div class="photo-frame">
						<img :src="ZarinaPhoto" :alt="doctor.name" class="doctor-photo" />
						<div class="photo-glow"></div>
					</div>
					
					<div class="specialties-preview">
						<div class="specialties-title">{{ $t('doctor.specializationTitle') }}</div>
						<div class="specialties-list">
							<span 
								v-for="(specialty, index) in doctor.specialties.slice(0, 3)" 
								:key="index" 
								class="specialty-item"
							>
								{{ specialty }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.hero-doctor {
	position: relative;
	min-height: 100vh;
	display: flex;
	align-items: center;
	padding: 8rem 2rem 4rem;
	overflow: hidden;
}

.hero-background {
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg, 
		#1a365d 0%, 
		var(--primary-dark) 40%, 
		#2c5282 100%
	);
	z-index: 0;
}

.hero-background::before {
	content: '';
	position: absolute;
	inset: 0;
	background: 
		radial-gradient(circle at 15% 20%, rgba(99, 179, 237, 0.15) 0%, transparent 40%),
		radial-gradient(circle at 85% 80%, rgba(66, 153, 225, 0.1) 0%, transparent 50%);
	animation: backgroundPulse 10s ease-in-out infinite;
}

@keyframes backgroundPulse {
	0%, 100% { opacity: 0.7; }
	50% { opacity: 1; }
}

.hero-container {
	position: relative;
	z-index: 1;
	width: 100%;
	max-width: 1400px;
	margin: 0 auto;
}

.hero-grid {
	display: grid;
	grid-template-columns: 1.2fr 1fr;
	gap: 5rem;
	align-items: center;
}

/* Левая секция - информация */
.doctor-info-section {
	color: white;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.doctor-badge {
	display: inline-flex;
	align-items: center;
	gap: 0.75rem;
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(10px);
	padding: 0.75rem 1.5rem;
	border-radius: 50px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	width: fit-content;
	animation: fadeInDown 0.8s ease-out;
}

.badge-icon {
	font-size: 1.5rem;
}

.badge-text {
	font-weight: 600;
	font-size: 1rem;
}

.doctor-name {
	font-size: 3.5rem;
	font-weight: 800;
	line-height: 1.1;
	margin: 0;
	letter-spacing: -1px;
	text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	animation: fadeInUp 0.8s ease-out 0.1s both;
}

.doctor-experience {
	font-size: 1.3rem;
	opacity: 0.9;
	margin: -0.5rem 0 0;
	font-weight: 500;
	animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-message {
	padding: 2rem 0;
	border-top: 1px solid rgba(255, 255, 255, 0.2);
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	animation: fadeInUp 0.8s ease-out 0.3s both;
}

.message-title {
	font-size: 2rem;
	font-weight: 700;
	margin: 0 0 1rem;
	line-height: 1.3;
}

.message-text {
	font-size: 1.2rem;
	line-height: 1.7;
	opacity: 0.95;
	margin: 0;
}

.quick-info {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	animation: fadeInUp 0.8s ease-out 0.4s both;
}

.info-item {
	display: flex;
	gap: 1rem;
	align-items: flex-start;
}

.info-icon {
	font-size: 1.5rem;
	flex-shrink: 0;
}

.info-text {
	font-size: 1.05rem;
	line-height: 1.6;
	opacity: 0.95;
}

.action-buttons {
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	animation: fadeInUp 0.8s ease-out 0.5s both;
}

.cta-button {
	padding: 1.2rem 2.5rem;
	font-size: 1.1rem;
	font-weight: 700;
	border-radius: 50px;
	border: none;
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	text-decoration: none;
	display: inline-block;
	text-align: center;
}

.cta-button.primary {
	background: white;
	color: var(--primary-dark);
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.cta-button.primary:hover {
	transform: translateY(-4px) scale(1.05);
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.cta-button.secondary {
	background: transparent;
	color: white;
	border: 2px solid rgba(255, 255, 255, 0.4);
}

.cta-button.secondary:hover {
	background: rgba(255, 255, 255, 0.1);
	border-color: rgba(255, 255, 255, 0.6);
	transform: translateY(-2px);
}

/* Правая секция - фото */
.doctor-photo-section {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	animation: fadeIn 1s ease-out 0.3s both;
}

.photo-frame {
	position: relative;
	border-radius: 30px;
	overflow: hidden;
	box-shadow: 
		0 30px 80px rgba(0, 0, 0, 0.4),
		0 0 0 1px rgba(255, 255, 255, 0.1);
}

.doctor-photo {
	width: 100%;
	height: auto;
	aspect-ratio: 3/4;
	object-fit: cover;
	object-position: center 25%;
	display: block;
}

.photo-glow {
	position: absolute;
	inset: -20px;
	background: linear-gradient(135deg, rgba(99, 179, 237, 0.3), rgba(44, 82, 130, 0.3));
	filter: blur(40px);
	z-index: -1;
	animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
	0%, 100% { opacity: 0.5; transform: scale(0.9); }
	50% { opacity: 0.8; transform: scale(1.1); }
}

.specialties-preview {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 20px;
	padding: 1.5rem;
	color: white;
}

.specialties-title {
	font-size: 0.9rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 1px;
	opacity: 0.8;
	margin-bottom: 1rem;
}

.specialties-list {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.specialty-item {
	font-size: 1rem;
	padding: 0.75rem 1rem;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	transition: all 0.3s ease;
}

.specialty-item:hover {
	background: rgba(255, 255, 255, 0.2);
	transform: translateX(5px);
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeInDown {
	from {
		opacity: 0;
		transform: translateY(-20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeIn {
	from { opacity: 0; }
	to { opacity: 1; }
}

/* Адаптив */
@media (max-width: 1024px) {
	.hero-grid {
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	.doctor-info-section {
		order: 2;
		text-align: center;
		align-items: center;
	}

	.doctor-photo-section {
		order: 1;
		max-width: 400px;
		margin: 0 auto;
	}

	.doctor-name {
		font-size: 2.8rem;
	}

	.quick-info {
		align-items: center;
		text-align: center;
	}

	.action-buttons {
		justify-content: center;
	}
}

@media (max-width: 768px) {
	.hero-doctor {
		padding: 6rem 1.5rem 3rem;
		min-height: auto;
	}

	.hero-grid {
		gap: 2rem;
	}

	.doctor-name {
		font-size: 2.2rem;
	}

	.message-title {
		font-size: 1.6rem;
	}

	.message-text {
		font-size: 1.05rem;
	}

	.action-buttons {
		flex-direction: column;
		width: 100%;
	}

	.cta-button {
		width: 100%;
	}

	.doctor-photo-section {
		max-width: 300px;
	}
}
</style>

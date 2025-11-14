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
</script>

<template>
	<div class="doctor-card">
		<div class="card-header">
			<div class="stars-doctor"></div>
			<div class="doctor-avatar">
				<img :src="ZarinaPhoto" alt="Джатиева Зарина Владимировна" class="avatar-photo" />
			</div>
			<div class="doctor-info">
				<h2 class="doctor-name">{{ doctor.name }}</h2>
				<p class="doctor-specialization">{{ doctor.specialization }}</p>
			</div>
		</div>

		<div class="card-body">
			<div class="info-section">
				<h3 class="section-title">{{ $t('doctor.educationTitle') }}</h3>
				<p class="education-text">{{ doctor.education }}</p>
			</div>

			<div class="info-section">
				<h3 class="section-title">{{ $t('doctor.specializationTitle') }}</h3>
				<ul class="specialties-list">
					<li v-for="(specialty, index) in doctor.specialties" :key="index" class="specialty-item">
						<span class="specialty-dot"></span>
						{{ specialty }}
					</li>
				</ul>
			</div>

			<div class="info-section">
				<h3 class="section-title">{{ $t('doctor.aboutTitle') }}</h3>
				<p class="description-text">{{ doctor.description }}</p>
			</div>
		</div>
	</div>
  
</template>

<style scoped>
.doctor-card {
	background: white;
	border-radius: 0 0 24px 24px;
	box-shadow: 
		0 4px 20px rgba(0, 0, 0, 0.08),
		0 0 0 1px rgba(0, 0, 0, 0.02);
	overflow: hidden;
	margin-bottom: 2rem;
	transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
							box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
	will-change: transform;
}

.doctor-card:hover {
	transform: translateY(-12px);
	box-shadow: 
		0 25px 80px rgba(44, 82, 130, 0.2),
		0 0 60px rgba(99, 179, 237, 0.2),
		0 0 0 1px rgba(99, 179, 237, 0.3);
	border-color: var(--accent-blue);
}

.doctor-card::before {
	content: '';
	position: absolute;
	top: -2px;
	left: -2px;
	right: -2px;
	bottom: -2px;
	background: linear-gradient(
		45deg,
		rgba(99, 179, 237, 0.4),
		rgba(44, 82, 130, 0.4),
		rgba(99, 179, 237, 0.4)
	);
	background-size: 300% 300%;
	border-radius: 24px;
	opacity: 0;
	z-index: -1;
	transition: opacity 0.5s ease;
	animation: gradientFlow 6s ease infinite;
}

.doctor-card:hover::before {
	opacity: 1;
}

@keyframes gradientFlow {
	0%, 100% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
}

.card-header {
	background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-blue) 100%);
	padding: 3rem 2.5rem;
	display: flex;
	align-items: center;
	gap: 2rem;
	color: white;
	position: relative;
	overflow: hidden;
}

.card-header::before {
	content: '';
	position: absolute;
	top: -50%;
	right: -50%;
	width: 200%;
	height: 200%;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
	animation: subtleGlow 6s ease-in-out infinite;
	z-index: 0;
}

.card-header::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-image: 
		radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.3), transparent),
		radial-gradient(2px 2px at 60% 70%, rgba(255, 255, 255, 0.3), transparent),
		radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.2), transparent),
		radial-gradient(1px 1px at 80% 10%, rgba(255, 255, 255, 0.25), transparent),
		radial-gradient(2px 2px at 90% 60%, rgba(255, 255, 255, 0.3), transparent),
		radial-gradient(1px 1px at 33% 80%, rgba(255, 255, 255, 0.2), transparent),
		radial-gradient(1px 1px at 15% 90%, rgba(255, 255, 255, 0.25), transparent);
	background-size: 200% 200%;
	background-position: 0% 0%;
	animation: floatParticles 20s linear infinite;
	pointer-events: none;
	z-index: 0;
}

@keyframes floatParticles {
	0% { 
		background-position: 0% 0%;
		transform: translateY(0);
	}
	100% { 
		background-position: 200% 200%;
		transform: translateY(-80px);
	}
}

@keyframes subtleGlow {
	0%, 100% { transform: translate(0, 0); }
	50% { transform: translate(-10%, -10%); }
}

.stars-doctor {
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
	animation: twinkleDoctor 4s ease-in-out infinite, moveStarsDoctor 20s linear infinite;
	opacity: 0.5;
	z-index: 0;
	will-change: opacity, transform;
}

@keyframes twinkleDoctor {
	0%, 100% { opacity: 0.3; }
	50% { opacity: 0.6; }
}

@keyframes moveStarsDoctor {
	0% { transform: translate3d(0, 0, 0); }
	100% { transform: translate3d(-200px, -200px, 0); }
}

.doctor-avatar {
	width: 200px;
	height: 240px;
	border-radius: 16px;
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(10px);
	display: flex;
	align-items: center;
	justify-content: center;
	border: 3px solid rgba(255, 255, 255, 0.3);
	flex-shrink: 0;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	position: relative;
	z-index: 1;
	overflow: hidden;
}

.avatar-photo {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center 25%;
}

.avatar-placeholder {
	font-size: 4.5rem;
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.doctor-info {
	flex: 1;
	position: relative;
	z-index: 1;
}

.doctor-name {
	font-size: 2.2rem;
	font-weight: 800;
	margin: 0 0 0.5rem;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	letter-spacing: -0.5px;
	color: white;
}

.doctor-specialization {
	font-size: 1.2rem;
	opacity: 0.95;
	margin: 0 0 1rem;
	font-weight: 500;
}

.experience-badge {
	display: inline-block;
	background: rgba(255, 255, 255, 0.2);
	padding: 0.6rem 1.2rem;
	border-radius: 30px;
	font-size: 0.95rem;
	font-weight: 600;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.3);
}

.card-body {
	padding: 2.5rem;
	background: white;
	position: relative;
	z-index: 1;
}

.doctor-card:hover .card-body {
	background: white;
}

.info-section {
	margin-bottom: 2.5rem;
}

.info-section:last-child {
	margin-bottom: 0;
}

.section-title {
	font-size: 1.4rem;
	font-weight: 700;
	color: var(--primary-blue);
	margin: 0 0 1.25rem;
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.education-text {
	font-size: 1.05rem;
	line-height: 1.7;
	color: var(--text-secondary);
	margin: 0;
}

.specialties-list {
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	gap: 1rem;
}

.specialty-item {
	display: flex;
	align-items: center;
	gap: 1rem;
	font-size: 1.05rem;
	color: var(--text-secondary);
	padding: 0.75rem 1rem;
	border-radius: 12px;
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	background: transparent;
	cursor: pointer;
}

.specialty-item:hover {
	transform: translateX(8px);
}

.specialty-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
	flex-shrink: 0;
	box-shadow: 0 2px 8px rgba(44, 82, 130, 0.3);
}

.description-text {
	font-size: 1.05rem;
	line-height: 1.8;
	color: var(--text-secondary);
	margin: 0;
}

@keyframes slideIn {
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
	.card-header {
		flex-direction: column;
		text-align: center;
		padding: 2.5rem 1.5rem;
	}

	.doctor-avatar {
		width: 120px;
		height: 120px;
	}

	.avatar-placeholder {
		font-size: 3.5rem;
	}

	.doctor-name {
		font-size: 1.8rem;
	}

	.card-body {
		padding: 2rem 1.5rem;
	}

	.section-title {
		font-size: 1.2rem;
	}
  
	.specialty-item:hover {
		transform: translateX(4px);
	}
}
</style>
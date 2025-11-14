<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useInView } from '../composables/useInView'

const { t } = useI18n()

const icons = ['🦷', '🔬', '👄', '😁', '✨', '💫']
const colors = [
	'linear-gradient(135deg, #2c5282 0%, #3182ce 100%)',
	'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
	'linear-gradient(135deg, #2c5282 0%, #2d3748 100%)',
	'linear-gradient(135deg, #1a202c 0%, #2c5282 100%)',
	'linear-gradient(135deg, #2d3748 0%, #3182ce 100%)',
	'linear-gradient(135deg, #3182ce 0%, #63b3ed 100%)'
]

const services = computed(() => {
	return icons.map((icon, index) => ({
		icon,
		color: colors[index],
		title: t(`services.items.${index}.title`),
		description: t(`services.items.${index}.description`)
	}))
})

const { observe, disconnect } = useInView()

onMounted(() => {
	// Наблюдатель подключится через ref-обработчик ниже
})

onBeforeUnmount(() => disconnect())
</script>

<template>
	<section class="services-section">
		<div class="section-header">
			<h2 class="section-title">{{ $t('services.title') }}</h2>
			<p class="section-subtitle">
				{{ $t('services.subtitle') }}
			</p>
		</div>

		<div class="services-grid">
			<div 
				v-for="(service, index) in services" 
				:key="index" 
				class="service-card"
				:ref="observe"
			>
				<div class="service-icon" :style="{ background: service.color }">
					<span>{{ service.icon }}</span>
				</div>
				<div class="service-content">
					<h3 class="service-title">{{ service.title }}</h3>
					<p class="service-description">{{ service.description }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.services-section {
	background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-blue) 100%);
	border-radius: 24px;
	padding: 3.5rem 2.5rem;
	margin-bottom: 2rem;
	animation: slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) both 0.2s;
	position: relative;
	overflow: hidden;
	box-shadow: 0 20px 60px rgba(26, 32, 44, 0.3);
	will-change: transform, opacity;
}

.services-section::before {
	content: '';
	position: absolute;
	top: -50%;
	right: -50%;
	width: 200%;
	height: 200%;
	background: radial-gradient(circle, rgba(99, 179, 237, 0.08) 0%, transparent 70%);
	animation: rotate 20s linear infinite;
	pointer-events: none;
}

@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

.section-header {
	text-align: center;
	margin-bottom: 3.5rem;
	position: relative;
	z-index: 1;
}

.section-title {
	font-size: 2.8rem;
	font-weight: 800;
	color: white;
	margin: 0 0 1rem;
	text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	letter-spacing: -0.5px;
}

.section-subtitle {
	font-size: 1.15rem;
	color: rgba(255, 255, 255, 0.95);
	margin: 0;
	max-width: 700px;
	margin: 0 auto;
	line-height: 1.7;
}

.services-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5rem;
	position: relative;
	z-index: 1;
}

.service-card {
	background: rgba(255, 255, 255, 0.98);
	backdrop-filter: blur(20px);
	border-radius: 20px;
	padding: 2.5rem;
	display: flex;
	align-items: flex-start;
	gap: 1.5rem;
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	border: 1px solid rgba(255, 255, 255, 0.2);
	will-change: transform;
	transform-style: preserve-3d;
	perspective: 1000px;
	position: relative;
}

.service-card::before {
	content: '';
	position: absolute;
	inset: 0;
	border-radius: 20px;
	background: linear-gradient(135deg, rgba(99, 179, 237, 0.15), rgba(44, 82, 130, 0.1));
	opacity: 0;
	transition: opacity 0.5s ease;
	z-index: 0;
}

/* Начальное состояние для появления */
.service-card.reveal {
	opacity: 0;
	transform: translate3d(0, 30px, 0);
	transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
							transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card.is-visible {
	opacity: 1;
	transform: translate3d(0, 0, 0);
}

.service-card:hover::before {
	opacity: 1;
}

.service-card:hover {
	transform: translateY(-15px) rotateX(3deg) scale(1.03);
	box-shadow: 
		0 30px 80px rgba(44, 82, 130, 0.3),
		0 0 0 1px rgba(44, 82, 130, 0.15);
	background: white;
}

.service-icon {
	width: 80px;
	height: 80px;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	font-size: 2.5rem;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	position: relative;
	overflow: hidden;
}

.service-icon::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.1);
	opacity: 0;
	transition: opacity 0.4s ease;
}

.service-card:hover .service-icon {
	transform: scale(1.15) rotate(-5deg);
}

.service-card:hover .service-icon::before {
	opacity: 1;
}

.service-content {
	flex: 1;
}

.service-title {
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--primary-dark);
	margin: 0 0 0.75rem;
}

.service-description {
	font-size: 1.05rem;
	color: var(--text-secondary);
	line-height: 1.7;
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
	.services-section {
		padding: 2.5rem 1.5rem;
	}

	.section-title {
		font-size: 2rem;
	}

	.section-subtitle {
		font-size: 1rem;
	}

	.services-grid {
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.service-card {
		padding: 2rem;
	}

	.service-icon {
		width: 70px;
		height: 70px;
		font-size: 2.2rem;
	}

	.service-title {
		font-size: 1.3rem;
	}
  
	.service-card:hover {
		transform: translateY(-6px);
	}
}
</style>
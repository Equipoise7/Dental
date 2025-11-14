<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stats = ref([
	{ value: 0, target: 500, suffix: '+', labelKey: 'stats.patients' },
	{ value: 0, target: 7, suffix: '+', labelKey: 'stats.experience' },
	{ value: 0, target: 100, suffix: '%', labelKey: 'stats.satisfaction' },
	{ value: 0, target: 15, suffix: '+', labelKey: 'stats.services' }
])

const hasAnimated = ref(false)

const animateValue = (stat, duration = 2000) => {
	const startTime = performance.now()
	const startValue = 0
	const endValue = stat.target

	const animate = (currentTime) => {
		const elapsed = currentTime - startTime
		const progress = Math.min(elapsed / duration, 1)
		
		// Easing function для более плавной анимации
		const easeOutQuart = 1 - Math.pow(1 - progress, 4)
		
		stat.value = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
		
		if (progress < 1) {
			requestAnimationFrame(animate)
		} else {
			stat.value = endValue
		}
	}
	
	requestAnimationFrame(animate)
}

const startAnimation = () => {
	if (hasAnimated.value) return
	hasAnimated.value = true
	
	stats.value.forEach((stat, index) => {
		setTimeout(() => {
			animateValue(stat)
		}, index * 100)
	})
}

onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				startAnimation()
			}
		})
	}, { threshold: 0.3 })
	
	const element = document.querySelector('.stats-section')
	if (element) observer.observe(element)
})
</script>

<template>
	<section class="stats-section">
		<div class="stats-grid">
			<div 
				v-for="(stat, index) in stats" 
				:key="index"
				class="stat-card"
				:style="{ animationDelay: `${index * 0.1}s` }"
			>
				<div class="stat-value">
					{{ stat.value }}{{ stat.suffix }}
				</div>
				<div class="stat-label">{{ $t(stat.labelKey) }}</div>
				<div class="stat-decoration"></div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.stats-section {
	background: linear-gradient(135deg, var(--primary-dark) 0%, #1e3a5f 100%);
	border-radius: 24px;
	padding: 4rem 2.5rem;
	margin-bottom: 2rem;
	position: relative;
	overflow: hidden;
	box-shadow: 
		0 20px 60px rgba(44, 82, 130, 0.3),
		0 0 0 1px rgba(255, 255, 255, 0.1);
}

.stats-section::before {
	content: '';
	position: absolute;
	inset: 0;
	background: 
		radial-gradient(circle at 20% 30%, rgba(99, 179, 237, 0.15) 0%, transparent 50%),
		radial-gradient(circle at 80% 70%, rgba(49, 130, 206, 0.1) 0%, transparent 50%);
	animation: pulse 6s ease-in-out infinite;
}

@keyframes pulse {
	0%, 100% { opacity: 0.5; }
	50% { opacity: 1; }
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 3rem;
	position: relative;
	z-index: 1;
}

.stat-card {
	text-align: center;
	position: relative;
	animation: fadeInUp 0.8s ease-out forwards;
	opacity: 0;
	will-change: transform, opacity;
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

.stat-value {
	font-size: 4rem;
	font-weight: 800;
	color: white;
	line-height: 1;
	margin-bottom: 0.5rem;
	text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	font-variant-numeric: tabular-nums;
}

.stat-label {
	font-size: 1.1rem;
	color: rgba(255, 255, 255, 0.9);
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.stat-decoration {
	position: absolute;
	top: -20px;
	left: 50%;
	transform: translateX(-50%);
	width: 60px;
	height: 4px;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
	border-radius: 2px;
	animation: slideIn 1s ease-out both;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(40px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideIn {
	from {
		width: 0;
		opacity: 0;
	}
	to {
		width: 60px;
		opacity: 1;
	}
}

@media (max-width: 768px) {
	.stats-section {
		padding: 3rem 2rem;
	}

	.stats-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	.stat-value {
		font-size: 3rem;
	}

	.stat-label {
		font-size: 0.95rem;
	}
}
</style>

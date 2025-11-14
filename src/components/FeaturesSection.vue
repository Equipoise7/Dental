<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const icons = ['🏥', '💎', '💊', '🎯']

const features = computed(() => {
	return icons.map((icon, index) => ({
		icon,
		title: t(`features.items.${index}.title`),
		description: t(`features.items.${index}.description`)
	}))
})
</script>

<template>
	<section class="features-section">
		<div class="section-header">
			<h2 class="section-title">{{ $t('features.title') }}</h2>
			<p class="section-subtitle">
				{{ $t('features.subtitle') }}
			</p>
		</div>

		<div class="features-grid">
			<div 
				v-for="(feature, index) in features" 
				:key="index" 
				class="feature-card"
			>
				<div class="feature-icon">{{ feature.icon }}</div>
				<h3 class="feature-title">{{ feature.title }}</h3>
				<p class="feature-description">{{ feature.description }}</p>
			</div>
		</div>
	</section>
</template>

<style scoped>
.features-section {
	background: white;
	border-radius: 24px;
	box-shadow: 
		0 4px 20px rgba(0, 0, 0, 0.08),
		0 0 0 1px rgba(0, 0, 0, 0.02);
	padding: 3.5rem 2.5rem;
	margin-bottom: 2rem;
	animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both 0.1s;
	will-change: transform, opacity;
}

.section-header {
	text-align: center;
	margin-bottom: 3.5rem;
}

.section-title {
	font-size: 2.8rem;
	font-weight: 800;
	color: var(--primary-dark);
	margin: 0 0 1rem;
	letter-spacing: -0.5px;
}

.section-subtitle {
	font-size: 1.15rem;
	color: var(--text-light);
	margin: 0;
	max-width: 700px;
	margin: 0 auto;
	line-height: 1.7;
}

.features-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 2rem;
}

.feature-card {
	text-align: center;
	padding: 2.5rem 2rem;
	border-radius: 20px;
	background: linear-gradient(135deg, rgba(44, 82, 130, 0.03) 0%, rgba(49, 130, 206, 0.03) 100%);
	border: 1px solid rgba(44, 82, 130, 0.08);
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	will-change: transform;
	cursor: pointer;
	outline: none;
}

.feature-card:focus {
	outline: none;
}

.feature-card:focus-visible {
	outline: none;
}

.feature-icon {
	font-size: 4.5rem;
	margin-bottom: 1.5rem;
	filter: drop-shadow(0 4px 12px rgba(44, 82, 130, 0.15));
	display: inline-block;
	pointer-events: none;
	animation: float 3s ease-in-out infinite;
}

.feature-card:nth-child(1) .feature-icon {
	animation-delay: 0s;
}

.feature-card:nth-child(2) .feature-icon {
	animation-delay: 0.5s;
}

.feature-card:nth-child(3) .feature-icon {
	animation-delay: 1s;
}

.feature-card:nth-child(4) .feature-icon {
	animation-delay: 1.5s;
}

@keyframes float {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

.feature-title {
	font-size: 1.4rem;
	font-weight: 700;
	color: var(--primary-dark);
	margin: 0 0 0.75rem;
}

.feature-description {
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
	.features-section {
		padding: 2.5rem 1.5rem;
	}

	.section-title {
		font-size: 2rem;
	}

	.section-subtitle {
		font-size: 1rem;
	}

	.features-grid {
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.feature-icon {
		font-size: 3.5rem;
	}
  
	.feature-card:hover {
		transform: translateY(-8px);
	}
}
</style>
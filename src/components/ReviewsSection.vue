<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useInView } from '../composables/useInView'

const reviews = [
	{
		name: 'Анна Смирнова',
		text: 'Выражаю огромную благодарность! Профессиональный подход, внимательное отношение и современное оборудование. Лечение прошло абсолютно безболезненно. Теперь только к вам!',
		rating: 5,
		date: 'Октябрь 2024'
	},
	{
		name: 'Дмитрий Петров',
		text: 'Очень доволен качеством обслуживания. Врач подробно объяснил весь план лечения, никаких скрытых платежей. Современная клиника с профессиональными специалистами.',
		rating: 5,
		date: 'Сентябрь 2024'
	},
	{
		name: 'Елена Иванова',
		text: 'Замечательная клиника! Уютная атмосфера, вежливый персонал. Была на процедуре отбеливания - результат превзошел все ожидания. Рекомендую!',
		rating: 5,
		date: 'Август 2024'
	},
	{
		name: 'Михаил Соколов',
		text: 'Долго искал хорошего стоматолога. Здесь нашел! Лечили сложный случай, всё прошло отлично. Спасибо за профессионализм и внимательность.',
		rating: 5,
		date: 'Ноябрь 2024'
	}
]

const currentIndex = ref(0)

const nextReview = () => {
	currentIndex.value = (currentIndex.value + 1) % reviews.length
}

const prevReview = () => {
	currentIndex.value = (currentIndex.value - 1 + reviews.length) % reviews.length
}

const goToReview = (index) => {
	currentIndex.value = index
}

const { observe, disconnect } = useInView({ threshold: 0.2, rootMargin: '0px 0px -5% 0px' })
onMounted(() => {})
onBeforeUnmount(() => disconnect())
</script>

<template>
	<section class="reviews-section" :ref="observe">
		<div class="section-header" :ref="observe">
			<h2 class="section-title">{{ $t('reviews.title') }}</h2>
			<p class="section-subtitle">
				{{ $t('reviews.subtitle') }}
			</p>
		</div>

	<div class="reviews-carousel" :ref="observe">
		<div class="reviews-container">
			<transition name="slide-fade" mode="out-in">
				<div :key="currentIndex" class="review-card">
					<div class="review-header">
						<div class="review-avatar">
							{{ reviews[currentIndex].name.charAt(0) }}
						</div>
						<div class="review-info">
							<h3 class="review-name">{{ reviews[currentIndex].name }}</h3>
							<div class="review-rating">
								<span v-for="n in 5" :key="n" class="star">⭐</span>
							</div>
							<p class="review-date">{{ reviews[currentIndex].date }}</p>
						</div>
					</div>
					<p class="review-text">{{ reviews[currentIndex].text }}</p>
				</div>
			</transition>
		</div>

		<div class="carousel-buttons">
			<button @click="prevReview" class="carousel-button prev" aria-label="Предыдущий отзыв">
				‹
			</button>
			<button @click="nextReview" class="carousel-button next" aria-label="Следующий отзыв">
				›
			</button>
		</div>
	</div>

	<div class="carousel-dots" :ref="observe">
			<button
				v-for="(review, index) in reviews"
				:key="index"
				@click="goToReview(index)"
				:class="['dot', { active: currentIndex === index }]"
				:aria-label="`Отзыв ${index + 1}`"
			></button>
		</div>
	</section>
</template>

<style scoped>
.reviews-section {
	background: white;
	border-radius: 24px;
	box-shadow: 
		0 4px 20px rgba(0, 0, 0, 0.08),
		0 0 0 1px rgba(0, 0, 0, 0.02);
	padding: 3.5rem 2.5rem;
	margin-bottom: 2rem;
	animation: slideIn 0.9s cubic-bezier(0.4, 0, 0.2, 1) both 0.4s;
	will-change: transform, opacity;
}

.reveal { opacity: 0; transform: translate3d(0, 30px, 0); }
.is-visible { opacity: 1; transform: translate3d(0, 0, 0); transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1); }

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

.reviews-carousel {
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-bottom: 2.5rem;
	flex-direction: column;
}

.carousel-buttons {
	display: flex;
	gap: 2rem;
	justify-content: center;
	width: 100%;
}

.reviews-container {
	flex: 1;
	overflow: hidden;
	width: 100%;
	border-radius: 20px;
}

.review-card {
	background: linear-gradient(135deg, rgba(44, 82, 130, 0.03) 0%, rgba(49, 130, 206, 0.03) 100%);
	border: 1px solid rgba(44, 82, 130, 0.1);
	border-radius: 20px;
	padding: 3rem;
	min-height: 300px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	position: relative;
	overflow: hidden;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-webkit-tap-highlight-color: transparent;
	-webkit-touch-callout: none;
}

.review-card::before {
	content: '';
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	background: radial-gradient(circle at center, rgba(99, 179, 237, 0.12) 0%, transparent 60%);
	opacity: 0;
	transition: opacity 0.6s ease;
	pointer-events: none;
}

.review-card:hover::before {
	opacity: 1;
	animation: shimmer 2s ease-in-out infinite;
}

.review-card:hover {
	transform: scale(1.02);
	box-shadow: 
		0 20px 60px rgba(44, 82, 130, 0.15),
		0 0 0 1px rgba(99, 179, 237, 0.2),
		0 0 40px rgba(99, 179, 237, 0.1);
	background: white;
	border-color: var(--accent-blue);
}

@keyframes shimmer {
	0%, 100% { transform: translate(-25%, -25%) rotate(0deg); }
	50% { transform: translate(-25%, -25%) rotate(180deg); }
}

.review-header {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	margin-bottom: 2rem;
}

.review-avatar {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	font-weight: 800;
	flex-shrink: 0;
	box-shadow: 0 8px 24px rgba(44, 82, 130, 0.25);
}

.review-info {
	flex: 1;
}

.review-name {
	font-size: 1.4rem;
	font-weight: 700;
	color: var(--primary-dark);
	margin: 0 0 0.5rem;
}

.review-rating {
	margin-bottom: 0.5rem;
}

.star {
	font-size: 1.1rem;
}

.review-date {
	font-size: 0.95rem;
	color: var(--text-light);
	margin: 0;
}

.review-text {
	font-size: 1.15rem;
	color: var(--text-secondary);
	line-height: 1.8;
	margin: 0;
	font-style: italic;
}

.carousel-button {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	border: none;
	background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
	color: white;
	font-size: 2.5rem;
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8px 24px rgba(44, 82, 130, 0.25);
	will-change: transform;
	line-height: 1;
	padding: 0;
}

.carousel-button:hover {
	transform: scale(1.15);
	box-shadow: 0 12px 32px rgba(44, 82, 130, 0.35);
}

.carousel-button:active {
	transform: scale(1.05);
}

.carousel-dots {
	display: flex;
	justify-content: center;
	gap: 1rem;
}

.dot {
	width: 14px;
	height: 14px;
	border-radius: 50%;
	border: 2px solid var(--border-color);
	background: transparent;
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	padding: 0;
}

.dot.active {
	background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
	border-color: var(--primary-blue);
	transform: scale(1.4);
	box-shadow: 0 4px 12px rgba(44, 82, 130, 0.3);
}

.dot:hover:not(.active) {
	border-color: var(--primary-blue);
	transform: scale(1.2);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
	opacity: 0;
	transform: translate3d(40px, 0, 0);
}

.slide-fade-leave-to {
	opacity: 0;
	transform: translate3d(-40px, 0, 0);
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
	.reviews-section {
		padding: 2.5rem 1.5rem;
	}

	.section-title {
		font-size: 2rem;
	}

	.section-subtitle {
		font-size: 1rem;
	}

	.reviews-carousel {
		flex-direction: column;
		gap: 1.5rem;
	}

	.carousel-buttons {
		gap: 2rem;
	}

	.carousel-button {
		width: 50px;
		height: 50px;
		font-size: 2rem;
	}

	.reviews-container {
		width: 100%;
	}

	.review-card {
		padding: 2rem;
		min-height: 320px;
	}

	.review-avatar {
		width: 70px;
		height: 70px;
		font-size: 1.8rem;
	}

	.review-name {
		font-size: 1.2rem;
	}

	.review-text {
		font-size: 1.05rem;
	}
}
</style>
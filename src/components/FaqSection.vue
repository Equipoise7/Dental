<script setup>
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const openStates = reactive([false, false, false, false, false, false, false])

const faqs = computed(() => {
	return openStates.map((isOpen, index) => ({
		question: t(`faq.items.${index}.question`),
		answer: t(`faq.items.${index}.answer`),
		isOpen
	}))
})

const toggleFaq = (index) => {
	openStates[index] = !openStates[index]
}
</script>

<template>
	<section class="faq-section">
		<div class="section-header">
			<h2 class="section-title">{{ $t('faq.title') }}</h2>
			<p class="section-subtitle">
				{{ $t('faq.subtitle') }}
			</p>
		</div>

		<div class="faq-list">
			<div 
				v-for="(faq, index) in faqs" 
				:key="index" 
				class="faq-item"
				:class="{ active: faq.isOpen }"
				:style="{ animationDelay: `${index * 0.1}s` }"
			>
				<button @click="toggleFaq(index)" class="faq-question">
					<span class="question-text">{{ faq.question }}</span>
					<span class="question-icon" :class="{ rotated: faq.isOpen }">›</span>
				</button>
				<transition name="faq-expand">
					<div v-if="faq.isOpen" class="faq-answer">
						<p>{{ faq.answer }}</p>
					</div>
				</transition>
			</div>
		</div>
	</section>
</template>

<style scoped>
.faq-section {
	background: white;
	border-radius: 20px;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	padding: 3rem 2.5rem;
	margin-bottom: 2rem;
	animation: slideIn 1s ease-out;
	border: 1px solid rgba(0, 0, 0, 0.05);
	position: relative;
}

.section-header {
	text-align: center;
	margin-bottom: 3rem;
}

.section-title {
	font-size: 2.5rem;
	font-weight: 700;
	color: #2d3748;
	margin: 0 0 1rem;
}

.section-subtitle {
	font-size: 1.1rem;
	color: #718096;
	margin: 0;
	max-width: 700px;
	margin: 0 auto;
	line-height: 1.6;
}

.faq-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.faq-item {
	border: 2px solid #e2e8f0;
	border-radius: 12px;
	overflow: hidden;
	transition: all 0.3s ease;
	animation: fadeInUp 0.6s ease-out both;
}

.faq-item.active {
	border-color: #667eea;
	box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
}

.faq-question {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem 2rem;
	background: transparent;
	border: none;
	cursor: pointer;
	text-align: left;
	font-family: inherit;
	transition: background 0.3s ease;
}

.faq-question:hover {
	background: #f7fafc;
}

.faq-item.active .faq-question {
	background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.question-text {
	font-size: 1.2rem;
	font-weight: 600;
	color: #2d3748;
	flex: 1;
	padding-right: 1rem;
}

.question-icon {
	font-size: 2rem;
	color: #667eea;
	transition: transform 0.3s ease;
	transform: rotate(90deg);
	font-weight: 300;
}

.question-icon.rotated {
	transform: rotate(270deg);
}

.faq-answer {
	padding: 0 2rem 1.5rem;
	background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
}

.faq-answer p {
	font-size: 1rem;
	color: #4a5568;
	line-height: 1.7;
	margin: 0;
}

.faq-expand-enter-active,
.faq-expand-leave-active {
	transition: all 0.3s ease;
}

.faq-expand-enter-from,
.faq-expand-leave-to {
	opacity: 0;
	max-height: 0;
}

.faq-expand-enter-to,
.faq-expand-leave-from {
	opacity: 1;
	max-height: 500px;
}

@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (max-width: 768px) {
	.faq-section {
		padding: 2rem 1.5rem;
	}

	.section-title {
		font-size: 1.8rem;
	}

	.section-subtitle {
		font-size: 1rem;
	}

	.faq-question {
		padding: 1.25rem 1.5rem;
	}

	.question-text {
		font-size: 1.1rem;
	}

	.question-icon {
		font-size: 1.75rem;
	}

	.faq-answer {
		padding: 0 1.5rem 1.25rem;
	}

	.faq-answer p {
		font-size: 0.95rem;
	}
}
</style>
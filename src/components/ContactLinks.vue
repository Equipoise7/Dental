<script setup>
import { ref } from 'vue'

const contacts = ref({
	phone: '+79897443962',
	phoneDisplay: '+7 989 744 39 62',
	whatsapp: '+79897443962',
	telegram: 'dentist_username'
})

const openWhatsApp = () => {
	window.open(`https://wa.me/${contacts.value.whatsapp.replace(/\D/g, '')}`, '_blank')
}

const openTelegram = () => {
	window.open(`https://t.me/${contacts.value.telegram}`, '_blank')
}

const callPhone = () => {
	window.location.href = `tel:${contacts.value.phone}`
}
</script>

<template>
	<div class="contact-links">
		<div class="contact-header">
			<h2 class="contact-title">{{ $t('contact.title') }}</h2>
			<p class="contact-subtitle">{{ $t('contact.subtitle') }}</p>
		</div>

		<div class="contact-buttons">
			<button @click="openWhatsApp" class="contact-button whatsapp">
				<svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
				</svg>
				<div class="button-content">
					<span class="button-label">{{ $t('contact.whatsapp') }}</span>
					<span class="button-desc">{{ $t('contact.whatsappDesc') }}</span>
				</div>
			</button>

			<button @click="openTelegram" class="contact-button telegram">
				<svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
					<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
				</svg>
				<div class="button-content">
					<span class="button-label">{{ $t('contact.telegram') }}</span>
					<span class="button-desc">{{ $t('contact.telegramDesc') }}</span>
				</div>
			</button>

			<button @click="callPhone" class="contact-button phone">
				<svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
				</svg>
				<div class="button-content">
					<span class="button-label">{{ $t('contact.phone') }}</span>
					<span class="button-desc">{{ contacts.phoneDisplay }}</span>
				</div>
			</button>
		</div>
	</div>
  
</template>

<style scoped>
.contact-links {
	background: white;
	border-radius: 20px;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	padding: 2.5rem;
	animation: slideIn 1s ease-out;
}

.contact-header {
	text-align: center;
	margin-bottom: 2rem;
}

.contact-title {
	font-size: 2rem;
	font-weight: 700;
	color: #2d3748;
	margin: 0 0 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
}

.contact-subtitle {
	font-size: 1rem;
	color: #718096;
	margin: 0;
}

.contact-buttons {
	display: grid;
	gap: 1rem;
	margin-bottom: 2rem;
}

.contact-button {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	padding: 1.5rem;
	border: none;
	border-radius: 15px;
	cursor: pointer;
	transition: all 0.3s ease;
	font-family: inherit;
	text-align: left;
	color: white;
}

.contact-button:hover {
	transform: translateY(-3px);
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.contact-button:active {
	transform: translateY(-1px);
}

.whatsapp {
	background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
	box-shadow: 0 8px 24px rgba(37, 211, 102, 0.25);
}

.whatsapp:hover {
	box-shadow: 0 12px 32px rgba(37, 211, 102, 0.35);
}

.telegram {
	background: linear-gradient(135deg, #0088cc 0%, #005580 100%);
	box-shadow: 0 8px 24px rgba(0, 136, 204, 0.25);
}

.telegram:hover {
	box-shadow: 0 12px 32px rgba(0, 136, 204, 0.35);
}

.phone {
	background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
	box-shadow: 0 8px 24px rgba(44, 82, 130, 0.25);
	position: relative;
	overflow: visible;
}

.phone::before {
	content: '';
	position: absolute;
	inset: -4px;
	background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
	border-radius: 15px;
	opacity: 0;
	z-index: -1;
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.phone:hover {
	box-shadow: 0 12px 32px rgba(44, 82, 130, 0.35);
}

.phone:hover::before {
	animation: pulseFast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
	0%, 100% {
		opacity: 0;
		transform: scale(1);
	}
	50% {
		opacity: 0.3;
		transform: scale(1.05);
	}
}

@keyframes pulseFast {
	0%, 100% {
		opacity: 0;
		transform: scale(1);
	}
	50% {
		opacity: 0.5;
		transform: scale(1.08);
	}
}

.contact-icon {
	width: 2.5rem;
	height: 2.5rem;
	flex-shrink: 0;
}

.button-content {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.button-label {
	font-size: 1.2rem;
	font-weight: 600;
}

.button-desc {
	font-size: 0.9rem;
	opacity: 0.9;
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

@media (max-width: 768px) {
	.contact-links {
		padding: 1.5rem;
	}

	.contact-title {
		font-size: 1.5rem;
	}

	.contact-button {
		padding: 1.25rem;
	}

	.contact-icon {
		width: 2rem;
		height: 2rem;
	}

	.button-label {
		font-size: 1.1rem;
	}

	.button-desc {
		font-size: 0.85rem;
	}
}
</style>
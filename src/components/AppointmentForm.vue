<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePhoneFormat } from '../composables/usePhoneFormat'

const { t, tm } = useI18n()

const { 
  PHONE_PREFIX, 
  PHONE_LENGTH,
  validatePhone, 
  handlePhoneInput: handlePhoneInputBase,
  handlePhoneClick,
  handlePhoneKeydown
} = usePhoneFormat()

const formData = reactive({
  name: '',
  phone: PHONE_PREFIX,
  date: '',
  time: '',
  service: '',
  comment: ''
})

const services = computed(() => tm('appointment.services'))

const isSubmitting = ref(false)
const showSuccess = ref(false)
const serverUnavailable = ref(false)

// Обёртка для передачи formData в composable
const handlePhoneInput = (event) => {
  handlePhoneInputBase(event, formData)
}

const handleSubmit = async () => {
  if (!formData.name || !formData.phone || !formData.date || !formData.time) {
    alert(t('appointment.alertRequired'))
    return
  }

  if (!validatePhone(formData.phone)) {
    alert(t('appointment.alertPhone'))
    return
  }

  isSubmitting.value = true

  try {
    const res = await fetch('/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        service: formData.service,
        comment: formData.comment?.trim()
      })
    })
    const data = await res.json()
    if (!res.ok) {
      const msg = data?.errors?.[0]?.message || data?.message || 'Ошибка отправки формы'
      alert(msg)
      isSubmitting.value = false
      return
    }

    isSubmitting.value = false
    showSuccess.value = true
    // Сброс формы
    formData.name = ''
    formData.phone = PHONE_PREFIX
    formData.date = ''
    formData.time = ''
    formData.service = ''
    formData.comment = ''
    // Скрытие сообщения об успехе через 5 секунд
    setTimeout(() => { showSuccess.value = false }, 5000)
  } catch (e) {
    isSubmitting.value = false
    // Отмечаем недоступность сервера и показываем inline сообщение
    serverUnavailable.value = true
  }
}
</script>

<template>
  <div class="appointment-form">
    <div class="form-header">
      <h2 class="form-title">{{ $t('appointment.title') }}</h2>
      <p class="form-subtitle">{{ $t('appointment.subtitle') }}</p>
    </div>

    <div v-if="showSuccess" class="success-message">
      <span class="success-icon">✅</span>
      <div>
        <h3>{{ $t('appointment.success.title') }}</h3>
        <p>{{ $t('appointment.success.message') }}</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="name" class="form-label">{{ $t('appointment.name') }} *</label>
        <input 
          id="name"
          v-model="formData.name"
          type="text" 
          class="form-input"
          :placeholder="$t('appointment.namePlaceholder')"
          required
        />
      </div>

      <div class="form-group">
        <label for="phone" class="form-label">{{ $t('appointment.phone') }} *</label>
        <input 
          id="phone"
          v-model="formData.phone"
          @input="handlePhoneInput"
          @mousedown="handlePhoneClick"
          @mouseup="handlePhoneClick"
          @click="handlePhoneClick"
            @focus="handlePhoneClick"
            @select="handlePhoneClick"
          @keydown="handlePhoneKeydown"
          @keyup="handlePhoneClick"
          type="tel" 
          class="form-input"
          :placeholder="$t('appointment.phonePlaceholder')"
            :maxlength="PHONE_LENGTH"
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="date" class="form-label">{{ $t('appointment.date') }} *</label>
          <input 
            id="date"
            v-model="formData.date"
            type="date" 
            class="form-input"
            :min="new Date().toISOString().split('T')[0]"
            required
          />
        </div>

        <div class="form-group">
          <label for="time" class="form-label">{{ $t('appointment.time') }} *</label>
          <input 
            id="time"
            v-model="formData.time"
            type="time" 
            class="form-input"
            min="09:00"
            max="20:00"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="service" class="form-label">{{ $t('appointment.service') }}</label>
        <select 
          id="service"
          v-model="formData.service"
          class="form-input form-select"
        >
          <option value="">{{ $t('appointment.servicePlaceholder') }}</option>
          <option v-for="service in services" :key="service" :value="service">
            {{ service }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="comment" class="form-label">{{ $t('appointment.comment') }}</label>
        <textarea 
          id="comment"
          v-model="formData.comment"
          class="form-input form-textarea"
          :placeholder="$t('appointment.commentPlaceholder')"
          rows="4"
        ></textarea>
      </div>

      <div v-if="serverUnavailable" class="server-warning">
        {{ $t('appointment.serverWarning') }}
      </div>

      <button 
        type="submit" 
        class="submit-button"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">{{ $t('appointment.submit') }}</span>
        <span v-else>{{ $t('appointment.submitting') }}</span>
      </button>

      <p class="form-note">{{ $t('appointment.required') }}</p>
    </form>
  </div>
</template>

<style scoped>
.appointment-form {
  background: white;
  border-radius: 24px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.02);
  padding: 3.5rem 2.5rem;
  margin-bottom: 2rem;
  animation: slideIn 1.1s cubic-bezier(0.4, 0, 0.2, 1) both 0.6s;
  will-change: transform, opacity;
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

.form-header {
  text-align: center;
  margin-bottom: 3rem;
}

.form-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin: 0 0 1rem;
  letter-spacing: -0.5px;
}

.form-subtitle {
  font-size: 1.15rem;
  color: var(--text-light);
  margin: 0;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

.success-message {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 161, 105, 0.1) 100%);
  border: 2px solid #48bb78;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: slideInDown 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.success-message h3 {
  color: #2f855a;
  font-size: 1.3rem;
  margin: 0 0 0.5rem;
}

.success-message p {
  color: #38a169;
  font-size: 1rem;
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-input {
  padding: 1rem 1.25rem;
  font-size: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: white;
  color: var(--text-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 4px rgba(44, 82, 130, 0.1);
}

.form-input::placeholder {
  color: var(--text-light);
}

.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5568' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 3rem;
  appearance: none;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  line-height: 1.6;
}

.server-warning {
  background: linear-gradient(135deg, rgba(237, 137, 54, 0.1) 0%, rgba(221, 107, 32, 0.1) 100%);
  border: 2px solid #ed8936;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  color: #c05621;
  font-size: 0.95rem;
  line-height: 1.6;
}

.submit-button {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
  color: white;
  border: none;
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(44, 82, 130, 0.25);
  position: relative;
  overflow: hidden;
  will-change: transform;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease-out, height 0.6s ease-out;
}

.submit-button:hover:not(:disabled)::before {
  width: 400px;
  height: 400px;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(44, 82, 130, 0.35);
}

.submit-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-note {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
}

@media (max-width: 768px) {
  .appointment-form {
    padding: 2.5rem 1.5rem;
  }

  .form-title {
    font-size: 2rem;
  }

  .form-subtitle {
    font-size: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-input {
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
  }

  .submit-button {
    padding: 1.125rem 2rem;
    font-size: 1rem;
  }

  .success-message {
    flex-direction: column;
    gap: 0.75rem;
  }

  .success-icon {
    font-size: 1.75rem;
  }

  .success-message h3 {
    font-size: 1.15rem;
  }

  .success-message p {
    font-size: 0.95rem;
  }
}
</style>

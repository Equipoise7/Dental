/**
 * Composable для форматирования номера телефона
 * Простой подход: храним только цифры, показываем отформатированный вид
 */
export function usePhoneFormat() {
  const PHONE_PREFIX = '+7'
  const PHONE_LENGTH = 18

  /**
   * Форматирует номер телефона для отображения
   * @param {string} digits - Только цифры
   * @returns {string} - Отформатированный номер
   */
  const formatPhoneDisplay = (digits) => {
    if (!digits) return ''
    
    let formatted = '+7'
    
    if (digits.length > 0) {
      formatted += ' (' + digits.substring(0, 3)
      if (digits.length >= 3) {
        formatted += ')'
      }
    }
    
    if (digits.length > 3) {
      formatted += ' ' + digits.substring(3, 6)
    }
    
    if (digits.length > 6) {
      formatted += '-' + digits.substring(6, 8)
    }
    
    if (digits.length > 8) {
      formatted += '-' + digits.substring(8, 10)
    }
    
    return formatted
  }

  /**
   * Извлекает только цифры из строки
   * @param {string} value - Введённое значение
   * @returns {string} - Только цифры
   */
  const extractDigits = (value) => {
    let digits = value.replace(/\D/g, '')
    // Убираем первую 7 или 8
    if (digits.startsWith('7') || digits.startsWith('8')) {
      digits = digits.substring(1)
    }
    return digits.substring(0, 10)
  }

  /**
   * Валидация номера телефона
   * @param {string} phone - Номер телефона (может быть отформатированным или только цифры)
   * @returns {boolean} - Валиден ли номер
   */
  const validatePhone = (phone) => {
    const digits = extractDigits(phone)
    return digits.length === 10
  }

  /**
   * Обработчик ввода
   * @param {Event} event - Событие input
   * @param {Object} formData - Реактивный объект данных формы
   */
  const handlePhoneInput = (event, formData) => {
    const input = event.target
    const value = input.value
    
    // Извлекаем цифры
    const digits = extractDigits(value)
    
    // Сохраняем только цифры
    formData.phone = digits
    
    // Показываем отформатированный вид
    input.value = formatPhoneDisplay(digits)
  }

  /**
   * Форматирует номер для отправки на сервер
   * @param {string} digits - Только цифры
   * @returns {string} - +7XXXXXXXXXX
   */
  const formatPhoneForServer = (digits) => {
    return '+7' + digits
  }

  // Пустые функции для обратной совместимости
  const handlePhoneClick = () => {}
  const handlePhoneKeydown = () => {}
  const formatPhone = formatPhoneDisplay

  return {
    PHONE_PREFIX,
    PHONE_LENGTH,
    formatPhone,
    formatPhoneDisplay,
    extractDigits,
    validatePhone,
    handlePhoneInput,
    handlePhoneClick,
    handlePhoneKeydown,
    formatPhoneForServer
  }
}

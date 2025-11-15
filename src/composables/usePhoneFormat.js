/**
 * Composable для форматирования номера телефона
 * Формат: +7 (XXX) XXX-XX-XX
 */
export function usePhoneFormat() {
  const PHONE_PREFIX = '+7 '
  const PHONE_LENGTH = 18 // Полная длина отформатированного номера

  /**
   * Форматирует номер телефона
   * @param {string} value - Введённое значение
   * @returns {string} - Отформатированный номер
   */
  const formatPhone = (value) => {
    // Удаляем все кроме цифр
    let numbers = value.replace(/\D/g, '')
    
    // Убираем первую 7 или 8, оставляем только 10 цифр
    if (numbers.startsWith('7') || numbers.startsWith('8')) {
      numbers = numbers.substring(1)
    }
    
    // Максимум 10 цифр
    numbers = numbers.substring(0, 10)
    
    // Форматируем
    let formatted = '+7 '
    
    if (numbers.length > 0) {
      formatted += '(' + numbers.substring(0, 3)
    }
    
    if (numbers.length >= 3) {
      formatted += ') '
    }
    
    if (numbers.length > 3) {
      formatted += numbers.substring(3, 6)
    }
    
    if (numbers.length > 6) {
      formatted += '-' + numbers.substring(6, 8)
    }
    
    if (numbers.length > 8) {
      formatted += '-' + numbers.substring(8, 10)
    }
    
    return formatted
  }

  /**
   * Валидация номера телефона
   * @param {string} phone - Номер телефона
   * @returns {boolean} - Валиден ли номер
   */
  const validatePhone = (phone) => {
    const numbers = phone.replace(/\D/g, '')
    return numbers.length === 10
  }

  /**
   * Обработчик ввода в поле телефона
   * @param {Event} event - Событие input
   * @param {Object} formData - Реактивный объект данных формы
   */
  const handlePhoneInput = (event, formData) => {
    const input = event.target
    const cursorPosition = input.selectionStart
    const oldValue = formData.phone || ''
    const inputValue = input.value
    
    // Считаем количество цифр до курсора в старом значении
    const digitsBeforeCursor = oldValue.substring(0, cursorPosition).replace(/\D/g, '').length
    
    // Форматируем новое значение
    const formatted = formatPhone(inputValue)
    formData.phone = formatted
    
    // Восстанавливаем позицию курсора
    setTimeout(() => {
      // Находим позицию курсора по количеству цифр
      let newPosition = 0
      let digitCount = 0
      
      for (let i = 0; i < formatted.length; i++) {
        if (digitCount === digitsBeforeCursor) {
          newPosition = i
          break
        }
        if (/\d/.test(formatted[i])) {
          digitCount++
        }
      }
      
      // Если курсор должен быть в конце
      if (digitCount === digitsBeforeCursor) {
        newPosition = formatted.length
      }
      
      input.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  /**
   * Обработчик клика/фокуса - не требуется
   */
  const handlePhoneClick = () => {
    // Пустая функция для обратной совместимости
  }

  /**
   * Обработчик нажатия клавиш - не требуется
   */
  const handlePhoneKeydown = () => {
    // Пустая функция для обратной совместимости
  }

  return {
    PHONE_PREFIX,
    PHONE_LENGTH,
    formatPhone,
    validatePhone,
    handlePhoneInput,
    handlePhoneClick,
    handlePhoneKeydown
  }
}

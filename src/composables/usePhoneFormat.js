/**
 * Composable для форматирования номера телефона
 * Формат: +7 (XXX) XXX-XX-XX
 */
export function usePhoneFormat() {
  const PHONE_PREFIX = '+7 ('
  const PHONE_LENGTH = 18 // Полная длина отформатированного номера

  /**
   * Форматирует номер телефона
   * @param {string} value - Введённое значение
   * @returns {string} - Отформатированный номер
   */
  const formatPhone = (value) => {
    // Удаляем все кроме цифр
    let numbers = value.replace(/\D/g, '')
    
    // Если пользователь попытался удалить 7, возвращаем её обратно
    if (!numbers.startsWith('7')) {
      numbers = '7' + numbers
    }
    
    // Убираем лишние цифры (максимум 11)
    numbers = numbers.substring(0, 11)
    
    // Начинаем формат с +7 (
    let formatted = '+7 ('
    
    // Добавляем код оператора (3 цифры после 7)
    if (numbers.length > 1) {
      formatted += numbers.substring(1, 4)
    }
    
    // Закрываем скобку после 3 цифр кода
    if (numbers.length >= 4) {
      formatted += ')'
    }
    
    // Добавляем первую часть номера (3 цифры)
    if (numbers.length > 4) {
      formatted += ' ' + numbers.substring(4, 7)
    }
    
    // Добавляем дефис и вторую часть (2 цифры)
    if (numbers.length > 7) {
      formatted += '-' + numbers.substring(7, 9)
    }
    
    // Добавляем дефис и последнюю часть (2 цифры)
    if (numbers.length > 9) {
      formatted += '-' + numbers.substring(9, 11)
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
    return numbers.length === 11 && numbers.startsWith('7')
  }

  /**
   * Обработчик ввода в поле телефона
   * @param {Event} event - Событие input
   * @param {Object} formData - Реактивный объект данных формы
   */
  const handlePhoneInput = (event, formData) => {
    const input = event.target
    let cursorPosition = input.selectionStart
    const oldValue = formData.phone
    let inputValue = input.value
    
    // Если пытаются удалить "+7 ", просто возвращаем "+7 ("
    if (inputValue.length < 4 || !inputValue.startsWith('+7 ')) {
      formData.phone = PHONE_PREFIX
      setTimeout(() => input.setSelectionRange(4, 4), 0)
      return
    }
    
    // Форматируем номер
    const formatted = formatPhone(inputValue)
    formData.phone = formatted
    
    // Устанавливаем курсор
    setTimeout(() => {
      // Если курсор пытается встать перед +7 (, переносим его после
      if (cursorPosition < 4) {
        input.setSelectionRange(4, 4)
        return
      }
      
      // Если добавили символы, двигаем курсор вперёд
      if (formatted.length > oldValue.length) {
        // Пропускаем служебные символы
        let newPosition = cursorPosition + (formatted.length - oldValue.length)
        while (newPosition < formatted.length && 
               (formatted[newPosition] === ')' || 
                formatted[newPosition] === ' ' || 
                formatted[newPosition] === '-')) {
          newPosition++
        }
        input.setSelectionRange(newPosition, newPosition)
      } else {
        // При удалении сохраняем позицию курсора
        let newPosition = cursorPosition
        // Если курсор стоит на служебном символе, сдвигаем влево
        while (newPosition > 4 && newPosition < formatted.length &&
               (formatted[newPosition - 1] === ')' || 
                formatted[newPosition - 1] === ' ' || 
                formatted[newPosition - 1] === '-')) {
          newPosition--
        }
        input.setSelectionRange(newPosition, newPosition)
      }
    }, 0)
  }

  /**
   * Обработчик клика/фокуса - защита префикса
   * @param {Event} event - Событие
   */
  const handlePhoneClick = (event) => {
    const input = event.target
    
    requestAnimationFrame(() => {
      if (input.selectionStart < 4) {
        input.setSelectionRange(4, 4)
      }
    })
  }

  /**
   * Обработчик нажатия клавиш
   * @param {Event} event - Событие keydown
   */
  const handlePhoneKeydown = (event) => {
    const input = event.target
    const cursorPosition = input.selectionStart
    const selectionEnd = input.selectionEnd
    
    // Если есть выделение и оно включает префикс, корректируем
    if (cursorPosition !== selectionEnd && cursorPosition < 4) {
      event.preventDefault()
      input.setSelectionRange(4, selectionEnd)
      return
    }
    
    // Блокируем Backspace и Delete только если курсор строго в начале префикса
    if ((event.key === 'Backspace' && cursorPosition <= 4) || 
        (event.key === 'Delete' && cursorPosition < 4)) {
      event.preventDefault()
      input.setSelectionRange(4, 4)
    }
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

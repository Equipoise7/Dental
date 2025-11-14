import { describe, it, expect } from 'vitest'
import { usePhoneFormat } from './usePhoneFormat'

describe('usePhoneFormat', () => {
  const { formatPhone, validatePhone } = usePhoneFormat()

  it('formats basic number correctly', () => {
    expect(formatPhone('+7 (9181234567')).toBe('+7 (918) 123-45-67')
  })

  it('validates correct phone', () => {
    expect(validatePhone('+7 (918) 123-45-67')).toBe(true)
  })

  it('invalid when too short', () => {
    expect(validatePhone('+7 (918) 123')).toBe(false)
  })
})

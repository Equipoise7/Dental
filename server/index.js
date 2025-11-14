import express from 'express'
import cors from 'cors'
import { z } from 'zod'

const app = express()
const PORT = process.env.PORT || 5174

app.use(cors())
app.use(express.json())

const appointmentSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/),
  date: z.string(), // ISO date
  time: z.string(), // HH:mm
  service: z.string().optional(),
  comment: z.string().max(1000).optional()
})

app.post('/api/appointment', (req, res) => {
  try {
    const data = appointmentSchema.parse(req.body)

    // Здесь можно интегрировать БД/почту/telegram и т.д.
    // Для демо просто логируем и отвечаем успехом
    console.log('Новая заявка:', data)

    return res.status(200).json({ ok: true, message: 'Заявка принята. Мы свяжемся с вами.' })
  } catch (err) {
    if (err.issues) {
      return res.status(400).json({ ok: false, errors: err.issues })
    }
    return res.status(500).json({ ok: false, message: 'Внутренняя ошибка сервера' })
  }
})

app.get('/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})

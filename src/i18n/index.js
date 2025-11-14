import { createI18n } from 'vue-i18n'

// Читаем сохранённую локаль (если есть) для сохранения выбора пользователя между перезагрузками
const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : null

const messages = {
  ru: {
    hero: {
      title: 'Ваша улыбка — наша забота',
      subtitle: 'Профессиональная стоматологическая помощь с индивидуальным подходом',
      cta: 'Записаться на консультацию'
    },
    stats: {
      patients: 'Довольных пациентов',
      experience: 'Лет опыта',
      satisfaction: 'Удовлетворенность',
      services: 'Видов услуг'
    },
    beforeAfter: {
      title: 'До и После',
      subtitle: 'Реальные результаты нашей работы',
      before: 'До',
      after: 'После',
      hint: '👆 Перетащите ползунок, чтобы увидеть разницу'
    },
    doctor: {
      name: 'Джатиева Зарина Владимировна',
      specialization: 'Врач-стоматолог',
      experience: 'Большой опыт',
      education: 'Северо-Осетинская государственная медицинская академия',
      educationTitle: '📚 Образование',
      specializationTitle: '💼 Специализация',
      aboutTitle: '✨ О враче',
      specialties: [
        'Терапевтическая стоматология',
        'Эстетическая реставрация',
        'Лечение кариеса',
        'Профессиональная гигиена',
        'Отбеливание зубов'
      ],
      description: 'Индивидуальный подход к каждому пациенту. Использую современные технологии и материалы премиум-класса. Безболезненное лечение и комфортная атмосфера.'
    },
    features: {
      title: 'Что делает нас особенными',
      subtitle: 'В основе нашей работы — профессионализм, современные технологии и забота о каждом пациенте',
      items: [
        {
          title: 'Весь спектр услуг',
          description: 'От гигиены до имплантации — лечим всё, что связано с улыбкой'
        },
        {
          title: 'Премиум материалы',
          description: 'Используем только проверенные материалы европейского качества'
        },
        {
          title: 'Лечение без боли',
          description: 'Современная анестезия и щадящие методики лечения'
        },
        {
          title: 'Внимание к деталям',
          description: 'Индивидуальный подход и забота о каждом пациенте'
        }
      ]
    },
    services: {
      title: 'Наши услуги',
      subtitle: 'Полный спектр стоматологических услуг для здоровья и красоты вашей улыбки',
      items: [
        {
          title: 'Терапия',
          description: 'Лечение зубов и десен, кариеса, реставрация поврежденных зубов'
        },
        {
          title: 'Хирургия',
          description: 'Удаление зубов, имплантация. Без осложнений и долгих операций'
        },
        {
          title: 'Протезирование',
          description: 'Восстановление зубов установкой коронок, мостов или протезов'
        },
        {
          title: 'Ортодонтия',
          description: 'Современные решения для исправления прикуса и выравнивания зубов'
        },
        {
          title: 'Гигиена',
          description: 'Профессиональная чистка зубов и комплексный уход'
        },
        {
          title: 'Отбеливание',
          description: 'Безопасное отбеливание зубов современными методами'
        }
      ]
    },
    appointment: {
      title: '📅 Запись на приём',
      subtitle: 'Заполните форму, и мы свяжемся с вами для подтверждения записи',
      name: 'Ваше имя',
      namePlaceholder: 'Введите ваше имя',
      phone: 'Телефон',
      phonePlaceholder: '+7 (___) ___-__-__',
      date: 'Дата',
      time: 'Время',
      service: 'Услуга',
      servicePlaceholder: 'Выберите услугу',
      comment: 'Комментарий',
      commentPlaceholder: 'Опишите ваш запрос или пожелания...',
      submit: 'Записаться на приём',
      submitting: 'Отправка...',
      required: '* Обязательные поля',
      alertRequired: 'Пожалуйста, заполните все обязательные поля',
      alertPhone: 'Пожалуйста, введите корректный номер телефона (11 цифр)',
      success: {
        title: 'Заявка отправлена!',
        message: 'Мы свяжемся с вами в ближайшее время для подтверждения записи.'
      },
      serverWarning: 'Тестовый режим: сервер сейчас недоступен, заявка не будет сохранена. Вы можете позвонить нам по телефону или попробовать позже.',
      services: [
        'Консультация',
        'Лечение кариеса',
        'Профессиональная чистка',
        'Отбеливание',
        'Эстетическая реставрация',
        'Другое'
      ]
    },
    reviews: {
      title: 'Отзывы наших пациентов',
      subtitle: 'Мы ценим доверие каждого пациента и стремимся к превосходному результату',
      prevButton: 'Предыдущий отзыв',
      nextButton: 'Следующий отзыв'
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      subtitle: 'Ответы на самые популярные вопросы о лечении',
      items: [
        {
          question: 'Больно ли лечить зубы?',
          answer: 'Современная анестезия делает лечение абсолютно безболезненным. Мы используем качественные обезболивающие препараты последнего поколения, которые действуют быстро и эффективно. Во время процедуры вы не почувствуете дискомфорта — только легкое давление. При необходимости врач может усилить анестезию.'
        },
        {
          question: 'Сколько стоит лечение?',
          answer: 'Стоимость зависит от сложности случая и выбранных материалов. Простое лечение кариеса начинается от 3000 рублей, установка коронки — от 15000 рублей. На первичной консультации (бесплатной) врач проведет осмотр, сделает рентген и составит подробный план лечения с точной стоимостью каждого этапа. Мы не скрываем цены и не добавляем скрытых платежей. Возможна рассрочка.'
        },
        {
          question: 'Как часто нужно посещать стоматолога?',
          answer: 'Для профилактики рекомендуется посещать стоматолога каждые 6 месяцев. Регулярные осмотры позволяют выявить проблемы на ранней стадии, когда лечение проще и дешевле. Профессиональная чистка зубов (рекомендуется раз в полгода) удаляет налет и зубной камень, предотвращает кариес и заболевания десен. Это инвестиция в долгосрочное здоровье улыбки.'
        },
        {
          question: 'Даете ли вы гарантию на лечение?',
          answer: 'Да, мы предоставляем официальную гарантию на все виды работ: на пломбы — 1 год, на коронки и протезы — от 2 до 5 лет (в зависимости от материала), на имплантацию — до 10 лет. Гарантия действует при соблюдении рекомендаций врача и регулярных профилактических осмотрах. Все условия прописываются в договоре.'
        },
        {
          question: 'Можно ли записаться на срочный прием?',
          answer: 'Да, при острой боли мы стараемся принять пациента в день обращения — обычно в течение 2-3 часов. Позвоните нам по телефону +7 (XXX) XXX-XX-XX или напишите в WhatsApp/Telegram, опишите ситуацию, и администратор подберет ближайшее свободное окно. В экстренных случаях врач окажет первую помощь и снимет боль, а полное лечение можно будет продолжить в удобное время.'
        },
        {
          question: 'Какие методы оплаты вы принимаете?',
          answer: 'Мы принимаем наличные, банковские карты (Visa, MasterCard, Мир), переводы по QR-коду и безналичный расчет для юридических лиц. Также доступна рассрочка на 6-12 месяцев без процентов и переплат через наших партнеров. После лечения вы получите все необходимые документы для налогового вычета (возврат 13% от стоимости).'
        },
        {
          question: 'Нужно ли готовиться к первому визиту?',
          answer: 'Специальной подготовки не требуется. Желательно почистить зубы перед визитом и не есть за час до приема (особенно если планируется анестезия). Возьмите с собой паспорт, результаты предыдущих рентгеновских снимков (если есть) и список принимаемых лекарств или хронических заболеваний — это поможет врачу составить оптимальный план лечения.'
        }
      ]
    },
    contact: {
      title: '💬 Свяжитесь со мной',
      subtitle: 'Выберите удобный способ связи',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Быстрый ответ',
      telegram: 'Telegram',
      telegramDesc: 'Удобное общение',
      phone: 'Позвонить',
      address: 'Адрес',
      addressValue: 'Республика Северная Осетия — Алания, Владикавказ, Кырджалийская улица, 10к2',
      schedule: 'Часы работы',
      scheduleValue: 'Пн-Пт 09:00–19:00; Сб 09:00–14:00'
    },
    footer: {
      title: 'Стоматологическая клиника',
      addressLabel: 'Адрес',
      phoneLabel: 'Телефон',
      scheduleLabel: 'Часы работы',
      contactTitle: 'Контактная информация',
      mapTitle: 'Как нас найти',
      loading: 'Загрузка карты...',
      error: 'Не удалось загрузить карту',
      copyright: 'Стоматологическая клиника. Все права защищены.',
      privacyPolicy: 'Политика конфиденциальности',
      terms: 'Пользовательское соглашение'
    }
  },
  en: {
    hero: {
      title: 'Your smile is our care',
      subtitle: 'Professional dental care with a personal approach',
      cta: 'Book a consultation'
    },
    stats: {
      patients: 'Happy patients',
      experience: 'Years of experience',
      satisfaction: 'Satisfaction rate',
      services: 'Types of services'
    },
    beforeAfter: {
      title: 'Before & After',
      subtitle: 'Real results of our work',
      before: 'Before',
      after: 'After',
      hint: '👆 Drag the slider to see the difference'
    },
    doctor: {
      name: 'Zarina Vladimirovna Dzhatieva',
      specialization: 'Dentist',
      experience: 'Extensive experience',
      education: 'North Ossetian State Medical Academy',
      educationTitle: '📚 Education',
      specializationTitle: '💼 Specialization',
      aboutTitle: '✨ About the doctor',
      specialties: [
        'Therapeutic dentistry',
        'Aesthetic restoration',
        'Caries treatment',
        'Professional hygiene',
        'Teeth whitening'
      ],
      description: 'Individual approach to each patient. I use modern technologies and premium-class materials. Painless treatment and comfortable atmosphere.'
    },
    features: {
      title: 'What makes us special',
      subtitle: 'Our work is based on professionalism, modern technologies and care for each patient',
      items: [
        {
          title: 'Full range of services',
          description: 'From hygiene to implantation — we treat everything related to your smile'
        },
        {
          title: 'Premium materials',
          description: 'We use only proven European quality materials'
        },
        {
          title: 'Pain-free treatment',
          description: 'Modern anesthesia and gentle treatment techniques'
        },
        {
          title: 'Attention to detail',
          description: 'Individual approach and care for each patient'
        }
      ]
    },
    services: {
      title: 'Our services',
      subtitle: 'Full range of dental services for the health and beauty of your smile',
      items: [
        {
          title: 'Therapy',
          description: 'Treatment of teeth and gums, caries, restoration of damaged teeth'
        },
        {
          title: 'Surgery',
          description: 'Tooth extraction, implantation. No complications or long operations'
        },
        {
          title: 'Prosthetics',
          description: 'Tooth restoration with crowns, bridges or dentures'
        },
        {
          title: 'Orthodontics',
          description: 'Modern solutions for bite correction and teeth alignment'
        },
        {
          title: 'Hygiene',
          description: 'Professional teeth cleaning and comprehensive care'
        },
        {
          title: 'Whitening',
          description: 'Safe teeth whitening with modern methods'
        }
      ]
    },
    appointment: {
      title: '📅 Book an appointment',
      subtitle: 'Fill out the form and we will contact you to confirm your appointment',
      name: 'Your name',
      namePlaceholder: 'Enter your name',
      phone: 'Phone',
      phonePlaceholder: '+7 (___) ___-__-__',
      date: 'Date',
      time: 'Time',
      service: 'Service',
      servicePlaceholder: 'Select a service',
      comment: 'Comment',
      commentPlaceholder: 'Describe your request or preferences...',
      submit: 'Book an appointment',
      submitting: 'Sending...',
      required: '* Required fields',
      alertRequired: 'Please fill in all required fields',
      alertPhone: 'Please enter a valid phone number (11 digits)',
      success: {
        title: 'Request sent!',
        message: 'We will contact you shortly to confirm your appointment.'
      },
      serverWarning: 'Test mode: server is currently unavailable, the request will not be saved. You can call us or try again later.',
      services: [
        'Consultation',
        'Caries treatment',
        'Professional cleaning',
        'Whitening',
        'Aesthetic restoration',
        'Other'
      ]
    },
    reviews: {
      title: 'Our patients reviews',
      subtitle: 'We value the trust of each patient and strive for excellent results',
      prevButton: 'Previous review',
      nextButton: 'Next review'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most popular questions about treatment',
      items: [
        {
          question: 'Is dental treatment painful?',
          answer: 'Modern anesthesia makes treatment completely painless. We use high-quality anesthetics of the latest generation that work quickly and effectively. During the procedure, you will not feel any discomfort — just slight pressure. If necessary, the doctor can increase the anesthesia.'
        },
        {
          question: 'How much does treatment cost?',
          answer: 'The cost depends on the complexity of the case and chosen materials. Simple caries treatment starts from 3000 rubles, crown installation — from 15000 rubles. At the initial consultation (free), the doctor will conduct an examination, take an X-ray and create a detailed treatment plan with exact cost of each stage. We don\'t hide prices and don\'t add hidden fees. Installment plans are available.'
        },
        {
          question: 'How often should I visit the dentist?',
          answer: 'For prevention, it is recommended to visit the dentist every 6 months. Regular check-ups allow you to identify problems at an early stage, when treatment is simpler and cheaper. Professional teeth cleaning (recommended twice a year) removes plaque and tartar, prevents cavities and gum disease. This is an investment in long-term smile health.'
        },
        {
          question: 'Do you provide a warranty for treatment?',
          answer: 'Yes, we provide an official warranty for all types of work: for fillings — 1 year, for crowns and prosthetics — from 2 to 5 years (depending on the material), for implantation — up to 10 years. The warranty is valid if you follow the doctor\'s recommendations and regular preventive examinations. All conditions are specified in the contract.'
        },
        {
          question: 'Can I book an urgent appointment?',
          answer: 'Yes, in case of acute pain we try to see the patient on the day of the request — usually within 2-3 hours. Call us at +7 (XXX) XXX-XX-XX or write to WhatsApp/Telegram, describe the situation, and the administrator will find the nearest available slot. In emergency cases, the doctor will provide first aid and relieve pain, and full treatment can be continued at a convenient time.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept cash, bank cards (Visa, MasterCard, Mir), QR code transfers and non-cash payments for legal entities. Installment plans for 6-12 months without interest and overpayments through our partners are also available. After treatment, you will receive all necessary documents for tax deduction (13% refund of the cost).'
        },
        {
          question: 'Do I need to prepare for the first visit?',
          answer: 'No special preparation is required. It is advisable to brush your teeth before the visit and not eat an hour before the appointment (especially if anesthesia is planned). Bring your passport, results of previous X-rays (if available) and a list of medications or chronic diseases — this will help the doctor create an optimal treatment plan.'
        }
      ]
    },
    contact: {
      title: '💬 Contact me',
      subtitle: 'Choose a convenient way to contact',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Quick response',
      telegram: 'Telegram',
      telegramDesc: 'Convenient communication',
      phone: 'Call',
      address: 'Address',
      addressValue: 'Republic of North Ossetia — Alania, Vladikavkaz, Kyrdzhaliiskaya street, 10k2',
      schedule: 'Working hours',
      scheduleValue: 'Mon-Fri 09:00–19:00; Sat 09:00–14:00'
    },
    footer: {
      title: 'Dental Clinic',
      addressLabel: 'Address',
      phoneLabel: 'Phone',
      scheduleLabel: 'Working hours',
      contactTitle: 'Contact information',
      mapTitle: 'How to find us',
      loading: 'Loading map...',
      error: 'Failed to load map',
      copyright: 'Dental Clinic. All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms of Use'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  // Явно включаем глобальную инъекцию $t / $i18n в шаблонах
  globalInjection: true,
  // Стартовая локаль — сохранённая или ru по умолчанию
  locale: savedLocale || 'ru',
  fallbackLocale: 'ru',
  messages
})

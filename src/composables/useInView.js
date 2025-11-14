export function useInView(options = { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target
      if (entry.isIntersecting) {
        el.classList.add('is-visible')
        observer.unobserve(el)
      }
    })
  }, options)

  const observe = (el) => {
    if (!el) return
    el.classList.add('reveal')
    observer.observe(el)
  }

  const disconnect = () => observer.disconnect()

  return { observe, disconnect }
}

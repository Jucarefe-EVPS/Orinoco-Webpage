const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

async function verifyTurnstile(token, req) {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    console.warn('[orinoco-contact] TURNSTILE_SECRET_KEY is not configured; captcha verification skipped')
    return true
  }

  if (!token) return false

  const forwardedFor = req.headers['x-forwarded-for']
  const remoteip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim()
  const body = new URLSearchParams({
    secret,
    response: token,
  })

  if (remoteip) body.set('remoteip', remoteip)

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const result = await response.json()
    return Boolean(result.success)
  } catch (error) {
    console.error('[orinoco-contact] Turnstile verification failed', error)
    return false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = req.body || {}
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const company = String(body.company || '').trim()
  const message = String(body.message || '').trim()
  const website = String(body.website || '').trim()
  const turnstileToken = String(body.turnstileToken || '').trim()

  if (website) {
    return res.status(200).json({ ok: true })
  }

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email and message are required' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' })
  }

  const captchaOk = await verifyTurnstile(turnstileToken, req)
  if (!captchaOk) {
    return res.status(403).json({ ok: false, error: 'Captcha verification failed' })
  }

  const lead = {
    name,
    email,
    company,
    message,
    receivedAt: new Date().toISOString(),
  }

  console.info('[orinoco-contact-lead]', lead)
  return res.status(200).json({ ok: true })
}

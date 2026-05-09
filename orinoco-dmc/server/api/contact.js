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

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email and message are required' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' })
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

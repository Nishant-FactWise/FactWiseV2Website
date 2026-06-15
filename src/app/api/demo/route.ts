import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, company, email, phone, teamSize, role, challenge } = body;

  if (!name || !company || !email || !teamSize || !role) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? 'FactWise';

  if (!apiKey || !senderEmail) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
  }

  // ── Email to the user ──────────────────────────────────────────────────────
  const userEmail = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email, name }],
    subject: 'Your FactWise Demo is Confirmed',
    htmlContent: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:#3666ff;padding:32px 40px;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">FactWise</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">Source-to-Pay Platform</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1a1d2e;letter-spacing:-0.5px;">You're confirmed, ${name.split(' ')[0]}.</p>
            <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">Our solutions team will reach out within <strong style="color:#1a1d2e;">2 hours</strong> to schedule your personalised 30-minute demo.</p>

            <!-- Summary box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 16px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#94a3b8;">Your submission</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['Company', company],
                    ['Team size', teamSize],
                    ['Role', role],
                    ...(phone ? [['Phone', phone]] : []),
                    ...(challenge ? [['Challenge', challenge]] : []),
                  ].map(([label, value]) => `
                  <tr>
                    <td style="padding:6px 0;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;width:110px;">${label}</td>
                    <td style="padding:6px 0;font-size:13px;color:#1a1d2e;font-weight:500;">${value}</td>
                  </tr>`).join('')}
                </table>
              </td></tr>
            </table>

            <p style="margin:0 0 8px;font-size:14px;color:#64748b;line-height:1.6;">In the meantime, explore what we'll cover:</p>
            <ul style="margin:0 0 28px;padding-left:20px;color:#64748b;font-size:14px;line-height:2;">
              <li>Real-time RFQ &amp; multi-currency bidding</li>
              <li>Approval chains &amp; risk workflows</li>
              <li>Landed cost benchmarking</li>
              <li>End-to-end auditability</li>
            </ul>

            <a href="https://factwise.io" style="display:inline-block;background:#3666ff;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 28px;border-radius:8px;">Explore FactWise →</a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #f1f5f9;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">You're receiving this because you requested a demo at <a href="https://factwise.io/demo" style="color:#3666ff;text-decoration:none;">factwise.io/demo</a>. No credit card required.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };

  // ── Internal notification to FactWise team ────────────────────────────────
  const internalEmail = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: senderEmail, name: senderName }],
    subject: `New demo request — ${name} (${company})`,
    htmlContent: `
<html><body style="font-family:sans-serif;padding:24px;color:#1a1d2e;">
  <h2 style="margin:0 0 16px;font-size:18px;">New demo request</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:480px;">
    ${[
      ['Name', name],
      ['Email', email],
      ['Company', company],
      ['Team size', teamSize],
      ['Role', role],
      ['Phone', phone || '—'],
      ['Challenge', challenge || '—'],
    ].map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;width:120px;">${label}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:13px;color:#1a1d2e;">${value}</td>
    </tr>`).join('')}
  </table>
</body></html>`,
  };

  // ── Send both via Brevo API ───────────────────────────────────────────────
  const send = (payload: object) =>
    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

  const [userRes, internalRes] = await Promise.all([send(userEmail), send(internalEmail)]);

  if (!userRes.ok) {
    const err = await userRes.json();
    console.error('Brevo user email error:', err);
    return NextResponse.json({ error: 'Failed to send confirmation email.' }, { status: 500 });
  }

  if (!internalRes.ok) {
    // Log but don't fail the request — user email succeeded
    const err = await internalRes.json();
    console.error('Brevo internal email error:', err);
  }

  return NextResponse.json({ ok: true });
}

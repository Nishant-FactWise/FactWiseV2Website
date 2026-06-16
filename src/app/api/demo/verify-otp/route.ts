import { NextRequest, NextResponse } from 'next/server';
import { otpStore } from '../send-otp/route';

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: 'Missing email or code.' }, { status: 400 });
  }

  const record = otpStore.get(email.toLowerCase());

  if (!record) {
    return NextResponse.json({ error: 'No verification code found. Please request a new one.' }, { status: 400 });
  }

  if (Date.now() > record.expires) {
    otpStore.delete(email.toLowerCase());
    return NextResponse.json({ error: 'Verification code expired. Please request a new one.' }, { status: 400 });
  }

  if (record.otp !== otp.trim()) {
    return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 400 });
  }

  // OTP valid — clear it and send emails
  otpStore.delete(email.toLowerCase());

  const { name, company, phone, teamSize, role, challenge } = record.formData;

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? 'FactWise';

  if (!apiKey || !senderEmail) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
  }

  const send = (payload: object) =>
    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

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
        <tr>
          <td style="background:#3666ff;padding:32px 40px;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">FactWise</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">Source-to-Pay Platform</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1a1d2e;letter-spacing:-0.5px;">You're confirmed, ${name.split(' ')[0]}.</p>
            <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">Our solutions team will reach out within <strong style="color:#1a1d2e;">2 hours</strong> to schedule your personalised 30-minute demo.</p>

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
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #f1f5f9;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">You're receiving this because you requested a demo at <a href="https://factwise.io/demo" style="color:#3666ff;text-decoration:none;">factwise.io/demo</a>.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };

  const internalEmail = {
    sender: { name: senderName, email: senderEmail },
    to: [
      { email: 'stawan.kamani@factwise.io', name: 'Stawan Kamani' },
      { email: 'devanshi@factwise.io', name: 'Devanshi' },
      { email: 'info@factwise.io', name: 'Info' },
      { email: 'support@factwise.io', name: 'Support' }
    ],
    subject: `🔔 New demo request — ${name} · ${company}`,
    htmlContent: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a1d2e 0%,#2d3561 100%);padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">FactWise</p>
                  <p style="margin:3px 0 0;color:rgba(255,255,255,0.5);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">Internal Notification</p>
                </td>
                <td align="right">
                  <span style="display:inline-block;background:#3666ff;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 12px;border-radius:20px;">New Lead</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Title -->
        <tr>
          <td style="padding:32px 36px 8px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#1a1d2e;letter-spacing:-0.5px;">Demo request received</p>
            <p style="margin:6px 0 0;font-size:13px;color:#64748b;">A new lead has verified their email and requested a demo.</p>
          </td>
        </tr>
        <!-- Lead card -->
        <tr>
          <td style="padding:20px 36px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:16px 20px;background:#3666ff;">
                  <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">${name}</p>
                  <p style="margin:2px 0 0;font-size:12px;color:rgba(255,255,255,0.75);">${company}</p>
                </td>
              </tr>
              <tr><td style="padding:0 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['Email', `<a href="mailto:${email}" style="color:#3666ff;text-decoration:none;font-weight:600;">${email}</a>`],
                    ['Team size', teamSize],
                    ['Role', role],
                    ['Phone', phone || '—'],
                    ['Challenge', challenge || '—'],
                  ].map(([label, value], i, arr) => `
                  <tr>
                    <td style="padding:12px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;width:110px;${i < arr.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">${label}</td>
                    <td style="padding:12px 0;font-size:13px;color:#1a1d2e;font-weight:500;${i < arr.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">${value}</td>
                  </tr>`).join('')}
                </table>
              </td></tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #f1f5f9;background:#fafbfc;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">This is an internal notification from FactWise demo system.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };

  const [userRes, internalRes] = await Promise.all([send(userEmail), send(internalEmail)]);

  if (!userRes.ok) {
    const err = await userRes.json();
    console.error('Brevo confirmation email error:', err);
    return NextResponse.json({ error: err.message ?? 'Failed to send confirmation email.' }, { status: 500 });
  }

  if (!internalRes.ok) {
    const err = await internalRes.json();
    console.error('Brevo internal email error:', err);
  }

  return NextResponse.json({ ok: true });
}

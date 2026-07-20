import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, businessName, email, phone, message, enquiryType } = body;

  if (!name || !businessName || !email) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

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

  const firstName = name.split(' ')[0];
  const isPricing = enquiryType === 'pricing';
  const enquiryLabel = isPricing ? 'Pricing Automation' : 'API Integration';

  // ── Confirmation email to enquirer ───────────────────────────────────────
  const userEmail = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email, name }],
    subject: `Thank You for Reaching Out to FactWise`,
    htmlContent: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr>
          <td style="background:#3666ff;padding:32px 40px;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">FactWise</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">Supplier Engagement Platform</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1a1d2e;letter-spacing:-0.5px;">Thank you, ${firstName}!</p>
            <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
              We've received your interest in setting up <strong style="color:#1a1d2e;">${enquiryLabel}</strong> for
              <strong style="color:#1a1d2e;">${businessName}</strong> through FactWise.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;border:1px solid #c7d7fe;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:24px;">
                <p style="margin:0 0 10px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#3666ff;">What Happens Next</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['Within 24 hours', 'Our technical team will review your enquiry'],
                    ['Discovery call', 'We\'ll reach out to schedule a brief call to understand your setup'],
                    ['Custom proposal', 'We\'ll share a tailored integration plan for ' + enquiryLabel],
                  ].map(([step, detail], i, arr) => `
                  <tr>
                    <td style="padding:8px 0;${i < arr.length - 1 ? 'border-bottom:1px solid #dde8ff;' : ''}vertical-align:top;width:140px;">
                      <span style="font-size:11px;font-weight:700;color:#3666ff;">→ ${step}</span>
                    </td>
                    <td style="padding:8px 0;${i < arr.length - 1 ? 'border-bottom:1px solid #dde8ff;' : ''}">
                      <span style="font-size:12px;color:#64748b;">${detail}</span>
                    </td>
                  </tr>`).join('')}
                </table>
              </td></tr>
            </table>

            <p style="margin:0 0 28px;font-size:14px;color:#64748b;line-height:1.6;">
              In the meantime, feel free to explore how FactWise works for suppliers, or reach out to us directly at
              <a href="mailto:support@factwise.io" style="color:#3666ff;text-decoration:none;font-weight:600;">support@factwise.io</a>.
            </p>

            <a href="https://factwise.io/supplier" style="display:inline-block;background:#3666ff;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 28px;border-radius:8px;">Explore Supplier Features →</a>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #f1f5f9;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">FactWise · Supplier Engagement Platform</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };

  // ── Internal notification ─────────────────────────────────────────────────
  const internalEmail = {
    sender: { name: senderName, email: senderEmail },
    to: [
      { email: 'stawan.kamani@factwise.io', name: 'Stawan Kamani' },
      { email: 'devanshi@factwise.io', name: 'Devanshi' },
      { email: 'info@factwise.io', name: 'Info' },
      { email: 'support@factwise.io', name: 'Support' },
    ],
    subject: `⚡ New ${enquiryLabel} Enquiry — ${name} · ${businessName}`,
    htmlContent: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(135deg,#1a1d2e 0%,#2d3561 100%);padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td>
                <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">FactWise</p>
                <p style="margin:3px 0 0;color:rgba(255,255,255,0.5);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">Internal Notification</p>
              </td>
              <td align="right">
                <span style="display:inline-block;background:#f59e0b;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 12px;border-radius:20px;">${enquiryLabel}</span>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px 8px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#1a1d2e;">New ${enquiryLabel} enquiry</p>
            <p style="margin:6px 0 0;font-size:13px;color:#64748b;">A supplier has submitted an enquiry through the FactWise website.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:16px 20px;background:#f59e0b;">
                  <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">${name}</p>
                  <p style="margin:2px 0 0;font-size:12px;color:rgba(255,255,255,0.85);">${businessName}</p>
                </td>
              </tr>
              <tr><td style="padding:0 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['Email', `<a href="mailto:${email}" style="color:#3666ff;text-decoration:none;font-weight:600;">${email}</a>`],
                    ['Phone', phone || '—'],
                    ['Enquiry Type', enquiryLabel],
                    ['Message', message || '—'],
                  ].map(([label, value], i, arr) => `
                  <tr>
                    <td style="padding:12px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;width:130px;${i < arr.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">${label}</td>
                    <td style="padding:12px 0;font-size:13px;color:#1a1d2e;font-weight:500;${i < arr.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">${value}</td>
                  </tr>`).join('')}
                </table>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #f1f5f9;background:#fafbfc;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">FactWise Supplier Portal — Internal notification</p>
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
    console.error('Brevo enquiry email error:', err);
    return NextResponse.json({ error: 'Failed to send confirmation email.' }, { status: 500 });
  }

  if (!internalRes.ok) {
    const err = await internalRes.json();
    console.error('Brevo internal enquiry notification error:', err);
  }

  return NextResponse.json({ ok: true });
}

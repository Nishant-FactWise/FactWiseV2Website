import { NextRequest, NextResponse } from 'next/server';
import { supplierOtpStore } from '../send-otp/route';

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: 'Missing email or code.' }, { status: 400 });
  }

  const record = supplierOtpStore.get(email.toLowerCase());

  if (!record) {
    return NextResponse.json({ error: 'No verification code found. Please request a new one.' }, { status: 400 });
  }

  if (Date.now() > record.expires) {
    supplierOtpStore.delete(email.toLowerCase());
    return NextResponse.json({ error: 'Verification code expired. Please request a new one.' }, { status: 400 });
  }

  if (record.otp !== otp.trim()) {
    return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 400 });
  }

  supplierOtpStore.delete(email.toLowerCase());

  const { name, businessName, phone, city, businessType, teamSize, role, integrationMode } = record.formData;

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? 'FactWise';

  if (!apiKey || !senderEmail) {
    console.log('\n=============================================');
    console.log(`[DEMO MODE] Vendor ${name} successfully verified!`);
    console.log(`Payload captured:`, record.formData);
    console.log('=============================================\n');
    return NextResponse.json({ ok: true, demo: true });
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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://factwise.io';
  const detailsUrl = `${baseUrl}/supplier-onboarding/details?email=${encodeURIComponent(email)}&company=${encodeURIComponent(businessName)}&name=${encodeURIComponent(name)}`;

  // ── Welcome email to vendor ──────────────────────────────────────────────
  const userEmail = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email, name }],
    subject: 'Welcome to FactWise — Complete Your Vendor Registration',
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
            <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1a1d2e;letter-spacing:-0.5px;">Welcome aboard, ${firstName}! 🎉</p>
            <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
              Thank you for registering <strong style="color:#1a1d2e;">${businessName}</strong> on the FactWise Supplier Network.
              We're thrilled to have you with us.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;border:1px solid #c7d7fe;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:28px;text-align:center;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#3666ff;">Action Required — Complete Your Onboarding</p>
                <p style="margin:0 0 20px;font-size:14px;color:#1a1d2e;line-height:1.6;">
                  To activate your vendor account, please click the button below and fill in your basic profile details:
                </p>
                
                <div>
                  <a href="${detailsUrl}" style="display:inline-block;background:#3666ff;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;box-shadow:0 4px 14px rgba(54,102,255,0.3);">Complete Vendor Profile →</a>
                </div>
              </td></tr>
            </table>

            <p style="margin:0 0 8px;font-size:14px;color:#64748b;line-height:1.6;">
              Our onboarding team will verify your details and <strong style="color:#1a1d2e;">activate your account within 2 business days</strong>.
              Once activated, you'll be able to:
            </p>
            <ul style="margin:0 0 24px;padding-left:20px;color:#64748b;font-size:14px;line-height:2;">
              <li>Receive and respond to RFQs directly from buyers</li>
              <li>Upload invoices and track payment status</li>
              <li>Build and publish your item catalogue</li>
              <li>Set up AI-powered auto-response for quotes</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #f1f5f9;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">
              Questions? Reach us at <a href="mailto:support@factwise.io" style="color:#3666ff;text-decoration:none;">support@factwise.io</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };

  // ── Internal notification to FactWise team ───────────────────────────────
  const internalEmail = {
    sender: { name: senderName, email: senderEmail },
    to: [
      { email: 'stawan.kamani@factwise.io', name: 'Stawan Kamani' },
      { email: 'devanshi@factwise.io', name: 'Devanshi' },
      { email: 'info@factwise.io', name: 'Info' },
      { email: 'support@factwise.io', name: 'Support' },
    ],
    subject: `🆕 New Vendor Sign-Up — ${name} · ${businessName}`,
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
                <span style="display:inline-block;background:#10b981;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 12px;border-radius:20px;">New Vendor</span>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px 8px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#1a1d2e;">New vendor registration</p>
            <p style="margin:6px 0 0;font-size:13px;color:#64748b;">A vendor has verified their email and completed sign-up.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:16px 20px;background:#10b981;">
                  <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">${name}</p>
                  <p style="margin:2px 0 0;font-size:12px;color:rgba(255,255,255,0.8);">${businessName}</p>
                </td>
              </tr>
              <tr><td style="padding:0 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['Email', `<a href="mailto:${email}" style="color:#3666ff;text-decoration:none;font-weight:600;">${email}</a>`],
                    ['Phone', phone || '—'],
                    ['Integration', integrationMode || '—'],
                    ['Team Size', teamSize || '—'],
                    ['Role', role || '—'],
                    ['City / State', city || '—'],
                    ['Business Type', businessType || '—'],
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
    console.error('Brevo vendor welcome email error:', err);
    return NextResponse.json({ error: 'Failed to send confirmation email.' }, { status: 500 });
  }

  if (!internalRes.ok) {
    const err = await internalRes.json();
    console.error('Brevo internal vendor notification error:', err);
  }

  return NextResponse.json({ ok: true });
}

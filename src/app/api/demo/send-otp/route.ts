import { NextRequest, NextResponse } from 'next/server';

type OtpEntry = { otp: string; expires: number; formData: Record<string, string> };

// Survive Next.js dev-mode hot reloads by pinning to global
declare global { var _otpStore: Map<string, OtpEntry> | undefined; }
export const otpStore: Map<string, OtpEntry> = global._otpStore ?? (global._otpStore = new Map());

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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

  const otp = generateOtp();
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(email.toLowerCase(), {
    otp,
    expires,
    formData: { name, company, email, phone: phone ?? '', teamSize, role, challenge: challenge ?? '' },
  });

  const firstName = name.split(' ')[0];

  const otpEmail = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email, name }],
    subject: `${otp} is your FactWise verification code`,
    htmlContent: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr>
          <td style="background:#3666ff;padding:28px 40px;">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">FactWise</p>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Email Verification</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:#1a1d2e;">Hi ${firstName},</p>
            <p style="margin:0 0 28px;font-size:14px;color:#64748b;line-height:1.6;">Use the code below to verify your email and confirm your demo request.</p>

            <div style="text-align:center;margin:32px 0;">
              <div style="display:inline-block;background:#f0f4ff;border:1.5px solid #c7d7fe;border-radius:12px;padding:20px 40px;">
                <p style="margin:0;font-size:36px;font-weight:800;letter-spacing:0.18em;color:#3666ff;font-family:monospace;">${otp}</p>
              </div>
              <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">Expires in 10 minutes</p>
            </div>

            <p style="margin:28px 0 0;font-size:12px;color:#94a3b8;line-height:1.6;">If you didn't request a FactWise demo, you can safely ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #f1f5f9;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">FactWise · Source-to-Pay Platform</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(otpEmail),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error('Brevo OTP email error:', err);
    return NextResponse.json({ error: err.message ?? 'Failed to send verification code.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

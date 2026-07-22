import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, gstin, customerName, address } = await req.json();

    if (!email || !gstin || !company || !customerName || !address) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (GST/Tax ID, Customer Name, and Address).' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME ?? 'FactWise';

    if (!apiKey || !senderEmail) {
      console.log('\n=============================================');
      console.log(`[DEMO MODE] Vendor Details Submitted for ${name} (${company})!`);
      console.log(`GST/Tax ID: ${gstin}`);
      console.log(`Customer working with FactWise: ${customerName}`);
      console.log(`Company Legal Address: ${address}`);
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

    // ── Internal Notification Email to FactWise Team ──────────────────────
    const internalEmail = {
      sender: { name: senderName, email: senderEmail },
      to: [
        { email: 'stawan.kamani@factwise.io', name: 'Stawan Kamani' },
        { email: 'devanshi@factwise.io', name: 'Devanshi' },
        { email: 'info@factwise.io', name: 'Info' },
        { email: 'support@factwise.io', name: 'Support' },
      ],
      subject: `📋 Completed Vendor Profile — ${company || name} (${gstin})`,
      htmlContent: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(135deg,#1a1d2e 0%,#2d3561 100%);padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td>
                <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">FactWise</p>
                <p style="margin:3px 0 0;color:rgba(255,255,255,0.5);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">Supplier Onboarding Submission</p>
              </td>
              <td align="right">
                <span style="display:inline-block;background:#3666ff;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 12px;border-radius:20px;">Details Submitted</span>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px 8px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#1a1d2e;">Vendor Profile Details Received</p>
            <p style="margin:6px 0 0;font-size:13px;color:#64748b;">The vendor has completed their tax ID, customer association, and legal address details.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:16px 20px;background:#3666ff;">
                  <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;">${company || name}</p>
                  <p style="margin:2px 0 0;font-size:12px;color:rgba(255,255,255,0.85);">${name} &bull; ${email}</p>
                </td>
              </tr>
              <tr><td style="padding:0 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['Vendor Company', company || '—'],
                    ['Contact Person', name || '—'],
                    ['User Email', `<a href="mailto:${email}" style="color:#3666ff;text-decoration:none;font-weight:600;">${email}</a>`],
                    ['GST / Tax ID', gstin],
                    ['Customer working with FactWise', customerName],
                    ['Company Legal Address', address],
                  ].map(([label, value], i, arr) => `
                  <tr>
                    <td style="padding:12px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;width:180px;${i < arr.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">${label}</td>
                    <td style="padding:12px 0;font-size:13px;color:#1a1d2e;font-weight:500;${i < arr.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">${value}</td>
                  </tr>`).join('')}
                </table>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #f1f5f9;background:#fafbfc;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">FactWise Supplier Onboarding &bull; Internal notification</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    };

    // ── Confirmation Email to Vendor ─────────────────────────────────────
    const vendorEmail = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email, name }],
      subject: 'FactWise — Your Onboarding Details Have Been Received',
      htmlContent: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr>
          <td style="background:#3666ff;padding:28px 36px;">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">FactWise</p>
            <p style="margin:3px 0 0;color:rgba(255,255,255,0.8);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Supplier Onboarding</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px;">
            <p style="margin:0 0 12px;font-size:22px;font-weight:700;color:#1a1d2e;">Details Received Successfully! ✅</p>
            <p style="margin:0 0 20px;font-size:14px;color:#64748b;line-height:1.6;">
              Thank you, <strong>${name}</strong>. We have received your profile details for <strong>${company || 'your business'}</strong>.
            </p>
            <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.6;">
              Our onboarding team is reviewing your tax ID (<code>${gstin}</code>) and customer association. Your vendor account will be fully activated within 1 to 2 business days.
            </p>
            <a href="https://factwise.io/supplier" style="display:inline-block;background:#3666ff;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;">Explore FactWise Supplier Network →</a>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #f1f5f9;background:#fafbfc;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">Questions? Email support@factwise.io</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    };

    const [internalRes, vendorRes] = await Promise.all([
      send(internalEmail),
      send(vendorEmail),
    ]);

    if (!internalRes.ok) {
      const err = await internalRes.json();
      console.error('Brevo internal vendor submission email error:', err);
    }
    if (!vendorRes.ok) {
      const err = await vendorRes.json();
      console.error('Brevo vendor confirmation email error:', err);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Error in complete-profile route:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

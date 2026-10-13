import { BUSINESS_PHONE, CLAIMS } from '@/lib/site';

// Shared sign-off for every customer email (quote + discount code).
// Logo is a self-contained dark tile so it reads the same in light and dark mode.
export function emailSignature(reason: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-top:1px solid #E6E0D6;padding-top:20px;width:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <tr><td style="padding-top:20px;">
    <div style="font-size:14px;font-weight:700;letter-spacing:3px;color:#6B6357;">DANIEL VIEIRA</div>
    <div style="font-size:13px;color:#6B6357;margin-top:2px;">Owner, New Design Pro</div>
    <div style="font-size:14px;line-height:1.6;color:#6B6357;margin-top:8px;">
      M: <a href="tel:${BUSINESS_PHONE.e164}" style="color:#6B6357;text-decoration:none;">${BUSINESS_PHONE.display}</a><br>
      <a href="mailto:contact@newdesignpro.com" style="color:#E85D2F;text-decoration:underline;">contact@newdesignpro.com</a><br>
      <a href="https://www.newdesignpro.com" style="color:#6B6357;text-decoration:underline;">newdesignpro.com</a>
    </div>
    <a href="https://www.newdesignpro.com" style="display:inline-block;margin-top:14px;text-decoration:none;">
      <img src="https://www.newdesignpro.com/assets/email-signature-logo.png" width="230" height="67" alt="New Design Pro" style="display:block;width:230px;height:auto;border:0;">
    </a>
    <div style="font-size:12px;color:#6B6357;margin-top:8px;">LVP Flooring &amp; Remodeling · Central Florida</div>
    <div style="font-size:11px;line-height:1.6;color:#9A9285;margin-top:14px;">
      <strong>Insured.</strong> ${CLAIMS.insuranceNote} Work coordinated with licensed trade partners where required.<br>
      ${reason}
    </div>
  </td></tr>
</table>`;
}

export function textSignature(): string {
  return [
    '--',
    'DANIEL VIEIRA',
    'Owner, New Design Pro',
    `M: ${BUSINESS_PHONE.display}`,
    'contact@newdesignpro.com',
    'newdesignpro.com',
  ].join('\n');
}

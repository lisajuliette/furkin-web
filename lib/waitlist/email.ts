import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { waitlist } from '@/content/en';

const fromAddress = process.env.WAITLIST_FROM_EMAIL || 'Furkin <hello@furkin.app>';
const mailFile = path.join(process.cwd(), '.data', 'waitlist-mail.log');

export async function sendConfirmation(email: string, url: string) {
  const subject = waitlist.emailSubject;
  const text = waitlist.emailBody.replace('{url}', url);
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    await mkdir(path.dirname(mailFile), { recursive: true });
    await appendFile(mailFile, `${new Date().toISOString()}\t${email}\t${url}\n`);
    return;
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ from: fromAddress, to: [email], subject, text }),
  });
  if (!response.ok) throw new Error('Confirmation email was not sent');
}

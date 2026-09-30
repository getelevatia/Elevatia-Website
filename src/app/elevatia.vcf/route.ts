import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Elevatia's contact card, with the bronze mark as the photo.
 *
 * Sky sends this URL as an attachment on the first exchange, so the person
 * can save the number and the thread stops being from an unknown sender.
 * Built on request from the same number the site uses, so the number lives
 * in one environment variable and nowhere in the repo. Sendblue requires
 * the URL to end in .vcf, hence a route named for the file.
 */
export const dynamic = 'force-static';

export async function GET() {
  const number = process.env.NEXT_PUBLIC_ELEVATIA_TEXT_NUMBER ?? '';
  let photo = '';
  try {
    const jpg = await readFile(join(process.cwd(), 'public', 'elevatia-contact.jpg'));
    photo = jpg.toString('base64');
  } catch {
    photo = '';
  }
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:;Elevatia;;;',
    'FN:Elevatia',
    'ORG:Elevatia',
    ...(number ? [`TEL;TYPE=CELL,VOICE:${number}`] : []),
    'URL:https://getelevatia.com',
    'EMAIL;TYPE=INTERNET:support@getelevatia.com',
    'NOTE:Sky, your coach. Text any time. Reply STOP to pause.',
    ...(photo ? [`PHOTO;ENCODING=b;TYPE=JPEG:${photo}`] : []),
    'END:VCARD',
  ];
  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'inline; filename="elevatia.vcf"',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

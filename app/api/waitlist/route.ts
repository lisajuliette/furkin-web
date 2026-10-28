import { submitWaitlist } from '@/lib/waitlist/submit';

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ status: 'invalid' }, { status: 400 });
  }
  const result = await submitWaitlist(request, form);
  const status = result.status === 'limited' ? 429 : result.status === 'invalid' ? 400 : 200;
  return Response.json(result, { status });
}

import { assetLinks } from '@/lib/associations';

export function GET() {
  return Response.json(assetLinks());
}

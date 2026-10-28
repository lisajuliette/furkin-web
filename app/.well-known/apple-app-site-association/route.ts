import { appleAppSiteAssociation } from '@/lib/associations';

export function GET() {
  return Response.json(appleAppSiteAssociation());
}

import { redirect } from 'next/navigation';
import { getLongUrl } from '../short';

export default async function ShortLinkRedirect({
  params,
}: {
  params: { id: string };
}) {
  const longUrl = await getLongUrl(params.id);

  if (longUrl) {
    redirect(longUrl);
  }

  return <div>Invalid short link</div>;
}

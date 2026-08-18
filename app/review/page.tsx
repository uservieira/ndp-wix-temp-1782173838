import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leave a Review — New Design Pro',
  description: 'Redirecting to our Google review page. Thanks for supporting New Design Pro.',
  robots: { index: false, follow: false },
};

export default function Page() {
  redirect('https://search.google.com/local/writereview?placeid=ChIJ04pkC9peBq8RQI3Z0T1XETk');
}

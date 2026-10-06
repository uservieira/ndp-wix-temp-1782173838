import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/review' },
  title: 'Leave a Google Review',
  description:
    'Redirecting you to our Google review page. Thank you for taking a minute to share how your LVP or tile project went. It helps your neighbors choose well.',
  robots: { index: false, follow: false },
};

export default function Page() {
  redirect('https://search.google.com/local/writereview?placeid=ChIJ04pkC9peBq8RQI3Z0T1XETk');
}

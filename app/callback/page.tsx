import type { Metadata } from 'next';
import CallbackForm from '@/components/CallbackForm';

export const metadata: Metadata = {
  alternates: { canonical: '/callback' },
  title: 'Book the free measure — New Design Pro',
  description: 'Leave your phone and Daniel will call within the hour to schedule your free in-home measure.',
  robots: { index: false, follow: true },
};

export default async function CallbackPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const params = await searchParams;
  const ref = params.ref || '';

  return (
    <main className="callback-page">
      <div className="callback-inner">
        <header className="callback-header">
          <a href="/" className="callback-back">← Home</a>
        </header>

        <div className="callback-body">
          <h1>Book the measure — Daniel calls in under an hour.</h1>
          <p className="callback-sub">
            Drop your phone and preferred time. Daniel personally calls back — no phone-tree, no assistant, no chasing.
          </p>

          <CallbackForm reference={ref} />
        </div>
      </div>
    </main>
  );
}

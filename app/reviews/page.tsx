import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Google Reviews from Central Florida Homeowners',
  description:
    'Read real Google reviews from Central Florida homeowners who hired New Design Pro for LVP flooring and tile work, then leave your own review after your job.',
  alternates: { canonical: '/reviews' },
};

const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJ04pkC9peBq8RQI3Z0T1XETk';
const GOOGLE_PROFILE_URL =
  'https://maps.google.com/maps?cid=4112163857791290688';

export default function ReviewsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-900">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
        Reviews
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        What our customers say
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        New Design Pro is a Central Florida flooring and remodeling company
        serving Davenport, Kissimmee, Winter Haven, Haines City, and surrounding
        communities. We believe honest reviews are worth more than paid ads, so
        we ask every customer to leave one after their project.
      </p>

      <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold">Google Business Profile</h2>
        <p className="mt-2 text-slate-600">
          We are actively building our public review history on Google. If
          you&apos;ve worked with us and were happy with the results, we would
          be grateful if you shared a review.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={GOOGLE_REVIEW_URL}
            className="inline-flex items-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Leave a Google Review
          </a>
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            View Google Profile
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold">Why homeowners choose us</h2>
        <ul className="mt-4 space-y-3 text-slate-700">
          <li className="flex gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-teal-700" />
            <span>
              <strong>10+ years of installation experience</strong> across LVP,
              tile, and full-room remodels in Polk, Orange, and Osceola counties.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-teal-700" />
            <span>
              <strong>Insured crew.</strong> Every job carries general liability
              coverage. Proof provided on request before work begins.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-teal-700" />
            <span>
              <strong>Written scope and price up front.</strong> No day-of
              surprises. You approve materials, labor, and timeline before
              anything starts.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-teal-700" />
            <span>
              <strong>Photo record of every job.</strong> Before, during, and
              after photos are shared so you can see the craftsmanship.
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-semibold">Have a project in mind?</h2>
        <p className="mt-2 text-slate-600">
          Tell us about your space and get a written quote. Most quotes are
          returned within 24 hours.
        </p>
        <Link
          href="/form"
          className="mt-4 inline-flex items-center rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Request a Free Quote
        </Link>
      </section>

      <p className="mt-10 text-xs text-slate-500">
        New Design Pro is a Central Florida flooring and remodeling contractor.
        Reviews on this page and our Google Business Profile are collected from
        real customers and are unedited.
      </p>
    </main>
  );
}

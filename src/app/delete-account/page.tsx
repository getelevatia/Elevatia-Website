import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete your account',
};

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-night text-night-text pt-16">
      <section className="section-padding">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-night-text">
            Delete your Elevatia account
          </h1>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="card-night p-6 sm:p-8">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">How to delete your account</h2>
                <p className="text-night-text-secondary mb-4">
                  <strong className="text-night-text">In the app:</strong> go to Settings, then Delete account. Deletion is immediate.
                </p>
                <p className="text-night-text-secondary mb-4">
                  <strong className="text-night-text">Without the app:</strong> email us from the
                  email address or phone number on the account, with the subject &quot;Delete my account&quot;.
                </p>
                <p className="mb-4">
                  <a
                    href="mailto:notifications@getelevatia.com?subject=Delete%20my%20account"
                    className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-night bg-bronze rounded-full hover:bg-bronze-bright transition-colors"
                  >
                    Email notifications@getelevatia.com to delete your account
                  </a>
                </p>
                <p className="text-night-text-secondary">
                  We will confirm your request, and we may ask you to verify that you own the
                  account before we delete it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">What is deleted</h2>
                <p className="text-night-text-secondary">
                  Deleting your account removes your profile, paths and progress, activity history,
                  friendships and Crucible records, all synced and manually entered health data,
                  biomarker readings, imported clinical records, your cycle logs and everything in
                  them, your due date, your declared conditions and quiz answers, and your stored
                  connections to Whoop, Oura, Garmin and Eight Sleep. Deletion cannot be undone.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">What is kept</h2>
                <p className="text-night-text-secondary">
                  A small amount of data may be retained after deletion where the law requires it,
                  for example records of payments and transactions. This never includes health data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">How long it takes</h2>
                <p className="text-night-text-secondary">
                  Deleting your account in the app is immediate. Requests made by email are
                  completed within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Subscriptions</h2>
                <p className="text-night-text-secondary">
                  Deleting your account does not cancel a subscription. Cancel your subscription in
                  the App Store on iPhone, or in Google Play on Android.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

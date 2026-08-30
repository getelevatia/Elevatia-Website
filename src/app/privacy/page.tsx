export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-night text-night-text pt-16">
      <section className="section-padding">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-night-text">
            Privacy Policy
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="card-night p-6 sm:p-8">
              <p className="text-sm text-night-text-muted mb-6">Last updated: August 30, 2026</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Introduction</h2>
                <p className="text-night-text-secondary leading-relaxed">
                  Elevatia (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3 text-night-text">Personal Information</h3>
                <ul className="list-disc list-inside text-night-text-secondary mb-6 space-y-1">
                  <li>Name, email address, and profile information</li>
                  <li>User account credentials and authentication data</li>
                  <li>Device information and identifiers</li>
                  <li>Usage data and app analytics</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-night-text">Health Data</h3>
                <p className="text-night-text-secondary mb-4">
                  We collect health-related information to provide personalized wellness insights and track your progress. This includes:
                </p>
                <ul className="list-disc list-inside text-night-text-secondary mb-6 space-y-1">
                  <li>Health metrics from your device (HealthKit on iOS, Google Fit on Android)</li>
                  <li>Activity data (steps, workouts, sleep patterns)</li>
                  <li>Wellness goals and preferences</li>
                  <li>Progress tracking and achievement data</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-night-text">Third-Party Health Data Integrations</h3>
                <p className="text-night-text-secondary mb-4">
                  With your explicit consent, we may collect health data from third-party services including:
                </p>
                <ul className="list-disc list-inside text-night-text-secondary mb-4 space-y-1">
                  <li><strong>WHOOP</strong>: Recovery, strain, sleep, and heart rate variability data</li>
                  <li><strong>Oura Ring</strong>: Sleep quality, readiness, activity, and temperature data</li>
                  <li><strong>Eight Sleep</strong>: Sleep tracking, temperature preferences, and sleep environment data</li>
                  <li><strong>Apple HealthKit</strong>: Comprehensive health and fitness data from your iPhone</li>
                  <li><strong>Google Fit</strong>: Activity and health data from Android devices</li>
                </ul>
                <p className="text-night-text-secondary">
                  You can revoke access to any third-party service at any time through your device settings or the respective service&apos;s privacy controls.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-night-text">Clinical Health Records (iOS only)</h3>
                <p className="text-night-text-secondary mb-4">
                  If your doctor, hospital, or lab is connected to Apple Health, you may choose to import clinical records into Elevatia. This is off by default and never happens automatically.
                </p>
                <ul className="list-disc list-inside text-night-text-secondary mb-4 space-y-1">
                  <li><strong>What we request</strong>: lab results and vital signs only. We do not request medications, conditions, procedures, allergies, immunizations, or insurance coverage.</li>
                  <li><strong>What we keep</strong>: of the records Apple Health returns, only glucose, HbA1c, total cholesterol, HDL, LDL, triglycerides, and blood pressure. Everything else is discarded on your device and never transmitted to us.</li>
                  <li><strong>When we read</strong>: only when you tap Import, covering the previous two years. There is no background delivery and no schedule.</li>
                  <li><strong>What we do with it</strong>: readings are charted alongside ones you enter yourself and may influence which daily tasks you are offered. Elevatia does not interpret, score, or diagnose them. They are never used for advertising, never sold, and never sent to a third party. Where our AI coach is involved it receives only a coarse direction derived from a reading &mdash; for example &quot;blood sugar elevated&quot; &mdash; never the measurement itself.</li>
                  <li><strong>Turning it off</strong>: the Health Records screen withdraws your permission and deletes every imported reading, keeping the ones you entered yourself.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-night-text">Cycle, Reproductive and Pregnancy Data</h3>
                <p className="text-night-text-secondary mb-4">
                  If you use cycle tracking, everything below is entered by you, is optional, and can be removed one day at a time or all at once.
                </p>
                <ul className="list-disc list-inside text-night-text-secondary mb-4 space-y-1">
                  <li><strong>What you can log</strong>: period flow, whether a day starts a period, symptoms, mood, energy, basal body temperature, ovulation test results, cervical mucus quality, free-text notes, and sexual activity.</li>
                  <li><strong>What we ask once</strong>: during setup we ask whether you have a menstrual cycle. You may answer &quot;prefer not to say&quot;, which is treated as a decline and not as a &quot;no&quot;.</li>
                  <li><strong>What you may declare</strong>: hormonal conditions such as PCOS, endometriosis, a thyroid condition, perimenopause, menopause, or adrenal fatigue. These make relevant content <em>more</em> likely to be offered. They never restrict what you are shown.</li>
                  <li><strong>Pregnancy</strong>: if you give a due date we store it and derive your week and trimester from it each day. Nothing about a pregnancy is inferred without a date you entered.</li>
                  <li><strong>What we derive</strong>: an estimated cycle phase, typical length, variability, next period and fertile window. These are estimates from your own entries, not measurements.</li>
                  <li><strong>Where it lives</strong>: in a part of your account only your own signed-in session can read. It is not on the profile document friend search can reach, and no other Elevatia user can read it.</li>
                  <li><strong>Never shared in-app</strong>: cycle data never appears in the activity feed, in Crucible, on a share card, or to a friend. <strong>Sexual activity is never shown anywhere outside the day you logged it, and is never included in anything sent to an AI model.</strong></li>
                  <li><strong>Apple Health</strong>: if you choose to import, we read menstrual flow, basal body temperature, ovulation test results, cervical mucus quality, and &mdash; on a supported Apple Watch &mdash; sleeping wrist temperature. Only when you tap it, never in the background, and entries you made in Elevatia are never overwritten.</li>
                </ul>
                <p className="text-night-text-secondary mb-4">
                  <strong>What this is not</strong>: Elevatia is not a medical device and none of this is contraception. A fertile window derived from your logs is not a reliable way to avoid pregnancy, and the app never describes any day as safe for unprotected sex.
                </p>
                <p className="text-night-text-secondary">
                  Reproductive and sexual health information is treated as sensitive personal data. Depending on where you live it may carry additional protections, including as &quot;special category&quot; data under the GDPR and under US state laws covering consumer health data. We do not sell it, do not use it for advertising, and do not disclose it to third parties for their own purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">How We Use Your Information</h2>
                <ul className="list-disc list-inside text-night-text-secondary space-y-1">
                  <li>To provide and maintain our wellness coaching service</li>
                  <li>To generate personalized health insights and recommendations</li>
                  <li>To track your progress and achievements</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To provide customer support and respond to inquiries</li>
                  <li>To improve our algorithms and service quality</li>
                  <li>To send you relevant wellness tips and updates (with your consent)</li>
                  <li>To ensure app security and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Data Sharing and Disclosure</h2>
                <p className="text-night-text-secondary mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-night-text-secondary space-y-1">
                  <li><strong>With your consent</strong>: When you explicitly authorize us to share data</li>
                  <li><strong>Service providers</strong>: With trusted third-party services that help us operate our app (Firebase, analytics providers)</li>
                  <li><strong>Legal requirements</strong>: When required by law, court order, or government request</li>
                  <li><strong>Safety purposes</strong>: To protect the rights, property, or safety of Elevatia, our users, or others</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Data Storage and Security</h2>
                <ul className="list-disc list-inside text-night-text-secondary space-y-1">
                  <li>Your data is stored securely using Firebase and Google Cloud Platform</li>
                  <li>All data transmission is encrypted using industry-standard TLS encryption</li>
                  <li>Data is encrypted at rest using AES-256 encryption</li>
                  <li>We implement multi-factor authentication and access controls</li>
                  <li>Regular security audits and monitoring are performed</li>
                  <li>Health data is stored in compliance with HIPAA security standards where applicable</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Data Retention</h2>
                <ul className="list-disc list-inside text-night-text-secondary space-y-1">
                  <li>Personal and health data is retained for as long as your account is active. Health history is kept rather than aged out, so that trends stay meaningful over years rather than months.</li>
                  <li><strong>Deleting your account deletes your data.</strong> It removes your profile, paths and progress, activity history, friendships and Crucible records, all synced and manually entered health data, biomarker readings, imported clinical records, your cycle logs and everything in them, your due date, your declared conditions and quiz answers, and your stored connections to Whoop, Oura, Garmin and Eight Sleep. Deletion is immediate and cannot be undone.</li>
                  <li>You can delete imported clinical records on their own, delete a single day of cycle data, or clear your due date, at any time without deleting anything else.</li>
                  <li>A small amount of data may be retained after deletion where the law requires it &mdash; for example records of payments. This never includes health data.</li>
                  <li>To request deletion by email instead, contact support@elevatia.app.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Your Rights</h2>
                <p className="text-night-text-secondary mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-night-text-secondary space-y-1">
                  <li>Access your personal data and request a copy</li>
                  <li>Correct or update your personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data (data portability)</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Disconnect third-party health data integrations</li>
                </ul>
                <p className="text-night-text-secondary mt-4">
                  To exercise these rights, please contact us at zackh@getelevatia.com.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">International Data Transfers</h2>
                <p className="text-night-text-secondary">
                  Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Children&apos;s Privacy</h2>
                <p className="text-night-text-secondary">
                  Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Changes to This Privacy Policy</h2>
                <p className="text-night-text-secondary mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by:
                </p>
                <ul className="list-disc list-inside text-night-text-secondary space-y-1">
                  <li>Posting the new Privacy Policy on this page</li>
                  <li>Sending you an email notification</li>
                  <li>Displaying a prominent notice in our app</li>
                </ul>
                <p className="text-night-text-secondary mt-4">
                  Continued use of our service after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Contact Us</h2>
                <p className="text-night-text-secondary mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <ul className="list-disc list-inside text-night-text-secondary space-y-1">
                  <li>Email: zackh@getelevatia.com</li>
                  <li>Website: https://getelevatia.com</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-night-text">Compliance</h2>
                <p className="text-night-text-secondary mb-4">This Privacy Policy complies with:</p>
                <ul className="list-disc list-inside text-night-text-secondary space-y-1">
                  <li>General Data Protection Regulation (GDPR)</li>
                  <li>California Consumer Privacy Act (CCPA)</li>
                  <li>Health Insurance Portability and Accountability Act (HIPAA) where applicable</li>
                  <li>Apple App Store and Google Play Store privacy requirements</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
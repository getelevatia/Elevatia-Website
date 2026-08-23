import Eyebrow from './Eyebrow';

const STATS = [
  { number: '1,700+', label: 'Active Users', description: 'Building better habits daily' },
  { number: '10K+', label: 'Goals Achieved', description: 'Milestones reached and celebrated' },
  { number: '77%', label: 'Success Rate', description: 'Active members achieving their goals' },
  { number: '5★', label: 'App Store Rating', description: 'Loved by our community' },
];

export default function StatsBand() {
  return (
    <section className="section-padding relative bg-night-elevated">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">It works.</h2>
            <p className="mt-5 text-lg text-night-text-secondary">
              We measure success by Sows grown into fruit: goals achieved day
              over day, month over month.
            </p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-4 text-center">
                <div className="text-4xl font-bold text-gradient-bronze sm:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-2 font-semibold text-night-text">{stat.label}</div>
                <div className="mt-1 text-sm text-night-text-muted">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

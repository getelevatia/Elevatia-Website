interface Quote {
  quote: string;
  name: string;
  detail?: string;
}

/*
 * FOUNDER: add real member quotes here. The section stays out of the DOM
 * until this array has entries. Example shape:
 * { quote: 'Elevatia changed my mornings.', name: 'Jordan M.', detail: 'Member since 2025' }
 */
const QUOTES: Quote[] = [];

export default function TestimonialMarquee() {
  if (QUOTES.length === 0) return null;

  const track = [...QUOTES, ...QUOTES];

  return (
    <section className="section-padding relative overflow-x-clip">
      <div className="container mb-12 text-center">
        <p className="eyebrow">From our members</p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          Real people, real harvests.
        </h2>
      </div>
      <div className="marquee relative">
        <div className="marquee-track flex w-max gap-6 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
          {track.map((q, i) => (
            <figure
              key={i}
              aria-hidden={i >= QUOTES.length}
              className="card-night w-[320px] shrink-0 p-6"
            >
              <blockquote className="text-night-text-secondary leading-relaxed">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-night-text">
                {q.name}
                {q.detail && (
                  <span className="block font-normal text-night-text-muted">{q.detail}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

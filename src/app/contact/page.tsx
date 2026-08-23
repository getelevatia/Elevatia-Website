import Footer from '@/components/layout/Footer';

const inputClasses =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-night-text placeholder-night-text-muted focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze/40';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-night text-night-text pt-16">
      <section className="section-padding">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
            Contact Us
          </h1>

          <div className="max-w-3xl mx-auto">
            <div className="card-night p-8 sm:p-10 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-night-text-secondary mb-8">
                Have questions about Elevatia? We&apos;re here to help. Fill out the form below or reach out to us directly.
              </p>

              <form className="space-y-6" action="mailto:admin@elevatia.org" method="post" encType="text/plain">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-night-text-secondary mb-1">
                    Name
                  </label>
                  <input type="text" id="name" name="name" className={inputClasses} required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-night-text-secondary mb-1">
                    Email
                  </label>
                  <input type="email" id="email" name="email" className={inputClasses} required />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-night-text-secondary mb-1">
                    Message
                  </label>
                  <textarea id="message" name="message" rows={4} className={inputClasses} required></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-night bg-bronze rounded-full hover:bg-bronze-bright transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="card-night p-8 sm:p-10">
              <h2 className="text-2xl font-semibold mb-6">Other Ways to Reach Us</h2>
              <div className="space-y-4 text-night-text-secondary">
                <p>
                  <strong className="text-night-text">Email:</strong> info@getelevatia.com
                </p>
                <p>
                  <strong className="text-night-text">Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
                </p>
                <div>
                  <strong className="text-night-text">Follow Us:</strong>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href="https://www.linkedin.com/company/elevatia-co/?viewAsMember=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bronze hover:text-bronze-bright transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/elevatiahq?igsh=Z3Z4amhpMThhOW9i&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bronze hover:text-bronze-bright transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-night-text-muted mt-8">
              Not ready to reach out? You can also{' '}
              <a href="/stay-in-touch" className="text-bronze underline hover:text-bronze-bright">
                stay in touch
              </a>{' '}
              for occasional updates.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

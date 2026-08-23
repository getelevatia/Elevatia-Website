import Image from 'next/image';

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-night text-night-text py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-night-text">
            Join the Elevatia Community
          </h1>
          <p className="text-xl text-night-text-secondary mb-12 leading-relaxed">
            Ready to transform your wellness journey? Download Elevatia today and start your path to better health, 
            mindfulness, and personal growth.
          </p>
          
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="card-night p-6 sm:p-8">
                <h3 className="text-xl font-semibold mb-4 text-night-text">Track Your Progress</h3>
                <p className="text-night-text-secondary">
                  Monitor your wellness journey with detailed analytics and celebrate your achievements.
                </p>
              </div>
              <div className="card-night p-6 sm:p-8">
                <h3 className="text-xl font-semibold mb-4 text-night-text">AI-Powered Insights</h3>
                <p className="text-night-text-secondary">
                  Get personalized recommendations powered by advanced AI to optimize your wellness routine.
                </p>
              </div>
              <div className="card-night p-6 sm:p-8">
                <h3 className="text-xl font-semibold mb-4 text-night-text">Community Support</h3>
                <p className="text-night-text-secondary">
                  Connect with like-minded individuals and share your progress in our supportive community.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <a 
                href="https://apps.apple.com/us/app/elevatia/id6747624957"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-105 transition-transform duration-200 hover:opacity-90"
              >
                <Image
                  src="/app-store-badge-official.svg"
                  alt="Download on the App Store"
                  width={160}
                  height={53}
                  className="h-12 w-auto"
                  priority
                />
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-night-text-muted text-sm">
              Available on iOS. Coming soon to Android.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
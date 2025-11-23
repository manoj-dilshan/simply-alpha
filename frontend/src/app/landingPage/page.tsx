// src/app/page.tsx
import Link from 'next/link';
import { ArrowRight, TrendingUp, Brain, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              AI-Powered Stock Predictions
              <span className="block text-blue-200 mt-2">Made Simple</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Harness advanced machine learning to predict stock movements with confidence. 
              Real-time sentiment analysis and market insights at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-blue-500/30 transition-all border border-white/20"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Simply Alpha?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combining cutting-edge AI with intuitive design for smarter investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-blue-600" />}
              title="LSTM Predictions"
              description="Advanced neural networks analyze historical patterns to forecast stock movements with high accuracy"
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 text-green-600" />}
              title="Real-Time Analysis"
              description="Get instant predictions and insights updated with the latest market data"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-purple-600" />}
              title="Sentiment Analysis"
              description="FinBERT-powered sentiment tracking from news and social media to gauge market mood"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-600" />}
              title="Lightning Fast"
              description="Optimized infrastructure delivers predictions in seconds, not minutes"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to smarter investing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="01"
              title="Enter Stock Symbol"
              description="Simply type in any stock ticker symbol you want to analyze"
            />
            <StepCard
              number="02"
              title="AI Analysis"
              description="Our ML models process historical data, news sentiment, and market trends"
            />
            <StepCard
              number="03"
              title="Get Predictions"
              description="Receive clear predictions with confidence scores and visualizations"
            />
          </div>
        </div>
      </section>

      {/* Latest Insights Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Latest Market Insights
            </h2>
            <Link 
              href="/news"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <InsightCard
              ticker="NVDA"
              title="NVIDIA Shows Strong Momentum"
              sentiment="Positive"
              date="Nov 23, 2025"
            />
            <InsightCard
              ticker="AAPL"
              title="Apple Services Hit New Highs"
              sentiment="Positive"
              date="Nov 22, 2025"
            />
            <InsightCard
              ticker="TSLA"
              title="Tesla Energy Storage Growth"
              sentiment="Neutral"
              date="Nov 22, 2025"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of investors making data-driven decisions with Simply Alpha
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function InsightCard({ ticker, title, sentiment, date }: { ticker: string; title: string; sentiment: string; date: string }) {
  const sentimentColor = sentiment === 'Positive' ? 'text-green-600 bg-green-50' : sentiment === 'Negative' ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50';
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 cursor-pointer hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-md">{ticker}</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${sentimentColor}`}>
        {sentiment}
      </span>
    </div>
  );
}
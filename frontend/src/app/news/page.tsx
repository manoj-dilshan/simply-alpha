'use client';

import { useState } from 'react';
import { Newspaper, TrendingUp, Filter, Calendar, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

type SentimentType = 'all' | 'positive' | 'negative' | 'neutral';

export default function NewsPage() {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market News & Sentiment</h1>
          <p className="text-gray-600">AI-powered sentiment analysis from latest financial news</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sentiment
              </label>
              <div className="flex gap-2">
                <FilterButton
                  active={selectedSentiment === 'all'}
                  onClick={() => setSelectedSentiment('all')}
                  label="All"
                />
                <FilterButton
                  active={selectedSentiment === 'positive'}
                  onClick={() => setSelectedSentiment('positive')}
                  label="Positive"
                  color="green"
                />
                <FilterButton
                  active={selectedSentiment === 'neutral'}
                  onClick={() => setSelectedSentiment('neutral')}
                  label="Neutral"
                  color="gray"
                />
                <FilterButton
                  active={selectedSentiment === 'negative'}
                  onClick={() => setSelectedSentiment('negative')}
                  label="Negative"
                  color="red"
                />
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="earnings">Earnings</option>
                <option value="analysis">Analysis</option>
                <option value="market">Market News</option>
                <option value="tech">Technology</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sentiment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SentimentCard
            icon={<ThumbsUp className="h-6 w-6" />}
            label="Positive Sentiment"
            value="63%"
            color="green"
            description="Market optimism high"
          />
          <SentimentCard
            icon={<Minus className="h-6 w-6" />}
            label="Neutral Sentiment"
            value="22%"
            color="gray"
            description="Wait and see approach"
          />
          <SentimentCard
            icon={<ThumbsDown className="h-6 w-6" />}
            label="Negative Sentiment"
            value="15%"
            color="red"
            description="Cautious positioning"
          />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main News Feed */}
          <div className="lg:col-span-2 space-y-6">
            <NewsArticle
              ticker="NVDA"
              title="NVIDIA's Data Center Revenue Continues Explosive Growth"
              excerpt="Data center revenue growth remains robust as AI adoption accelerates across industries. The company's next-generation chips are seeing unprecedented demand from cloud providers and enterprises, with backlog extending into next quarter."
              sentiment="positive"
              sentimentScore={0.89}
              source="MarketWatch"
              time="2 hours ago"
              category="Analysis"
            />

            <NewsArticle
              ticker="AAPL"
              title="Apple's Services Segment Hits New Milestone in Q4"
              excerpt="Apple continues to diversify its revenue streams as services reach record highs. Analysts are optimistic about the company's ecosystem expansion and recurring revenue growth model. The App Store and subscription services show strong momentum."
              sentiment="positive"
              sentimentScore={0.76}
              source="Bloomberg"
              time="4 hours ago"
              category="Earnings"
            />

            <NewsArticle
              ticker="TSLA"
              title="Tesla Faces Production Challenges at New Facility"
              excerpt="Tesla's newest production facility is experiencing temporary setbacks in ramping up output. Management remains confident in meeting annual targets despite the current delays. Supply chain optimization efforts are underway."
              sentiment="negative"
              sentimentScore={-0.45}
              source="Reuters"
              time="6 hours ago"
              category="Market News"
            />

            <NewsArticle
              ticker="MSFT"
              title="Microsoft Cloud Growth Beats Expectations in Latest Quarter"
              excerpt="Azure cloud services continue to outperform with strong enterprise adoption. CEO highlighted AI integration across product lines as a key driver of future revenue growth. Commercial cloud revenue exceeded analyst projections."
              sentiment="positive"
              sentimentScore={0.82}
              source="CNBC"
              time="8 hours ago"
              category="Earnings"
            />

            <NewsArticle
              ticker="META"
              title="Meta's Reality Labs Division Shows Mixed Results"
              excerpt="While Reality Labs continues to invest heavily in VR/AR technology, the division posted another quarterly loss. However, management emphasized long-term potential and growing user engagement metrics in core metaverse products."
              sentiment="neutral"
              sentimentScore={0.12}
              source="TechCrunch"
              time="1 day ago"
              category="Analysis"
            />

            <NewsArticle
              ticker="AMZN"
              title="Amazon's AWS Maintains Market Leadership Position"
              excerpt="Amazon Web Services continues to lead the cloud infrastructure market with innovative offerings. The company's focus on AI and machine learning services is attracting new enterprise customers and expanding existing contracts."
              sentiment="positive"
              sentimentScore={0.71}
              source="Financial Times"
              time="1 day ago"
              category="Analysis"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Trending Topics
              </h2>
              <div className="space-y-3">
                <TrendingTopic topic="AI Technology" mentions={342} />
                <TrendingTopic topic="Cloud Computing" mentions={287} />
                <TrendingTopic topic="EV Market" mentions={195} />
                <TrendingTopic topic="Earnings Season" mentions={178} />
                <TrendingTopic topic="Fed Policy" mentions={156} />
              </div>
            </div>

            {/* Most Discussed Stocks */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Most Discussed
              </h2>
              <div className="space-y-3">
                <DiscussedStock ticker="NVDA" mentions={1240} sentiment="positive" />
                <DiscussedStock ticker="TSLA" mentions={987} sentiment="neutral" />
                <DiscussedStock ticker="AAPL" mentions={856} sentiment="positive" />
                <DiscussedStock ticker="MSFT" mentions={742} sentiment="positive" />
                <DiscussedStock ticker="META" mentions={621} sentiment="negative" />
              </div>
            </div>

            {/* Sentiment Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                7-Day Sentiment
              </h2>
              <div className="space-y-2">
                <TimelineDay day="Mon" positive={68} neutral={20} negative={12} />
                <TimelineDay day="Tue" positive={71} neutral={18} negative={11} />
                <TimelineDay day="Wed" positive={65} neutral={23} negative={12} />
                <TimelineDay day="Thu" positive={63} neutral={22} negative={15} />
                <TimelineDay day="Fri" positive={69} neutral={19} negative={12} />
                <TimelineDay day="Sat" positive={58} neutral={28} negative={14} />
                <TimelineDay day="Sun" positive={63} neutral={22} negative={15} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, label, color = 'blue' }: any) {
  const activeClass = active
    ? color === 'green'
      ? 'bg-green-600 text-white'
      : color === 'red'
      ? 'bg-red-600 text-white'
      : color === 'gray'
      ? 'bg-gray-600 text-white'
      : 'bg-blue-600 text-white'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeClass}`}
    >
      {label}
    </button>
  );
}

function SentimentCard({ icon, label, value, color, description }: any) {
  const colorClasses = {
    green: 'text-green-600 bg-green-50 border-green-200',
    gray: 'text-gray-600 bg-gray-50 border-gray-200',
    red: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={colorClasses[color as keyof typeof colorClasses].split(' ')[0]}>{icon}</div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-sm font-semibold mb-1">{label}</p>
      <p className="text-xs opacity-75">{description}</p>
    </div>
  );
}

function NewsArticle({ ticker, title, excerpt, sentiment, sentimentScore, source, time, category }: any) {
  const sentimentColor =
    sentiment === 'positive'
      ? 'bg-green-100 text-green-700 border-green-200'
      : sentiment === 'negative'
      ? 'bg-red-100 text-red-700 border-red-200'
      : 'bg-gray-100 text-gray-700 border-gray-200';

  const sentimentLabel =
    sentiment === 'positive' ? 'Bullish' : sentiment === 'negative' ? 'Bearish' : 'Neutral';

  return (
    <article className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-md">
            {ticker}
          </span>
          <span className="text-sm text-gray-500">{category}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${sentimentColor}`}>
            {sentimentLabel} {Math.abs(sentimentScore).toFixed(2)}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center">
          <Newspaper className="h-4 w-4 mr-1" />
          {source}
        </span>
        <span>{time}</span>
      </div>
    </article>
  );
}

function TrendingTopic({ topic, mentions }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
      <span className="text-gray-700 font-medium">{topic}</span>
      <span className="text-sm text-gray-500">{mentions} mentions</span>
    </div>
  );
}

function DiscussedStock({ ticker, mentions, sentiment }: any) {
  const sentimentIcon =
    sentiment === 'positive' ? (
      <ThumbsUp className="h-4 w-4 text-green-600" />
    ) : sentiment === 'negative' ? (
      <ThumbsDown className="h-4 w-4 text-red-600" />
    ) : (
      <Minus className="h-4 w-4 text-gray-600" />
    );

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900">{ticker}</span>
        {sentimentIcon}
      </div>
      <span className="text-sm text-gray-500">{mentions} mentions</span>
    </div>
  );
}

function TimelineDay({ day, positive, neutral, negative }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{day}</span>
        <span>{positive}%</span>
      </div>
      <div className="flex w-full h-3 rounded-full overflow-hidden">
        <div className="bg-green-500" style={{ width: `${positive}%` }} />
        <div className="bg-gray-400" style={{ width: `${neutral}%` }} />
        <div className="bg-red-500" style={{ width: `${negative}%` }} />
      </div>
    </div>
  );
}
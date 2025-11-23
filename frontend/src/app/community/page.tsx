'use client';

import { useState } from 'react';
import { MessageCircle, ThumbsUp, TrendingUp, Award, Users, Eye, MessageSquare, Share2 } from 'lucide-react';

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Connect with fellow investors and share insights</p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            <CategoryButton
              label="All Posts"
              active={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
            />
            <CategoryButton
              label="Predictions"
              active={selectedCategory === 'predictions'}
              onClick={() => setSelectedCategory('predictions')}
            />
            <CategoryButton
              label="Analysis"
              active={selectedCategory === 'analysis'}
              onClick={() => setSelectedCategory('analysis')}
            />
            <CategoryButton
              label="Discussion"
              active={selectedCategory === 'discussion'}
              onClick={() => setSelectedCategory('discussion')}
            />
            <CategoryButton
              label="Questions"
              active={selectedCategory === 'questions'}
              onClick={() => setSelectedCategory('questions')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <input
                  type="text"
                  placeholder="Share your thoughts or predictions..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <Post
              author="Sarah Chen"
              avatar="SC"
              time="2 hours ago"
              category="Prediction"
              ticker="NVDA"
              title="NVDA Bullish Setup - Technical Analysis"
              content="After analyzing the recent price action and volume trends, I'm seeing a strong bullish setup forming on NVDA. The stock has bounced perfectly off the 50-day MA with increasing volume. RSI showing bullish divergence. Target: $520 in the next 2 weeks."
              likes={127}
              comments={34}
              views={856}
            />

            <Post
              author="Mike Rodriguez"
              avatar="MR"
              time="5 hours ago"
              category="Analysis"
              ticker="TSLA"
              title="Tesla's Energy Business is Undervalued"
              content="While everyone focuses on EV sales, Tesla's energy storage business is quietly becoming a major revenue driver. Megapack deployments are up 200% YoY. This segment alone could justify a higher valuation. The market is sleeping on this."
              likes={89}
              comments={23}
              views={645}
            />

            <Post
              author="Emily Watson"
              avatar="EW"
              time="8 hours ago"
              category="Discussion"
              ticker="AAPL"
              title="Thoughts on Apple's Services Growth?"
              content="AAPL services revenue continues to impress. With 1B+ subscribers across their ecosystem, this high-margin business is becoming the profit engine. What's everyone's take on the valuation here? Is it justified given the recurring revenue model?"
              likes={156}
              comments={67}
              views={1243}
            />

            <Post
              author="David Kim"
              avatar="DK"
              time="1 day ago"
              category="Question"
              ticker="MSFT"
              title="How reliable are AI predictions for tech stocks?"
              content="I've been using Simply Alpha for a month now and seeing good results with tech stocks. But I'm curious - how do you all factor in AI predictions vs your own analysis? Do you use them as confirmation or primary decision drivers?"
              likes={72}
              comments={45}
              views={892}
            />

            <Post
              author="Rachel Thompson"
              avatar="RT"
              time="1 day ago"
              category="Analysis"
              ticker="META"
              title="Meta's Reality Labs: Long-term Bet Worth Taking?"
              content="META continues burning billions on Reality Labs with no clear ROI timeline. But history shows Zuckerberg's bold bets often pay off long-term. Instagram acquisition was criticized initially. Thoughts on whether this metaverse bet will pay off?"
              likes={94}
              comments={56}
              views={1107}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Top Contributors
              </h2>
              <div className="space-y-4">
                <Contributor
                  name="Sarah Chen"
                  avatar="SC"
                  posts={247}
                  accuracy={92}
                  rank={1}
                />
                <Contributor
                  name="Mike Rodriguez"
                  avatar="MR"
                  posts={198}
                  accuracy={89}
                  rank={2}
                />
                <Contributor
                  name="Emily Watson"
                  avatar="EW"
                  posts={176}
                  accuracy={87}
                  rank={3}
                />
                <Contributor
                  name="David Kim"
                  avatar="DK"
                  posts={154}
                  accuracy={85}
                  rank={4}
                />
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Community Stats
              </h2>
              <div className="space-y-4">
                <StatItem label="Active Members" value="12,847" />
                <StatItem label="Posts Today" value="342" />
                <StatItem label="Predictions Shared" value="8,934" />
                <StatItem label="Avg. Accuracy" value="84.2%" />
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Trending Topics
              </h2>
              <div className="space-y-3">
                <TrendingTopic tag="AI Stocks" posts={127} />
                <TrendingTopic tag="Tech Earnings" posts={98} />
                <TrendingTopic tag="Fed Policy" posts={76} />
                <TrendingTopic tag="EV Market" posts={64} />
                <TrendingTopic tag="Cloud Computing" posts={52} />
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Community Guidelines</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Be respectful and constructive</li>
                <li>• Share data-backed insights</li>
                <li>• No financial advice</li>
                <li>• Disclose positions when relevant</li>
                <li>• Report spam or abuse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryButton({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

function Post({ author, avatar, time, category, ticker, title, content, likes, comments, views }: any) {
  const categoryColors: any = {
    Prediction: 'bg-green-100 text-green-700',
    Analysis: 'bg-blue-100 text-blue-700',
    Discussion: 'bg-purple-100 text-purple-700',
    Question: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <article className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            {avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{author}</p>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[category]}`}>
            {category}
          </span>
          {ticker && (
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-md">
              {ticker}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{content}</p>

      {/* Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
        <ActionButton icon={<ThumbsUp className="h-4 w-4" />} count={likes} label="Like" />
        <ActionButton icon={<MessageSquare className="h-4 w-4" />} count={comments} label="Comment" />
        <ActionButton icon={<Share2 className="h-4 w-4" />} label="Share" />
        <div className="ml-auto flex items-center text-sm text-gray-500">
          <Eye className="h-4 w-4 mr-1" />
          {views}
        </div>
      </div>
    </article>
  );
}

function ActionButton({ icon, count, label }: any) {
  return (
    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
      {icon}
      <span className="text-sm font-medium">
        {count ? `${count} ${label}s` : label}
      </span>
    </button>
  );
}

function Contributor({ name, avatar, posts, accuracy, rank }: any) {
  const rankColors: any = {
    1: 'text-yellow-600',
    2: 'text-gray-400',
    3: 'text-orange-600',
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {avatar}
          </div>
          <span className={`absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold ${rankColors[rank] || 'text-gray-600'} border-2 border-white`}>
            {rank}
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{name}</p>
          <p className="text-xs text-gray-500">{posts} posts</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-green-600">{accuracy}%</p>
        <p className="text-xs text-gray-500">accuracy</p>
      </div>
    </div>
  );
}

function StatItem({ label, value }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function TrendingTopic({ tag, posts }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
      <span className="text-gray-700 font-medium">#{tag}</span>
      <span className="text-sm text-gray-500">{posts} posts</span>
    </div>
  );
}
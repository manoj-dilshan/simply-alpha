'use client';

import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Activity, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardPage() {
  const [ticker, setTicker] = useState('');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      setSelectedStock(ticker.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prediction Dashboard</h1>
          <p className="text-gray-600">AI-powered stock market predictions and analysis</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Enter stock ticker (e.g., AAPL, TSLA, NVDA)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analyze
            </button>
          </form>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-green-600" />}
            label="Bullish Signals"
            value="127"
            change="+12%"
            positive={true}
          />
          <StatCard
            icon={<TrendingDown className="h-6 w-6 text-red-600" />}
            label="Bearish Signals"
            value="43"
            change="-5%"
            positive={false}
          />
          <StatCard
            icon={<Activity className="h-6 w-6 text-blue-600" />}
            label="Active Predictions"
            value="89"
            change="+8%"
            positive={true}
          />
          <StatCard
            icon={<Clock className="h-6 w-6 text-purple-600" />}
            label="Model Accuracy"
            value="87.3%"
            change="+2.1%"
            positive={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Prediction Results */}
          <div className="lg:col-span-2 space-y-6">
            {selectedStock ? (
              <PredictionResult ticker={selectedStock} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="mb-4">
                  <Search className="h-16 w-16 text-gray-300 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Search for a Stock
                </h3>
                <p className="text-gray-600">
                  Enter a ticker symbol above to get AI-powered predictions and insights
                </p>
              </div>
            )}

            {/* Recent Predictions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Predictions</h2>
              <div className="space-y-4">
                <RecentPredictionItem
                  ticker="NVDA"
                  prediction="Bullish"
                  confidence={92}
                  time="2 hours ago"
                  positive={true}
                />
                <RecentPredictionItem
                  ticker="AAPL"
                  prediction="Bullish"
                  confidence={78}
                  time="5 hours ago"
                  positive={true}
                />
                <RecentPredictionItem
                  ticker="TSLA"
                  prediction="Neutral"
                  confidence={64}
                  time="1 day ago"
                  positive={null}
                />
                <RecentPredictionItem
                  ticker="META"
                  prediction="Bearish"
                  confidence={71}
                  time="1 day ago"
                  positive={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Trending & Watchlist */}
          <div className="space-y-6">
            {/* Trending Stocks */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending Now</h2>
              <div className="space-y-3">
                <TrendingStockItem
                  ticker="NVDA"
                  name="NVIDIA Corp"
                  change={2.45}
                  price="485.23"
                />
                <TrendingStockItem
                  ticker="MSFT"
                  name="Microsoft"
                  change={1.76}
                  price="392.15"
                />
                <TrendingStockItem
                  ticker="TSLA"
                  name="Tesla Inc"
                  change={-0.87}
                  price="245.89"
                />
                <TrendingStockItem
                  ticker="AAPL"
                  name="Apple Inc"
                  change={1.23}
                  price="186.72"
                />
                <TrendingStockItem
                  ticker="AMZN"
                  name="Amazon"
                  change={0.92}
                  price="178.34"
                />
              </div>
            </div>

            {/* Market Sentiment */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Sentiment</h2>
              <div className="space-y-4">
                <SentimentBar label="Very Bullish" percentage={35} color="bg-green-500" />
                <SentimentBar label="Bullish" percentage={28} color="bg-green-400" />
                <SentimentBar label="Neutral" percentage={22} color="bg-gray-400" />
                <SentimentBar label="Bearish" percentage={12} color="bg-red-400" />
                <SentimentBar label="Very Bearish" percentage={3} color="bg-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, positive }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <div>{icon}</div>
        <span className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function PredictionResult({ ticker }: { ticker: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{ticker}</h2>
          <p className="text-gray-600">Stock Analysis</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">$485.23</p>
          <p className="text-green-600 font-semibold flex items-center justify-end">
            <ArrowUpRight className="h-4 w-4" />
            +2.45%
          </p>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 font-semibold mb-1">Prediction</p>
          <p className="text-2xl font-bold text-green-700">Bullish</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700 font-semibold mb-1">Confidence</p>
          <p className="text-2xl font-bold text-blue-700">92%</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-700 font-semibold mb-1">Target</p>
          <p className="text-2xl font-bold text-purple-700">$512</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-8 mb-6">
        <div className="text-center">
          <Activity className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Price prediction chart will appear here</p>
          <p className="text-sm text-gray-500 mt-2">Interactive visualization with historical and predicted prices</p>
        </div>
      </div>

      {/* Key Insights */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Key Insights</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">Strong upward momentum detected in recent trading sessions</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">Positive sentiment from earnings call and analyst reports</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-gray-700">Technical indicators suggest continued growth potential</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function RecentPredictionItem({ ticker, prediction, confidence, time, positive }: any) {
  const bgColor = positive === true ? 'bg-green-50' : positive === false ? 'bg-red-50' : 'bg-gray-50';
  const textColor = positive === true ? 'text-green-700' : positive === false ? 'text-red-700' : 'text-gray-700';

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
          {ticker}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{ticker}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${textColor}`}>{prediction}</p>
        <p className="text-sm text-gray-600">{confidence}% confidence</p>
      </div>
    </div>
  );
}

function TrendingStockItem({ ticker, name, change, price }: any) {
  const isPositive = change > 0;

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
      <div>
        <p className="font-semibold text-gray-900">{ticker}</p>
        <p className="text-sm text-gray-500">{name}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">${price}</p>
        <p className={`text-sm font-semibold flex items-center justify-end ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(change)}%
        </p>
      </div>
    </div>
  );
}

function SentimentBar({ label, percentage, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-600 font-semibold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
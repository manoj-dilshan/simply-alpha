'use client';

import { useState } from 'react';
import { User, Mail, Bell, Shield, CreditCard, Activity, Settings, Camera, Save } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'billing'>('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Investment enthusiast focused on tech stocks and AI companies.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
  });

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    // Add save logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-lg p-4 space-y-2">
              <NavItem
                icon={<User className="h-5 w-5" />}
                label="Profile"
                active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              />
              <NavItem
                icon={<Shield className="h-5 w-5" />}
                label="Account"
                active={activeTab === 'account'}
                onClick={() => setActiveTab('account')}
              />
              <NavItem
                icon={<Bell className="h-5 w-5" />}
                label="Notifications"
                active={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              />
              <NavItem
                icon={<CreditCard className="h-5 w-5" />}
                label="Billing"
                active={activeTab === 'billing'}
                onClick={() => setActiveTab('billing')}
              />
            </nav>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <StatItem label="Predictions Made" value="247" />
                <StatItem label="Accuracy Rate" value="87.3%" />
                <StatItem label="Watchlist Items" value="24" />
                <StatItem label="Member Since" value="Jan 2024" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && <ProfileTab data={profileData} setData={setProfileData} onSave={handleSave} />}
            {activeTab === 'account' && <AccountTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {activeTab === 'billing' && <BillingTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
        active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      {label}
    </button>
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

function ProfileTab({ data, setData, onSave }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

      {/* Profile Picture */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">Profile Picture</label>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            JD
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Camera className="h-4 w-4" />
            Change Photo
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={data.website}
              onChange={(e) => setData({ ...data, website: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountTab() {
  return (
    <div className="space-y-6">
      {/* Security Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Password</p>
              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Change Password
            </button>
          </div>

          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Connected Accounts</h2>
        <div className="space-y-4">
          <ConnectedAccount
            name="Google"
            connected={true}
            email="john.doe@gmail.com"
          />
          <ConnectedAccount
            name="GitHub"
            connected={false}
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-900 mb-4">Danger Zone</h2>
        <p className="text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
          Delete Account
        </button>
      </div>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        <NotificationToggle
          title="Price Alerts"
          description="Get notified when stocks in your watchlist hit target prices"
          enabled={true}
        />
        <NotificationToggle
          title="Prediction Updates"
          description="Receive updates on your active predictions"
          enabled={true}
        />
        <NotificationToggle
          title="Market News"
          description="Daily digest of important market news and analysis"
          enabled={false}
        />
        <NotificationToggle
          title="Sentiment Changes"
          description="Alerts when sentiment shifts significantly"
          enabled={true}
        />
        <NotificationToggle
          title="Weekly Summary"
          description="Weekly report of your prediction performance"
          enabled={true}
        />
        <NotificationToggle
          title="Marketing Emails"
          description="Receive product updates and special offers"
          enabled={false}
        />
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Plan</h2>
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Pro Plan</h3>
              <p className="text-gray-600">Unlimited predictions and advanced features</p>
            </div>
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
              $29/month
            </span>
          </div>
          <button className="w-full mt-4 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-linear-to-r from-blue-600 to-indigo-600 rounded flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/2025</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing History</h2>
        <div className="space-y-3">
          <BillingItem date="Nov 1, 2025" amount="$29.00" status="Paid" />
          <BillingItem date="Oct 1, 2025" amount="$29.00" status="Paid" />
          <BillingItem date="Sep 1, 2025" amount="$29.00" status="Paid" />
        </div>
      </div>
    </div>
  );
}

function ConnectedAccount({ name, connected, email }: any) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        {connected && <p className="text-sm text-gray-600">{email}</p>}
      </div>
      {connected ? (
        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
          Disconnect
        </button>
      ) : (
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Connect
        </button>
      )}
    </div>
  );
}

function NotificationToggle({ title, description, enabled }: any) {
  return (
    <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex-1">
        <p className="font-semibold text-gray-900 mb-1">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input type="checkbox" defaultChecked={enabled} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

function BillingItem({ date, amount, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div>
        <p className="font-semibold text-gray-900">{date}</p>
        <p className="text-sm text-gray-600">Pro Plan - Monthly</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">{amount}</p>
        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
          {status}
        </span>
      </div>
    </div>
  );
}
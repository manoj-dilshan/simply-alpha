import Link from 'next/link';
import { TrendingUp, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Simply Alpha</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered stock predictions and market analysis for smarter investment decisions.
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={<Twitter className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Github className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Linkedin className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Mail className="h-5 w-5" />} href="#" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="/dashboard" label="Dashboard" />
              <FooterLink href="/news" label="News & Sentiment" />
              <FooterLink href="/community" label="Community" />
              <FooterLink href="/pricing" label="Pricing" />
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/careers" label="Careers" />
              <FooterLink href="/contact" label="Contact" />
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
              <FooterLink href="/disclaimer" label="Disclaimer" />
              <FooterLink href="/cookies" label="Cookie Policy" />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Simply Alpha. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Made with ❤️ for investors
            </p>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>
              <strong>Disclaimer:</strong> This platform provides AI-generated predictions for informational purposes only. 
              Not financial advice. Always conduct your own research and consult with financial professionals before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  );
}
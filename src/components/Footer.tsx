import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
export function Footer() {
  return <footer className="bg-gray-50 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Contact */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1">
              <span className="font-bold text-2xl gradient-text">NexTalent</span>
              <span className="text-black font-bold text-2xl">Lab</span>
            </Link>
            <p className="text-gray-600 text-sm mt-2">
              Connecting creative talents and project builders for meaningful collaborations.
            </p>
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Global Remote Platform</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@nextalentlab.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 mx-[50px] px-[50px]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary text-sm mx-[50px] px-[50px]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-600 hover:text-primary text-sm mx-[50px] px-[50px]">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-primary text-sm mx-[50px] px-[50px]">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary text-sm mx-[50px] px-[50px]">
                  Pricing
                </Link>
              </li>
              {/* Removed the Blog link */}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 py-0 px-[45px]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary text-sm px-[45px]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary text-sm px-[45px]">
                  Privacy Policy
                </Link>
              </li>
              <li className="px-[45px]">
                <Link to="/cookies" className="text-gray-600 hover:text-primary text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-gray-600 hover:text-primary text-sm px-[45px]">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex flex-col space-y-2">
              <input type="email" placeholder="Your email address" className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NexTalent Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}
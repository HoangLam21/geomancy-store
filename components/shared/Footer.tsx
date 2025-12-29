import Link from 'next/link';
import { Icon } from '@iconify/react';

export function Footer() {
  return (
    <footer className="border-t-4 border-primary bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-dark">GemSphere</h3>
            <p className="mb-6 text-sm leading-relaxed text-gray/80">
              Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit. Gravida massa volutpat aenean odio erat nullam fringilla.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-dark transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Icon icon="mdi:facebook" className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray/40 transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Icon icon="mdi:instagram" className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray/40 transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Icon icon="mdi:twitter" className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray/40 transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Icon icon="mdi:linkedin" className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray/40 transition-colors hover:text-primary"
                aria-label="YouTube"
              >
                <Icon icon="mdi:youtube" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-dark">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-sm text-gray/80">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-primary">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition-colors hover:text-primary">
                  SHOP
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="transition-colors hover:text-primary">
                  BLOGS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-dark">
              HELP & INFO
            </h4>
            <ul className="space-y-2 text-sm text-gray/80">
              <li>
                <Link href="/track-order" className="transition-colors hover:text-primary">
                  TRACK YOUR ORDER
                </Link>
              </li>
              <li>
                <Link href="/returns" className="transition-colors hover:text-primary">
                  RETURNS POLICIES
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="transition-colors hover:text-primary">
                  SHIPPING + DELIVERY
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="transition-colors hover:text-primary">
                  FAQS
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-dark">
              CONTACT US
            </h4>
            <div className="space-y-4 text-sm text-gray/80">
              <p>
                Do you have any queries or suggestions?
              </p>
              <a 
                href="mailto:yourinfo@gmail.com" 
                className="block underline transition-colors hover:text-primary"
              >
                yourinfo@gmail.com
              </a>
              <p>
                If you need support? Just give us a call.
              </p>
              <a 
                href="tel:+551112223344" 
                className="block font-medium underline transition-colors hover:text-primary"
              >
                +55 111 222 333 44
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-light-gray bg-white py-4">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-xs text-gray/60">
            © {new Date().getFullYear()} GemSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
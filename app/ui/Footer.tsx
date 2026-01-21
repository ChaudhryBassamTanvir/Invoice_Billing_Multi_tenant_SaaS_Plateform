import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 bg-violet-600">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                 src={`/logo2.png` }
                alt="Nimbus Logo"
                width={150}
                height={150}
                className="rounded"
              />
              <span className="text-2xl font-semibold text-white">
                Nimbus
              </span>
            </div>

            <p className="mt-4 text-sm text-violet-100 leading-relaxed">
              Nimbus is a modern Next.js example app designed
              to help you learn and build beautiful interfaces
              faster.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="font-medium text-white mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-violet-100">
              <li className="hover:text-white cursor-pointer transition">Features</li>
              <li className="hover:text-white cursor-pointer transition">Pricing</li>
              <li className="hover:text-white cursor-pointer transition">Docs</li>
              <li className="hover:text-white cursor-pointer transition">Updates</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-medium text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-violet-100">
              <li className="hover:text-white cursor-pointer transition">About</li>
              <li className="hover:text-white cursor-pointer transition">Blog</li>
              <li className="hover:text-white cursor-pointer transition">Careers</li>
              <li className="hover:text-white cursor-pointer transition">Contact</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-medium text-white mb-4">
              Follow us
            </h4>
            <div className="flex gap-5 text-violet-100">
              <FaGithub className="hover:text-white cursor-pointer transition" size={18} />
              <FaTwitter className="hover:text-white cursor-pointer transition" size={18} />
              <FaLinkedin className="hover:text-white cursor-pointer transition" size={18} />
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-violet-500 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-violet-100">
          <p>
            © {new Date().getFullYear()} Nimbus. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
            <span className="hover:text-white cursor-pointer transition">Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

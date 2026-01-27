import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './fonts';
import Image from 'next/image';
import darkTheme from '../lib/dark-theme';

const HeroSection = () => {
  return (
  <>
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className={`flex flex-col justify-center gap-6 rounded-lg bg-gray-50 ${darkTheme.container} 
          px-6 py-10 md:w-2/5 md:px-20
        `}>
          <span className={`${lusitana.className} text-xl text-gray-800 ${darkTheme.text}
          md:text-3xl md:leading-normal
          `}>
          <strong>Welcome to Nimbus.</strong> A powerful{' '}
<div className="text-violet-500">
  Multi-Tenant Invoice & Billing SaaS Platform
</div>
designed to simplify invoicing, manage billing, and scale effortlessly for modern businesses — built with care at DS Technologies.

          </span>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-400 md:text-base"
          >
            <button>Log in</button> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/heroImage.jpg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="heroImage"
          />
          <Image 
            src="/heroImage.jpg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="HeroImage"
          />
        </div>
      </div>
  
  </>
  )
}

export default HeroSection

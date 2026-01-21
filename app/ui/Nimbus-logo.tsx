import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function NimbusLogo() {
  return (
    <div
      className={`${lusitana.className} flex items-center gap-2 text-white`}
    >
      {/* Responsive Image Wrapper */}
      <div className="relative w-32 sm:w-40 md:w-48 lg:w-52 h-20 sm:h-24 md:h-28 lg:h-32">
        <Image
          src="/logo2.png"
          alt="Nimbus Logo"
          fill
          priority
          className="object-contain md:w-72 md:h-72"
        />
      </div>

      <p className="text-2xl sm:text-3xl">Nimbus</p>
    </div>
  );
}

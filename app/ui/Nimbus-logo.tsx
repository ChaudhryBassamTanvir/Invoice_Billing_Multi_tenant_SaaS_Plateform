import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function NimbusLogo() {
  return (
    <div
      className={`${lusitana.className} flex items-center justify-center ml-4 gap-1 text-white`}
    >
      {/* Logo */}
      <div className="relative h-20 min-w-[180px] sm:h-24 sm:min-w-[200px] md:h-28 md:min-w-[220px]">
        <Image
          src="/logo2.png"
          alt="Nimbus Logo"
          fill
          priority
          className="object-contain scale-110"
        />
      </div>

      {/* Text */}
      <p className="text-2xl sm:text-3xl md:text-2xl font-semibold leading-none">
        Nimbus
      </p>
    </div>
  );
}

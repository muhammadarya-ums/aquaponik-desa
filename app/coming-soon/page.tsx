import Image from 'next/image';

export default function ComingSoonPage() {
  // Ditambahkan properti className untuk membedakan ukuran logo persegi vs memanjang (landscape)
  const logos = [
    { src: '/logos/tut-wuri.png', alt: 'Tut Wuri Handayani', className: 'w-12 h-12 md:w-16 md:h-16' },
    { src: '/logos/diktisaintek.png', alt: 'Diktisaintek', className: 'w-12 h-12 md:w-16 md:h-16' },
    { src: '/logos/belmawa.png', alt: 'Belmawa', className: 'w-28 h-10 md:w-36 md:h-14' },
    { src: '/logos/ppk-ormawa.png', alt: 'PPK Ormawa', className: 'w-12 h-12 md:w-16 md:h-16' },
    { src: '/logos/umsura.png', alt: 'Universitas Muhammadiyah Surabaya', className: 'w-28 h-10 md:w-36 md:h-14' },
    { src: '/logos/tim-ppko.png', alt: 'Tim PPKO', className: 'w-12 h-12 md:w-16 md:h-16' },
    { src: '/logos/imm-blue-savant.png', alt: 'IMM Blue Savant', className: 'w-12 h-12 md:w-16 md:h-16' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-500 to-emerald-900 flex flex-col items-center justify-center p-6">
      
      {/* Teks Utama */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Segera Hadir
        </h1>
        <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
          Website Aquaponik Desa saat ini sedang dalam tahap pengembangan oleh tim. Pantau terus untuk pembaruan selanjutnya!
        </p>
      </div>

      {/* Container Logo (Pill-shape) */}
      <div className="bg-white rounded-full py-4 px-6 md:px-10 shadow-2xl flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-6 max-w-4xl w-full">
        {logos.map((logo, index) => (
          <div key={index} className={`relative flex-shrink-0 ${logo.className}`}>
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 120px, 160px"
              priority
            />
          </div>
        ))}
      </div>

    </main>
  );
}
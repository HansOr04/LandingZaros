"use client"
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface BootcampCardProps {
  nivel: 'nivel1' | 'nivel2' | 'nivel3';
  selected: boolean;
  onSelect: () => void;
}

const levelData = {
  nivel1: {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80&fit=crop",
    tag: "Nivel I · Fundacional",
    titulo: "Confianza Estratégica",
    desc: "Para mujeres que quieren ganar estructura, encontrar su voz de liderazgo y construir una red estratégica en América Latina.",
    chips: ["10 días en vivo", "Método 3C", "Red LATAM", "Certificación"]
  },
  nivel2: {
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&q=80&fit=crop",
    tag: "★ Nivel II · Avanzado",
    titulo: "Marca y Proyección",
    desc: "Para líderes con base que quieren posicionarse estratégicamente y construir su marca personal con impacto real en el mercado.",
    chips: ["10 días en vivo", "Método 3C", "Marca personal", "Certificación"]
  },
  nivel3: {
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&q=80&fit=crop",
    tag: "Nivel III · Expert",
    titulo: "Liderazgo Multiplicador",
    desc: "Para mujeres con trayectoria que quieren mentorear a otras, generar impacto social y publicar en la Revista Internacional.",
    chips: ["10 días en vivo", "Método 3C", "Revista Internacional", "Certificación"]
  }
};

export const BootcampCard = ({ nivel, selected, onSelect }: BootcampCardProps) => {
  const data = levelData[nivel];

  return (
    <motion.div
      onClick={onSelect}
      whileHover={!selected ? { y: -4, boxShadow: "0 12px 48px rgba(59,18,96,0.13)" } : {}}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 border-2 ${selected ? 'border-[#C8447A] shadow-[0_8px_40px_rgba(200,68,122,0.20)]' : 'border-[#EBE3F0] shadow-[0_4px_24px_rgba(59,18,96,0.08)]'
        }`}
    >
      {/* Image Container */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={data.img}
            alt={data.titulo}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B1260]/10 to-[#3B1260]/65" />

        {/* Tag Nivel */}
        <div className="absolute top-[14px] left-[14px] bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-[13px] py-[5px] text-[0.68rem] text-white font-bold uppercase tracking-wide">
          {data.tag}
        </div>

        {/* Check Circle */}
        <div className={`absolute top-[14px] right-[14px] w-[28px] h-[28px] rounded-full border-[1.5px] transition-all duration-300 flex items-center justify-center ${selected ? 'bg-[#C8447A] border-[#C8447A] shadow-[0_0_12px_rgba(200,68,122,0.5)]' : 'bg-white/15 backdrop-blur-md border-white/35'
          }`}>
          <AnimatePresence>
            {selected && (
              <motion.svg
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 5L4.5 8.5L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* Título sobre imagen */}
        <h3 className="absolute bottom-[14px] left-[16px] right-[16px] font-serif text-[1.1rem] font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          {data.titulo}
        </h3>
      </div>

      {/* Body */}
      <div className="p-[20px_22px_22px]">
        <p className="text-[#5A4870] text-[0.95rem] mb-4 leading-relaxed">
          {data.desc}
        </p>

        {/* Beneficios Extra */}
        <div className="bg-[#FAF7F2] p-[14px] rounded-[14px] mb-[16px] text-[0.82rem] font-medium border border-[#EBE3F0]">
          <span className="block font-bold text-[#C8447A] mb-[6px] text-[0.8rem] uppercase tracking-wide">
            Empoderamiento y Liderazgo
          </span>
          <p className="text-[#3B1260] leading-[1.5] mb-3">
            {nivel === 'nivel3'
              ? "Únete a Latam Woman y cuenta tu historia en nuestra revista 'Mujeres en Acción'."
              : "Únete a Latam Woman y descubre herramientas para liderar desde tu esencia."}
          </p>

          <div className="flex flex-col gap-2 pt-3 border-t border-[#DDD4E8]">
            <div className="flex items-start gap-2 text-[#5A4870]">
              <span className="text-[1rem] leading-none shrink-0" role="img" aria-label="cert">🏅</span>
              <span className="leading-tight">Certificado <strong>Sello de Calidad Mujeres Líderes América</strong></span>
            </div>
            <div className="flex items-start gap-2 text-[#5A4870]">
              <span className="text-[1rem] leading-none shrink-0" role="img" aria-label="beca">🎓</span>
              <span className="leading-tight">Postula a <strong>Becas hasta el 30%</strong></span>
            </div>
          </div>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {data.chips.map(chip => (
            <span key={chip} className="bg-[#F3EDE3] border border-[#EBE3F0] rounded-full px-[12px] py-[5px] text-[0.71rem] text-[#5A4870] font-medium transition-colors hover:border-[#C8447A]/30">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

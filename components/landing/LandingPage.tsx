"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const LandingPage = () => {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen font-sans bg-cream text-text1 overflow-x-hidden">
            {/* Stripe decorativo top */}
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-plum via-rose to-gold z-[60]" />

            {/* 1. NAV */}
            <nav className="fixed top-[3px] left-0 right-0 h-[80px] bg-white/90 backdrop-blur border-b border-borderlight z-50 flex items-center justify-between px-[20px] md:px-[40px]">
                <div onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">
                    <img src="/image.png" alt="ZAROS LATAM" className="h-[45px] object-contain" />
                </div>

                <div className="hidden md:block bg-cream border border-borderlight rounded-full px-4 py-1.5">
                    <span className="text-[0.75rem] tracking-wider text-text3 font-medium uppercase">
                        Método 3C · Programa Internacional
                    </span>
                </div>

                <button
                    onClick={() => router.push('/postula')}
                    className="bg-plum text-white text-[0.9rem] font-medium py-[10px] px-[24px] rounded-[50px] hover:bg-rose transition-colors shadow-md"
                >
                    Solicitar plaza →
                </button>
            </nav>

            {/* 2. HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream pt-[100px]">
                {/* Blobs background sutiles */}
                <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(108,59,165,0.05)_0%,transparent_70%)]" />
                <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,68,122,0.04)_0%,transparent_70%)]" />

                <div className="relative z-10 max-w-[800px] w-full mx-auto text-center px-[20px] pb-[40px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 }}
                        className="inline-flex items-center gap-2 bg-gold/7 border border-gold/35 rounded-full py-[8px] px-[22px] mb-[24px]"
                    >
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                        <span className="text-[0.75rem] font-bold text-gold uppercase tracking-wide">
                            Plazas abiertas · 26 de marzo
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-[16px]"
                    >
                        <span className="block text-[0.75rem] uppercase tracking-[0.3em] text-text3 mb-[16px]">
                            Programa Intensivo Internacional · Método 3C
                        </span>
                        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] text-text1 leading-[1.05] font-[300]">
                            No es un curso.<br />
                            <strong className="font-[700]">Es transformación</strong> <em className="italic text-rose">estructurada.</em>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-[32px] inline-block"
                    >
                        <h2 className="font-serif italic text-[1.4rem] md:text-[1.8rem] text-plum border-b border-gold/40 pb-1">
                            Liderazgo estratégico femenino en América Latina
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[1.1rem] text-text2 leading-[1.7] max-w-[580px] mx-auto mb-[40px] font-[300]"
                    >
                        Más de 200 mujeres han aplicado el Método 3C para transformar
                        su liderazgo con estructura real. Ahora abrimos una nueva
                        edición internacional con plazas limitadas.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 mb-[16px]">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => router.push('/postula')}
                                className="bg-plum text-white font-medium text-[1rem] py-[16px] px-[40px] rounded-[50px] shadow-lg hover:bg-rose transition-colors"
                            >
                                Solicitar mi plaza →
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => document.getElementById('metodo-3c')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-transparent border border-plum/25 text-plum font-medium text-[1rem] py-[16px] px-[40px] rounded-[50px] hover:bg-plum/5 transition-colors"
                            >
                                Conocer el Método 3C
                            </motion.button>
                        </div>
                        <span className="text-[0.8rem] text-text3">
                            🔒 Solo 20 plazas · Aplicación con filtro · Respuesta en 48h
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="border-t border-borderlight bg-white py-[40px] px-[20px]">
                <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { num: "200+", label: "Mujeres formadas", color: "text-plum" },
                        { num: "20", label: "Plazas disponibles", color: "text-gold" },
                        { num: "10", label: "Días en vivo", color: "text-rose" },
                        { num: "12", label: "Países LATAM", color: "text-plum" },
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className={`font-serif text-[2.8rem] font-[700] leading-none mb-2 ${stat.color}`}>
                                {stat.num}
                            </div>
                            <div className="text-[0.75rem] uppercase tracking-widest text-text2 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. SECCIÓN MÉTODO 3C */}
            <section id="metodo-3c" className="bg-plum2 py-[100px] px-[20px] relative overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,68,122,0.15)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(108,59,165,0.2)_0%,transparent_70%)] pointer-events-none" />

                <div className="max-w-[1100px] mx-auto relative z-10">
                    <div className="text-center mb-[60px]">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-gold" />
                            <span className="text-gold uppercase tracking-[0.2em] text-[0.8rem]">El fundamento</span>
                            <div className="w-12 h-[1px] bg-gold" />
                        </div>
                        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white mb-6">
                            El liderazgo no es intuición.<br />
                            <em className="italic text-[#F3AEC6]">Es estructura.</em>
                        </h2>
                        <p className="text-white/55 text-[1.1rem] max-w-[600px] mx-auto font-[300]">
                            El Método 3C ha sido diseñado específicamente para mujeres que
                            buscan solidificar su presencia, ganar claridad de acción y
                            desarrollar una ventaja competitiva real.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
                        {[
                            {
                                num: "01",
                                title: "Confianza",
                                letter: "C",
                                desc: "Sin confianza no hay voz. Construiremos los cimientos de tu autoridad personal para que ocupes el espacio que mereces sin dudar."
                            },
                            {
                                num: "02",
                                title: "Compromiso",
                                letter: "C",
                                desc: "Sin compromiso no hay resultados. Aprenderás a ejecutar con disciplina y alinear tus acciones diarias con tu visión estratégica a largo plazo."
                            },
                            {
                                num: "03",
                                title: "Competitividad",
                                letter: "C",
                                desc: "Sin competitividad no hay proyección. Te daremos las herramientas para destacar, diferenciarte y liderar en un mercado exigente."
                            }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-[48px_36px] hover:bg-white/10 transition-colors relative overflow-hidden group">
                                <div className="absolute top-4 right-4 text-[6rem] font-serif font-bold text-white/[0.03] leading-none pointer-events-none group-hover:scale-110 transition-transform">
                                    {card.num}
                                </div>
                                <div className="font-serif text-[5rem] font-bold bg-gradient-to-br from-gold to-gold-l text-transparent bg-clip-text leading-none mb-6 group-hover:translate-x-2 transition-transform">
                                    {card.letter}
                                </div>
                                <h3 className="font-serif text-[1.5rem] text-white mb-4">{card.title}</h3>
                                <p className="text-white/50 font-[300] text-[0.95rem] leading-[1.6]">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SECCIÓN PROGRAMAS */}
            <section className="bg-cream py-[100px] px-[20px]">
                <div className="max-w-[1100px] mx-auto">
                    <div className="text-center mb-[60px]">
                        <span className="block text-[0.8rem] uppercase tracking-[0.2em] text-text3 mb-4">Los programas</span>
                        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-plum mb-4">
                            Tres niveles, <em className="italic text-rose">un mismo propósito</em>
                        </h2>
                        <p className="text-text2 text-[1.05rem] max-w-[600px] mx-auto">
                            Nuestra IA analiza tu perfil y te recomienda el nivel ideal.
                            No es para todas — es para mujeres listas para estructura real.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
                        {/* Nivel I */}
                        <div className="bg-white border border-borderlight p-[40px_30px] rounded-[4px] flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
                            <div className="bg-plum/7 text-violet text-[0.75rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                                Nivel I · Fundacional
                            </div>
                            <div className="w-full h-[180px] rounded-[4px] overflow-hidden mb-2">
                                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover" alt="Nivel I" />
                            </div>
                            <span className="text-[0.7rem] uppercase tracking-widest text-text3 font-medium">Programa Intensivo</span>
                            <h3 className="font-serif text-[1.6rem] text-plum font-bold leading-tight">Confianza Estratégica</h3>
                            <p className="text-[0.9rem] text-text2 mb-4 line-clamp-3">
                                Para mujeres que quieren ganar estructura, encontrar su voz de liderazgo y construir una red estratégica.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {["10 días en vivo", "Método 3C", "Red LATAM", "Certificación"].map((c, i) => (
                                    <span key={i} className="text-[0.7rem] bg-cream px-2 py-1 rounded border border-borderlight text-text2">
                                        {c}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto w-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-serif text-[2rem] font-bold text-plum">$297</span>
                                    <span className="text-[0.7rem] uppercase tracking-wider text-rose border border-rose/30 px-2 py-0.5 rounded-full">Precio fundadoras</span>
                                </div>
                                <button onClick={() => router.push('/postula')} className="w-full border border-plum text-plum hover:bg-plum hover:text-white transition-colors py-3 px-4 rounded-[4px] text-[0.9rem] font-medium flex justify-between items-center group">
                                    Solicitar plaza <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>

                        {/* Nivel II - Featured */}
                        <div className="bg-plum border border-plum p-[40px_30px] rounded-[4px] flex flex-col items-start gap-4 shadow-2xl relative z-10 md:translate-y-[-8px]">
                            <div className="bg-rose/20 text-[#F3AEC6] text-[0.75rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 border border-rose/30">
                                ★ Nivel II · Avanzado
                            </div>
                            <div className="w-full h-[180px] rounded-[4px] overflow-hidden mb-2">
                                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover" alt="Nivel II" />
                            </div>
                            <span className="text-[0.7rem] uppercase tracking-widest text-white/50 font-medium">Programa Intensivo</span>
                            <h3 className="font-serif text-[1.6rem] text-white font-bold leading-tight">Marca y Proyección</h3>
                            <p className="text-[0.9rem] text-white/60 mb-4 line-clamp-3">
                                Para líderes con base que quieren posicionarse estratégicamente y construir su marca personal con impacto real en el mercado.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {["10 días en vivo", "Método 3C", "Marca personal", "Certificación"].map((c, i) => (
                                    <span key={i} className="text-[0.7rem] bg-white/10 px-2 py-1 rounded border border-white/10 text-white/70">
                                        {c}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto w-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-serif text-[2rem] font-bold text-gold-l">$297</span>
                                    <span className="text-[0.7rem] uppercase tracking-wider text-gold-l border border-gold-l/30 px-2 py-0.5 rounded-full">Precio fundadoras</span>
                                </div>
                                <button onClick={() => router.push('/postula')} className="w-full bg-gold-l text-plum hover:bg-gold transition-colors py-3 px-4 rounded-[4px] text-[0.9rem] font-bold flex justify-between items-center group">
                                    Solicitar plaza <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>

                        {/* Nivel III */}
                        <div className="bg-white border border-borderlight p-[40px_30px] rounded-[4px] flex flex-col items-start gap-4 hover:shadow-lg transition-shadow">
                            <div className="bg-gold/12 text-gold text-[0.75rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                                Nivel III · Expert
                            </div>
                            <div className="w-full h-[180px] rounded-[4px] overflow-hidden mb-2">
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover" alt="Nivel III" />
                            </div>
                            <span className="text-[0.7rem] uppercase tracking-widest text-text3 font-medium">Programa Intensivo</span>
                            <h3 className="font-serif text-[1.6rem] text-plum font-bold leading-tight">Liderazgo Multiplicador</h3>
                            <p className="text-[0.9rem] text-text2 mb-4 line-clamp-3">
                                Para mujeres con trayectoria que quieren mentorear a otras, generar impacto social y publicar a nivel internacional.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {["10 días en vivo", "Método 3C", "Revista Int.", "Certificación"].map((c, i) => (
                                    <span key={i} className="text-[0.7rem] bg-cream px-2 py-1 rounded border border-borderlight text-text2">
                                        {c}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto w-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-serif text-[2rem] font-bold text-plum">$297</span>
                                    <span className="text-[0.7rem] uppercase tracking-wider text-rose border border-rose/30 px-2 py-0.5 rounded-full">Precio fundadoras</span>
                                </div>
                                <button onClick={() => router.push('/postula')} className="w-full border border-plum text-plum hover:bg-plum hover:text-white transition-colors py-3 px-4 rounded-[4px] text-[0.9rem] font-medium flex justify-between items-center group">
                                    Solicitar plaza <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. TESTIMONIOS */}
            <section className="bg-white py-[100px] px-[20px]">
                <div className="text-center mb-[60px]">
                    <span className="block text-[0.8rem] uppercase tracking-[0.2em] text-text3 mb-4">Transformaciones reales</span>
                    <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-plum mb-4">
                        Antes y después <em className="italic text-rose">del Método 3C</em>
                    </h2>
                </div>
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            nombre: "Andrea M.",
                            pais: "Ecuador",
                            nivel: "Programa Nivel I",
                            texto: "Antes postergaba mis decisiones por inseguridad. Hoy lidero mi propio proyecto con claridad estratégica. Zaros no es motivación — es método.",
                            inicial: "A"
                        },
                        {
                            nombre: "Carolina R.",
                            pais: "Colombia",
                            nivel: "Programa Nivel II",
                            texto: "Construí mi marca personal desde cero. Hoy tengo visibilidad real en mi industria y clientes que me buscan por mi posicionamiento.",
                            inicial: "C"
                        },
                        {
                            nombre: "Valeria S.",
                            pais: "México",
                            nivel: "Programa Nivel III",
                            texto: "Mentorear a otras mujeres es ahora mi propósito profesional. El Nivel III me dio las herramientas para multiplicar el impacto más allá de mí.",
                            inicial: "V"
                        }
                    ].map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="bg-cream border border-borderlight rounded-[4px] p-[32px] relative"
                        >
                            <span className="absolute top-4 right-6 font-serif text-[6rem] text-plum/5 leading-none pointer-events-none">"</span>
                            <div className="flex flex-col gap-4 relative z-10 h-full">
                                <p className="text-text1 font-[400] text-[1.05rem] leading-[1.7] flex-grow">
                                    "{t.texto}"
                                </p>
                                <div className="mt-4 pt-4 border-t border-borderlight flex items-center gap-3">
                                    <div className="w-[40px] h-[40px] rounded-full bg-plum flex items-center justify-center text-white font-serif font-bold text-[1.1rem]">
                                        {t.inicial}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-text1 text-[0.95rem]">{t.nombre}</span>
                                            <span className="text-[0.75rem] text-text3">{t.pais}</span>
                                        </div>
                                        <span className="bg-rose/8 text-rose text-[0.65rem] font-bold px-2 py-0.5 rounded-[2px] w-fit mt-1 uppercase tracking-widest">{t.nivel}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 6. CTA FINAL */}
            <section className="bg-plum2 py-[100px] px-[20px] text-center relative overflow-hidden flex flex-col items-center">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px)' }}></div>

                <div className="relative z-10 max-w-[800px] mx-auto flex flex-col items-center">
                    <div className="inline-block border border-gold/30 text-gold-l text-[0.75rem] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
                        ⚡ Cierre de aplicaciones · 7 días
                    </div>

                    <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] text-white mb-[24px] leading-tight font-[300]">
                        ¿Lista para un <em className="italic text-gold-l">siguiente nivel real?</em>
                    </h2>

                    <p className="text-white/70 text-[1.1rem] leading-[1.7] max-w-[500px] mb-[48px] font-[300]">
                        No es un programa para curiosas. Es para mujeres que ya no
                        quieren postergar su liderazgo. Son 20 plazas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-[40px] w-full max-w-[600px]">
                        <div className="flex-1 bg-white/4 border border-white/10 rounded-[8px] p-[24px] text-center flex flex-col justify-center">
                            <span className="text-[0.8rem] text-white/50 uppercase tracking-widest mb-2 font-medium">Precio oficial</span>
                            <span className="font-serif text-[2.5rem] text-white font-bold leading-none mb-1">$497</span>
                            <span className="text-[0.75rem] text-white/40">después del lanzamiento</span>
                        </div>
                        <div className="flex-1 bg-gold/8 border border-gold/40 rounded-[8px] p-[24px] text-center flex items-center justify-center relative flex-col">
                            <span className="absolute -top-3 bg-gold text-plum2 text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Featured</span>
                            <span className="text-[0.8rem] text-gold-l uppercase tracking-widest mb-2 font-medium">Precio fundadoras</span>
                            <span className="font-serif text-[2.5rem] text-gold-l font-bold leading-none mb-1">$297</span>
                            <span className="text-[0.75rem] text-gold-l/70">solo esta semana · 20 plazas</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => router.push('/postula')}
                            className="w-full max-w-[400px] bg-gradient-to-r from-gold to-gold-l text-plum2 font-bold text-[1.1rem] py-[18px] px-[40px] rounded-[50px] shadow-[0_0_20px_rgba(184,146,74,0.3)] transition-all"
                        >
                            Solicitar mi plaza →
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => document.getElementById('metodo-3c')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-white/60 font-medium text-[0.95rem] py-[10px] px-[30px] rounded-[50px] border border-white/20 hover:bg-white/5 transition-colors"
                        >
                            Ver el programa completo
                        </motion.button>
                        <div className="mt-4 text-[0.8rem] text-white/40">
                            🔒 Aplicación con filtro · Solo 20 plazas · Respuesta en 48h
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FOOTER */}
            <footer className="bg-[#0F0520] py-[40px] px-[40px] border-t border-white/5">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-white/40 text-[0.85rem] flex flex-col items-center md:items-start gap-1">
                        <img src="/image.png" alt="ZAROS LATAM" className="h-[40px] object-contain mb-2 brightness-[0] invert-[1]" />
                        <span>© 2025 Zaros Latam · Método 3C · Programa Intensivo Internacional</span>
                    </div>

                    <div className="flex gap-8 text-white/40 text-[0.85rem] uppercase tracking-widest font-medium">
                        <a href="https://www.instagram.com/zaros.latam" target="_blank" rel="noopener noreferrer" className="hover:text-gold-l transition-colors">Instagram</a>
                        <a href="https://www.linkedin.com/company/zaros-latam/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-l transition-colors">LinkedIn</a>
                        <a href="https://zaros-latam.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-l transition-colors">Web</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};


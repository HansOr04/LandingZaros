"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { convertTimeSlotsToCountry, getCountryDisplayName } from '@/lib/timezones';

interface TimeSlotPickerProps {
    date: Date;
    selectedTime: string;
    onChange: (t: string) => void;
    country: string;
}

export const TimeSlotPicker = ({ date, selectedTime, onChange, country }: TimeSlotPickerProps) => {
    // Basic Spanish formatting (manual without date-fns to keep it simple, or with standard Intl)
    const formatter = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    const formattedDate = formatter.format(date);

    // Capitalize first letter
    const labelDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    // Convert Ecuador slots (3pm-6pm) to user's local timezone
    const timeSlots = useMemo(() => {
        return convertTimeSlotsToCountry(country);
    }, [country]);

    const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchAvailableSlots = async () => {
            setIsLoading(true);
            setUnavailableSlots([]);
            try {
                // Pass date as YYYY-MM-DD
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                const dateParam = `${yyyy}-${mm}-${dd}`;

                const res = await fetch(`/api/slots?date=${dateParam}`);
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted && data.takenSlots) {
                        setUnavailableSlots(data.takenSlots);
                    }
                }
            } catch (err) {
                console.error("Error fetching available slots", err);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchAvailableSlots();

        return () => { isMounted = false; };
    }, [date]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-[#EBE3F0]"
        >
            <div className="flex items-start justify-between mb-4">
                <p className="text-[0.95rem] font-bold text-[#5A4870]">
                    Horarios disponibles – {labelDate}
                </p>
                <span className="text-[0.75rem] text-[#9B8EB0] bg-[#6C3BA5]/10 px-3 py-1 rounded-full">
                    3pm-6pm Ecuador
                </span>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8447A]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-6 gap-2">
                    {timeSlots.map((slotInfo) => {
                        const isAvailable = !unavailableSlots.includes(slotInfo.ecuador);
                        const isSelected = selectedTime === slotInfo.ecuador;
                        const slot = slotInfo.ecuador;

                        if (!isAvailable) {
                            return (
                                <div key={slot} className="opacity-30 cursor-not-allowed py-[8px] px-[4px] text-center rounded-[9px] border-[1.5px] border-[#DDD4E8] bg-[#FAF7F2] text-[#5A4870] font-sans text-[0.75rem] flex flex-col items-center select-none" title="Horario no disponible">
                                    <span className="line-through">{slotInfo.local}</span>
                                    <span className="text-[0.6rem] text-[#9B8EB0]">{slotInfo.ecuador}</span>
                                </div>
                            );
                        }

                        return (
                            <button
                                key={slot}
                                type="button"
                                onClick={() => onChange(slot)}
                                className={`transition-all duration-200 py-[8px] px-[4px] text-center rounded-[9px] border-[1.5px] font-sans text-[0.75rem] font-semibold flex flex-col items-center justify-center
                                ${isSelected
                                        ? 'bg-[#3B1260] border-[#3B1260] text-white shadow-[0_4px_12px_rgba(59,18,96,0.2)]'
                                        : 'border-[#DDD4E8] bg-[#FAF7F2] text-[#5A4870] hover:border-[#C8447A]/40 hover:text-[#C8447A] hover:bg-[#C8447A]/5'}`}
                            >
                                <span>{slotInfo.local}</span>
                                <span className={`text-[0.6rem] ${isSelected ? 'text-white/70' : 'text-[#9B8EB0]'}`}>{slotInfo.ecuador}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            <AnimatePresence>
                {selectedTime && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="mt-[18px] flex items-center gap-[12px] p-[16px_20px] rounded-[14px] border border-[#C8447A]/20 bg-gradient-to-br from-[#3B1260]/5 to-[#C8447A]/5"
                    >
                        <div className="w-[32px] h-[32px] shrink-0 rounded-full bg-white flex items-center justify-center text-[1.1rem] shadow-sm">
                            ✅
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[#3B1260] text-[0.95rem]">
                                {labelDate} · {(() => {
                                    const slotInfo = timeSlots.find(s => s.ecuador === selectedTime);
                                    return slotInfo ? `${slotInfo.local} (${slotInfo.ecuador} ${getCountryDisplayName(country)})` : selectedTime;
                                })()}
                            </span>
                            <span className="text-[#5A4870] text-[0.8rem]">
                                30 min · Google Meet con el equipo Zaros
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

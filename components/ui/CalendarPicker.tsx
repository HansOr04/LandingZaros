"use client"
import React, { useState } from 'react';
import { TimeSlotPicker } from './TimeSlotPicker';

interface CalendarPickerProps {
    selectedDate: Date | null;
    selectedTime: string;
    onDateChange: (d: Date) => void;
    onTimeChange: (t: string) => void;
    country: string;
}

export const CalendarPicker = ({ selectedDate, selectedTime, onDateChange, onTimeChange, country }: CalendarPickerProps) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    // Shift index so Monday is first day of the week
    const firstDayOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Check if showing past months
    const isPastMonth = currentMonth.getFullYear() < today.getFullYear() ||
        (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() <= today.getMonth());

    const handlePrevMonth = () => {
        if (!isPastMonth) {
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        }
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateSelect = (dayNum: number) => {
        const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
        onDateChange(d);
        onTimeChange(''); // Reset time when date changes
    };

    return (
        <div className="bg-white border border-[#EBE3F0] rounded-[24px] overflow-hidden shadow-[0_12px_48px_rgba(59,18,96,0.13)]">
            {/* Header */}
            <div className="p-[22px_26px_18px] border-b border-[#EBE3F0] flex items-center gap-4">
                <div className="w-[46px] h-[46px] shrink-0 rounded-[13px] bg-gradient-to-br from-[#3B1260] to-[#6C3BA5] flex items-center justify-center text-xl shadow-inner">
                    🗓️
                </div>
                <div className="flex flex-col">
                    <h4 className="font-serif text-[1.1rem] font-bold text-[#1E0E35]">Entrevista con el equipo Zaros</h4>
                    <span className="text text-[0.8rem] text-[#9B8EB0]">30 minutos · Videollamada · Google Meet</span>
                </div>
            </div>

            {/* Calendar Body */}
            <div className="p-6">

                {/* Month Nav */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={isPastMonth}
                        className={`w-[34px] h-[34px] flex items-center justify-center rounded-[9px] border bg-[#FAF7F2] transition-colors ${isPastMonth ? 'opacity-40 cursor-not-allowed border-[#DDD4E8] text-[#9B8EB0]' : 'border-[#DDD4E8] text-[#5A4870] hover:bg-[#3B1260] hover:text-white hover:border-[#3B1260]'}`}
                    >
                        ‹
                    </button>
                    <span className="font-serif font-bold text-[#1E0E35] text-[1.05rem]">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-[34px] h-[34px] flex items-center justify-center rounded-[9px] border border-[#DDD4E8] bg-[#FAF7F2] text-[#5A4870] transition-colors hover:bg-[#3B1260] hover:text-white hover:border-[#3B1260]"
                    >
                        ›
                    </button>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-y-2 mb-2">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
                        <div key={i} className={`text-center text-[0.75rem] font-bold mb-2 ${(i === 5 || i === 6) ? 'text-[#C8447A]/60' : 'text-[#9B8EB0]'}`}>
                            {d}
                        </div>
                    ))}

                    {/* Offset Empty Cells */}
                    {Array.from({ length: firstDayOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}

                    {/* Actual Days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);

                        // Check availability
                        const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
                        // For simplicity, we just check day/month/year instead of absolute timestamp for past days 
                        // to avoid timezone issues zeroing out the time
                        const isPast = dateObj.setHours(23, 59, 59, 999) < today.getTime();
                        const isAvailable = !isWeekend && !isPast;

                        // Formatting states
                        const isToday = dateObj.toDateString() === today.toDateString();
                        const isSelected = selectedDate?.toDateString() === dateObj.toDateString();

                        if (!isAvailable) {
                            return (
                                <div key={dayNum} className="aspect-square flex items-center justify-center text-[0.9rem] font-medium text-[#5A4870] opacity-35 cursor-default relative">
                                    {isToday && <div className="absolute inset-1 rounded-[10px] border border-[#C8447A]/30"></div>}
                                    {dayNum}
                                </div>
                            );
                        }

                        return (
                            <div key={dayNum} className="aspect-square p-[3px]">
                                <button
                                    type="button"
                                    onClick={() => handleDateSelect(dayNum)}
                                    className={`w-full h-full flex items-center justify-center rounded-[10px] text-[0.9rem] transition-all
                                    ${isSelected
                                            ? 'bg-[#C8447A] text-white border-[1.5px] border-[#C8447A] shadow-[0_4px_12px_rgba(200,68,122,0.3)] font-bold'
                                            : isToday
                                                ? 'bg-white border-[1.5px] border-[#6C3BA5]/40 text-[#6C3BA5] font-bold hover:bg-[#C8447A]/5 hover:border-[#C8447A]/40'
                                                : 'bg-[#FAF7F2] border-[1.5px] border-[#EBE3F0] text-[#1E0E35] font-medium hover:bg-[#C8447A]/5 hover:border-[#C8447A]/30 hover:text-[#C8447A]'
                                        }`}
                                >
                                    {dayNum}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Expanding Time Picker Context */}
                {selectedDate && (
                    <TimeSlotPicker
                        date={selectedDate}
                        selectedTime={selectedTime}
                        onChange={onTimeChange}
                        country={country}
                    />
                )}
            </div>
        </div>
    );
};

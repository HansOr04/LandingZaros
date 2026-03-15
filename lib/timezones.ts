/**
 * Timezone configuration and utilities for scheduling interviews
 * All base times are in Ecuador timezone (ECT - UTC-5)
 * Interview window: 15:00 - 18:00 (3pm - 6pm) Ecuador time
 */

export const TIMEZONE_BY_COUNTRY: Record<string, string> = {
    'ecuador': 'America/Guayaquil',      // ECT UTC-5
    'peru': 'America/Lima',              // PET UTC-5
    'colombia': 'America/Bogota',        // COT UTC-5
    'chile': 'America/Santiago',         // CLT UTC-3 (or CLST UTC-4)
    'argentina': 'America/Argentina/Buenos_Aires', // ART UTC-3
    'brasil': 'America/Sao_Paulo',       // BRT UTC-3 (or BRST UTC-2)
    'venezuela': 'America/Caracas',      // VET UTC-4
    'paraguay': 'America/Asuncion',      // PYT UTC-4 (or PYST UTC-3)
    'uruguay': 'America/Montevideo',     // UYT UTC-3 (or UYST UTC-2)
    'bolivia': 'America/La_Paz',         // BOT UTC-4
    'mexico': 'America/Mexico_City',     // CST UTC-6 (or CDT UTC-5)
    'espana': 'Europe/Madrid',           // CET UTC+1 (or CEST UTC+2)
    'costa-rica': 'America/Costa_Rica',
    'panama': 'America/Panama',
    'el-salvador': 'America/El_Salvador',
    'honduras': 'America/Tegucigalpa',
    'nicaragua': 'America/Managua',
    'guatemala': 'America/Guatemala',
};

// Ecuador interview window (always in Ecuador timezone)
const INTERVIEW_START_HOUR = 15; // 3pm
const INTERVIEW_END_HOUR = 18;   // 6pm (exclusive, so 5:59:59pm is last)
const BASE_TIMEZONE = 'America/Guayaquil';

/**
 * Get the timezone for a country
 */
export function getTimezoneForCountry(country: string): string {
    const normalized = country.toLowerCase().trim();
    return TIMEZONE_BY_COUNTRY[normalized] || TIMEZONE_BY_COUNTRY['ecuador'];
}

/**
 * Get available time slots in Ecuador time (15:00-18:00, every 30 minutes)
 */
export function getEcuadorTimeSlots(): string[] {
    return ['15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
}

/**
 * Convert Ecuador time slots to user's local timezone
 * @param country The user's country
 * @returns Array of [ecuadorTime, localTime] pairs
 */
export function convertTimeSlotsToCountry(country: string): Array<{ ecuador: string; local: string; hour: number }> {
    const userTimezone = getTimezoneForCountry(country);
    const baseSlots = getEcuadorTimeSlots();

    const converted = baseSlots.map((ecuadorTime) => {
        const [hours, minutes] = ecuadorTime.split(':').map(Number);

        const ecuadorFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: BASE_TIMEZONE,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const userFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: userTimezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        // Create a test date to calculate timezone offsets
        const testDate = new Date(2026, 2, 4, 12, 0, 0); // arbitrary time

        // Get offset for Ecuador timezone
        const ecuadorTestStr = ecuadorFormatter.format(testDate);
        const [eHour, eMin] = ecuadorTestStr.split(':').map(Number);
        const ecuadorOffset = (testDate.getUTCHours() - eHour) * 60 + (testDate.getUTCMinutes() - eMin);

        // Get offset for user's timezone
        const userTestStr = userFormatter.format(testDate);
        const [uHour, uMin] = userTestStr.split(':').map(Number);
        const userOffset = (testDate.getUTCHours() - uHour) * 60 + (testDate.getUTCMinutes() - uMin);

        // Calculate the difference
        const timeDiff = (ecuadorOffset - userOffset) / 60; // in hours

        // Apply the difference to the Ecuador time
        let localHour = hours - timeDiff;
        let localMin = minutes;

        // Handle day wrapping
        if (localHour < 0) {
            localHour += 24;
        } else if (localHour >= 24) {
            localHour -= 24;
        }

        const localTimeStr = `${String(Math.floor(localHour)).padStart(2, '0')}:${String(localMin).padStart(2, '0')}`;

        return {
            ecuador: ecuadorTime,
            local: localTimeStr,
            hour: Math.floor(localHour),
        };
    });

    return converted;
}

/**
 * Get message about interview times
 */
export function getInterviewTimeMessage(country: string): string {
    const timezone = getTimezoneForCountry(country);
    if (timezone === BASE_TIMEZONE) {
        return 'Entrevista disponible entre las 3pm y 6pm (hora Ecuador)';
    }
    return `Entrevista disponible entre las 3pm y 6pm hora Ecuador (tu zona horaria)`;
}

/**
 * Get short country name for display
 */
export function getCountryDisplayName(country: string): string {
    const countryMap: Record<string, string> = {
        'ecuador': 'Ecuador',
        'peru': 'Perú',
        'colombia': 'Colombia',
        'chile': 'Chile',
        'argentina': 'Argentina',
        'brasil': 'Brasil',
        'venezuela': 'Venezuela',
        'paraguay': 'Paraguay',
        'uruguay': 'Uruguay',
        'bolivia': 'Bolivia',
        'mexico': 'México',
        'espana': 'España',
        'costa-rica': 'Costa Rica',
        'panama': 'Panamá',
        'el-salvador': 'El Salvador',
        'honduras': 'Honduras',
        'nicaragua': 'Nicaragua',
        'guatemala': 'Guatemala',
    };

    const normalized = country.toLowerCase().trim();
    return countryMap[normalized] || country;
}

declare type DatePreference = {
    date?: {
        short?: string;
        long?: string;
    };
    time?: {
        short: string;
        long: string;
    };
};
declare const setPreference: (preference: DatePreference) => void;
declare global {
    interface Date {
        dateOnly(): Date;
        toDateOnlyJSON(): string;
        startOfDay(): Date;
        clone(): Date;
        endOfDay(): Date;
        merge(source: Date): Date;
        quarter(): number;
        addDays(days: number): Date;
        daysInMonth(): Date;
        startOfMonth(): Date;
        endOfMonth(): Date;
        startOfQuarter(): Date;
        endOfQuarter(): Date;
        startOfWeek(): Date;
        endOfWeek(): Date;
        startOfYear(): Date;
        endOfYear(): Date;
        yesterday(): Date;
        lastWeek(): Date;
        lastMonth(): Date;
        lastYear(): Date;
        lastQuarter(): Date;
        tomorrow(): Date;
        nextWeek(): Date;
        nextMonth(): Date;
        nextQuarter(): Date;
        nextYear(): Date;
        formatAsShortDate(): string;
        formatAsLongDate(): string;
        formatAsShortTime(): string;
        formatAsLongTime(): string;
        assumeUTCAsLocal(): Date;
        assumeLocalAsUTC(): Date;
        timeAgo(): string;
        uniqueNumber(): number;
        format(format: string): string;
    }
}
export { setPreference, DatePreference };

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
    }
}
export {};

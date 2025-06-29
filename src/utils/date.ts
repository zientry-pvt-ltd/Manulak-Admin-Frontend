import moment from "moment";

import { DateFormatPatterns } from "@/constants";
import type { DateFormat, TimeFormat } from "@/customTypes/date.types";

export const formatDate = (
  date: moment.MomentInput,
  format: DateFormat = DateFormatPatterns.DATE_ISO,
) => moment(date).format(format);

export const formatDateTime = (
  date: moment.MomentInput,
  format: DateFormat = DateFormatPatterns.DATETIME_SHORT,
) => moment(date).format(format);

export const formatTime = (date: Date, format = "HH:mm") =>
  moment(date).format(format);

export const timeFromNow = (date: Date) => moment(date).fromNow();

export const timeToNow = (date: Date) => moment(date).toNow();

export const isToday = (date: Date) => moment(date).isSame(moment(), "day");

export const isTomorrow = (date: Date) =>
  moment(date).isSame(moment().add(1, "day"), "day");

export const isPast = (date: Date) => moment(date).isBefore(moment());

export const isFuture = (date: Date) => moment(date).isAfter(moment());

export const isSameDate = (a: Date, b: Date) => moment(a).isSame(b, "day");

export const isWithinRange = (date: Date, start: Date, end: Date) =>
  moment(date).isBetween(start, end, undefined, "[]");

export const getDateRange = (start: Date, end: Date, format = "YYYY-MM-DD") => {
  const range = [];
  let current = moment(start);
  while (current.isSameOrBefore(end)) {
    range.push(current.format(format));
    current = current.add(1, "day");
  }
  return range;
};

export const getDuration = (
  start: Date,
  end: Date,
  unit: moment.unitOfTime.Diff = "days",
) => moment(end).diff(moment(start), unit);

export const formatDuration = (ms: number) => {
  const duration = moment.duration(ms);
  return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
};

export const parseDate = (dateStr: string, format = "YYYY-MM-DD") =>
  moment(dateStr, format);

export const getStartOfDay = (date: Date) => moment(date).startOf("day");

export const getEndOfDay = (date: Date) => moment(date).endOf("day");

export const getStartOfWeek = (date: Date) => moment(date).startOf("week");

export const getEndOfWeek = (date: Date) => moment(date).endOf("week");

export const getStartOfMonth = (date: Date) => moment(date).startOf("month");

export const getEndOfMonth = (date: Date) => moment(date).endOf("month");

export const getCurrentDateParts = () => {
  const now = moment();
  return {
    year: now.year(),
    month: now.month() + 1,
    day: now.date(),
    hour: function (timeFormat: TimeFormat = "24") {
      const formattedHour =
        timeFormat === "12" ? now.format("hh") : now.format("HH");
      return parseInt(formattedHour, 10);
    },
    minute: now.minute(),
    period: moment().format("A") as "AM" | "PM",
  };
};

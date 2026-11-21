import { describe, expect, it } from "vitest";
import { getTimeLeft } from "@/lib/countdown";
import { getDirectionsUrl } from "@/lib/maps";
import { weddingDetails } from "@/data/weddingDetails";

describe("wedding rules", () => {
  it("counts down to Wednesday 02 December 2026, 04:45 AM IST", () => {
    const target = new Date(weddingDetails.muhurtham.isoDateTime);
    expect(target.toISOString()).toBe("2026-12-01T23:15:00.000Z");
    expect(weddingDetails.muhurtham.dayLabel).toBe("Wednesday");
    expect(weddingDetails.muhurtham.timeLabel).toBe("04:45 AM");
  });

  it("splits remaining time into days, hours, minutes and seconds", () => {
    const target = new Date("2026-12-02T04:45:00+05:30");
    const now = new Date("2026-11-30T03:44:30+05:30");
    expect(getTimeLeft(target, now)).toEqual({ days: 2, hours: 1, minutes: 0, seconds: 30, isPast: false });
  });

  it("reports the wedding as arrived once the muhurtham has passed", () => {
    const target = new Date("2026-12-02T04:45:00+05:30");
    const later = new Date("2026-12-02T05:00:00+05:30");
    expect(getTimeLeft(target, later).isPast).toBe(true);
  });

  it("builds directions from the venue name and address, without coordinates", () => {
    const url = getDirectionsUrl(weddingDetails.venue.name, weddingDetails.venue.address);
    expect(url).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=Sridevi%20Function%20Hall%20A%2Fc%2C%20Ramavaram%20Road%2C%20Polamuru",
    );
  });
});

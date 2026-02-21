"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";
import { SlidingNumber } from "@/components/core/sliding-number";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (targetDate: string): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
};

const TimerUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-1 px-2">
    <span className="font-accent text-4xl font-bold tabular-nums text-primary overflow-hidden block">
      <SlidingNumber value={value} padStart />
    </span>
    <span className="font-accent text-[10px] uppercase tracking-widest text-muted-foreground">
      {label}
    </span>
  </div>
);

interface UpcomingEvent {
  title: string;
  description: string;
  date: string;
  type: "course" | "workshop";
}

const upcomingEvents: UpcomingEvent[] = [
  {
    title: "Anger & Aggression Masterclass",
    description:
      "A 3-day intensive workshop on understanding the neuroscience of anger and developing healthy expression frameworks.",
    date: "2026-04-15T10:00:00",
    type: "workshop",
  },
  {
    title: "Advanced Shadow Work",
    description:
      "8-week deep course exploring Jungian archetypes, dream analysis, and active imagination for personal transformation.",
    date: "2026-05-01T10:00:00",
    type: "course",
  },
  {
    title: "Men's Circle Facilitation",
    description:
      "Learn to hold space and facilitate psychologically-informed men's circles in your community.",
    date: "2026-06-10T10:00:00",
    type: "workshop",
  },
];

const EventCard = ({ event }: { event: UpcomingEvent }) => {
  const timeLeft = useCountdown(event.date);
  const [notified, setNotified] = useState(false);
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function handleNotify() {
    if (notified) return;
    setNotified(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col rounded-lg border border-border bg-card p-7 sm:p-8 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
    >
      <div className="mb-4 flex items-center gap-2 overflow-hidden">
        <span className="font-accent rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
          {event.type}
        </span>
      </div>

      <h3 className="font-heading text-xl text-card-foreground">{event.title}</h3>

      <p className="font-body mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {event.description}
      </p>

      <div className="mt-5 flex items-center gap-4 text-muted-foreground">
        <span className="font-body flex items-center gap-1.5 text-xs">
          <Calendar className="h-3.5 w-3.5" /> {formattedDate}
        </span>
      </div>

      {/* Countdown */}
      <div className="mt-6 rounded-xl bg-secondary px-4 py-5 overflow-hidden">
        <p className="font-body mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> Starts in
        </p>
        <div className="flex items-center justify-center gap-1">
          <TimerUnit value={timeLeft.days} label="Days" />
          <span className="font-accent pb-5 text-2xl text-muted-foreground/40 select-none">:</span>
          <TimerUnit value={timeLeft.hours} label="Hrs" />
          <span className="font-accent pb-5 text-2xl text-muted-foreground/40 select-none">:</span>
          <TimerUnit value={timeLeft.minutes} label="Min" />
          <span className="font-accent pb-5 text-2xl text-muted-foreground/40 select-none">:</span>
          <TimerUnit value={timeLeft.seconds} label="Sec" />
        </div>
      </div>

      <motion.div whileTap={{ scale: 0.97 }} className="mt-6">
        <Button
          variant={notified ? "default" : "outline"}
          className="font-body relative w-full overflow-hidden text-sm transition-colors duration-300"
          onClick={handleNotify}
          disabled={notified}
        >
          <AnimatePresence mode="wait" initial={false}>
            {notified ? (
              <motion.span
                key="notified"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5"
              >
                <CheckCheck className="h-4 w-4" />
                You&apos;re on the list!
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5"
              >
                <Bell className="h-4 w-4" />
                Notify Me
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </motion.div>
  );
};

const UpcomingSection = () => {
  return (
    <section id="upcoming" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Coming Soon"
          title="Upcoming Programs & Workshops"
          description="Reserve your spot in our next evidence-based programs. Limited seats available."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;

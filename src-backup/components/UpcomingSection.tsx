import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

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
  <div className="flex flex-col items-center">
    <span className="font-accent text-3xl font-bold text-primary sm:text-4xl">
      {String(value).padStart(2, "0")}
    </span>
    <span className="font-accent mt-1 text-xs uppercase tracking-wider text-muted-foreground">
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
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="font-accent rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
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
      <div className="mt-5 rounded-lg bg-secondary p-4">
        <p className="font-body mb-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> Starts in
        </p>
        <div className="flex justify-between">
          <TimerUnit value={timeLeft.days} label="Days" />
          <span className="font-accent self-start pt-1 text-2xl text-muted-foreground">:</span>
          <TimerUnit value={timeLeft.hours} label="Hrs" />
          <span className="font-accent self-start pt-1 text-2xl text-muted-foreground">:</span>
          <TimerUnit value={timeLeft.minutes} label="Min" />
          <span className="font-accent self-start pt-1 text-2xl text-muted-foreground">:</span>
          <TimerUnit value={timeLeft.seconds} label="Sec" />
        </div>
      </div>

      <Button variant="outline" className="font-body mt-5 w-full text-sm">
        Notify Me
      </Button>
    </motion.div>
  );
};

const UpcomingSection = () => {
  return (
    <section id="upcoming" className="bg-secondary py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Coming Soon"
          title="Upcoming Courses & Workshops"
          description="Reserve your spot in our next evidence-based programs. Limited seats available."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;

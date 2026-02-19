"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, HelpCircle, Pencil, Lock, Eye } from "lucide-react";
import type { ChapterWithLessons, Lesson } from "@/types/database";

interface SyllabusAccordionProps {
    chapters: ChapterWithLessons[];
}

const lessonTypeIcon = (type: Lesson["type"]) => {
    switch (type) {
        case "video":
            return <Video className="h-3.5 w-3.5" />;
        case "pdf":
            return <FileText className="h-3.5 w-3.5" />;
        case "quiz":
            return <HelpCircle className="h-3.5 w-3.5" />;
        case "exercise":
            return <Pencil className="h-3.5 w-3.5" />;
    }
};

export default function SyllabusAccordion({ chapters }: SyllabusAccordionProps) {
    return (
        <Accordion type="multiple" className="space-y-2">
            {chapters.map((chapter, idx) => (
                <AccordionItem
                    key={chapter.id}
                    value={chapter.id}
                    className="rounded-lg border border-border bg-card"
                >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                            <span className="font-accent text-xs text-muted-foreground">
                                {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="font-heading text-sm font-semibold text-card-foreground">
                                {chapter.title}
                            </span>
                            <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
                                {chapter.lessons.length} lessons
                            </Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4">
                        <ul className="space-y-2 pt-2">
                            {chapter.lessons.map((lesson) => (
                                <li
                                    key={lesson.id}
                                    className="flex items-center justify-between gap-3 rounded-md py-1.5"
                                >
                                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                        <span className="text-primary/70">
                                            {lessonTypeIcon(lesson.type)}
                                        </span>
                                        <span className="font-body">{lesson.title}</span>
                                        {lesson.preview && (
                                            <span className="flex items-center gap-1 rounded bg-accent/20 px-1.5 py-0.5 text-xs text-accent-foreground">
                                                <Eye className="h-3 w-3" />
                                                Preview
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2">
                                        {lesson.duration && (
                                            <span className="font-accent text-xs text-muted-foreground">
                                                {lesson.duration}
                                            </span>
                                        )}
                                        {!lesson.preview && (
                                            <Lock className="h-3 w-3 text-muted-foreground/50" />
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

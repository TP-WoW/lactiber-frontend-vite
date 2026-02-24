import type { DataType } from "@/types/types";
import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  ChartAreaIcon,
  PencilIcon,
  TextCursorInput,
  CalendarDays,
  DecimalsArrowRight,
  type LucideProps,
  Grid2X2,
  ToggleRight,
  CaseSensitive,
  CircleCheck,
  Circle,
  ChevronDownCircle,
  CalendarClock,
} from "lucide-react";
import type { ForwardRefExoticComponent } from "react";

// This is sample data.
export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Production",
      logo: GalleryVerticalEnd,
      plan: "Lactiber",
    },
    {
      name: "Engineering",
      logo: AudioWaveform,
      plan: "Lactiber",
    },
    {
      name: "QA",
      logo: Command,
      plan: "Lactiber",
    },
  ],
  navMain: [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: ChartAreaIcon,
      isActive: true,
      items: [
        {
          title: "home",
          url: "/dashboard",
        },
        {
          title: "forms",
          url: "/dashboard/forms",
        },
        {
          title: "notifications",
          url: "/dashboard/notifications",
        },
      ],
    },
    {
      title: "designer",
      url: "#",
      icon: Frame,
      items: [
        {
          title: "forms",
          url: "/designer/forms",
        },
        {
          title: "workflows",
          url: "/designer/workflows",
        },
        {
          title: "lookups",
          url: "/designer/lookups",
        },
        {
          title: "database",
          url: "/designer/database",
        },
      ],
    },
    {
      title: "documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "arquitectura",
          url: "/docs",
        },
        {
          title: "getStarted",
          url: "/docs/get-started",
        },
        {
          title: "tutorials",
          url: "/docs/tutorials",
        },
        {
          title: "changelog",
          url: "/docs/changelog",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: PencilIcon,
    },
  ],
};

export const toolItems: {
  type: DataType;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  tooltip: string;
}[] = [
  {
    type: "text",
    icon: TextCursorInput,
    tooltip: "textInput",
  },
  {
    type: "number",
    icon: DecimalsArrowRight,
    tooltip: "numberInput",
  },
  {
    type: "date",
    icon: CalendarDays,
    tooltip: "dateInput",
  },
  {
    type: "select",
    icon: ChevronDownCircle,
    tooltip: "selectInput",
  },
  {
    type: "radio",
    icon: Circle,
    tooltip: "radioInput",
  },
  {
    type: "checkbox",
    icon: CircleCheck,
    tooltip: "checkboxInput",
  },
  {
    type: "textarea",
    icon: CaseSensitive,
    tooltip: "textareaInput",
  },
  {
    type: "switch",
    icon: ToggleRight,
    tooltip: "switchInput",
  },
  {
    type: "panel",
    icon: Grid2X2,
    tooltip: "panelInput",
  },
  {
    type: "sample",
    icon: CalendarClock,
    tooltip: "sampleInput",
  },
];

export const sampleFrecuencies = [
  { label: "1 minuto", value: "60" },
  { label: "5 minutos", value: "300" },
  { label: "10 minutos", value: "600" },
  { label: "30 minutos", value: "1800" },
  { label: "1 hora", value: "3600" },
  { label: "2 horas", value: "7200" },
  { label: "6 horas", value: "21600" },
  { label: "12 horas", value: "43200" },
  { label: "24 horas", value: "86400" },
];

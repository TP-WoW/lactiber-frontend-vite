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
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartAreaIcon,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/dashboard",
        },
        {
          title: "Forms",
          url: "/dashboard/forms",
        },
        {
          title: "Notifications",
          url: "/dashboard/notifications",
        },
      ],
    },
    {
      title: "Designer",
      url: "#",
      icon: Frame,
      items: [
        {
          title: "Forms",
          url: "/designer/forms",
        },
        {
          title: "Workflows",
          url: "/designer/workflows",
        },
        {
          title: "Lookups",
          url: "/designer/lookups",
        },
        {
          title: "Database",
          url: "/designer/database",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
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
    tooltip: "Text Input",
  },
  {
    type: "number",
    icon: DecimalsArrowRight,
    tooltip: "Number Input",
  },
  {
    type: "date",
    icon: CalendarDays,
    tooltip: "Date Input",
  },
  {
    type: "select",
    icon: ChevronDownCircle,
    tooltip: "Select Input",
  },
  {
    type: "radio",
    icon: Circle,
    tooltip: "Radio Input",
  },
  {
    type: "checkbox",
    icon: CircleCheck,
    tooltip: "Checkbox Input",
  },
  {
    type: "textarea",
    icon: CaseSensitive,
    tooltip: "Textarea Input",
  },
  {
    type: "switch",
    icon: ToggleRight,
    tooltip: "Switch Input",
  },
  {
    type: "panel",
    icon: Grid2X2,
    tooltip: "Panel Input",
  },
  {
    type: "sample",
    icon: CalendarClock,
    tooltip: "Sample Input",
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

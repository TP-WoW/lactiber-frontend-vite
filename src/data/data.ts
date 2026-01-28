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
  UserRoundPen,
  Grid2X2,
  ToggleRight,
  CaseSensitive,
  CircleCheck,
  Circle,
  ChevronDownCircle,
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
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
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
    type: "custom",
    icon: UserRoundPen,
    tooltip: "Custom Input",
  },
];

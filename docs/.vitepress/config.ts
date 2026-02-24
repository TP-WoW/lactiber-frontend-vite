import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lactiber",
  description: "Web Forms",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/arquitectura/" },
    ],

    sidebar: [
      {
        text: "Web Forms",
        items: [
          {
            text: "Arquitectura",
            link: "/arquitectura",
            items: [
              {
                text: "FrontEnd",
                collapsed: true,
                items: [
                  { text: "Home (componente)", link: "/frontEnd/home" },
                  {
                    text: "Dashboard (componente)",
                    link: "/frontEnd/dashboard",
                  },
                  { text: "Forms (componente)", link: "/frontEnd/forms" },
                  { text: "Form / CustomForm", link: "/frontEnd/form" },
                  { text: "FormDesigner", link: "/frontEnd/form-designer" },
                  { text: "FormEditor", link: "/frontEnd/form-editor" },
                ],
              },
              {
                text: "BackEnd",
                collapsed: true,
                items: [
                  { text: "API REST", link: "/backEnd/webapi" },
                  { text: "Planificador", link: "/backEnd/worker" },
                  { text: "Variables de entorno", link: "/backEnd/env" },
                ],
              },
            ],
          },
          { text: "Despliegue", link: "/deployment/README" },
          { text: "Troubleshooting", link: "/troubleShooting/README" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

# Árbol de relaciones: Páginas y componentes

Este documento describe de forma concisa las páginas principales de la aplicación y los componentes funcionales que utilizan, junto con una breve descripción de cada uno.

**Páginas**
- **Home**: página de inicio, vista general del producto.
- **Dashboard**: usa componentes de interfaz (tarjetas) para mostrar KPI y resúmenes; usa `Card`, `CardHeader`, `CardContent`, `CardTitle`.
- **Forms**: lista las instancias de formularios; usa `DataTable` (form-report-table/data-table) y el diálogo `AddNewFormInstance`.
- **Form**: pantalla para ver/llenar una instancia; usa `DynamicForm` para renderizar formularios dinámicos y `Badge` para metadatos.
- **FormDesigner**: diseñador de formularios con tabla y controles; usa `ui/data-table`, `ui/dialog`, `ui/label`, `ui/input`, `ui/button`.
- **FormEditor**: editor arrastrable de componentes del formulario; usa `dnd/DndContainer`, `ui/button`, `ui/tooltip` y el diálogo `AddCustomComponentDialog`.
- **CreateForm**: formulario para crear nuevos formularios (workflow de creación).
- **Database**: gestión y vistas relacionadas con datos almacenados.
- **Lookups**: gestión de catálogos y búsquedas.
- **Notifications**: centro de notificaciones.
- **Settings**: configuración de la aplicación.
- **Workflows**: gestión de flujos y procesos.

**Componentes funcionales (src/components)**
- **app-sidebar.tsx**: barra lateral principal con navegación del proyecto y accesos.
- **nav-main.tsx / nav-projects.tsx / nav-user.tsx**: menús y navegación superior / lateral.
- **dynamic-form.tsx**: componente que renderiza un formulario a partir de un schema (campos, validaciones y envío).
- **custom-dialogs.tsx**: conjunto de diálogos reutilizables (p. ej. `AddNewFormInstance`, `AddCustomComponentDialog`).
- **FormAttributeDrawer.tsx**: cajón lateral para editar atributos de un campo/componente del formulario.
- **DraggableKPI.tsx**: componente de KPI arrastrable para dashboard.
- **theme-provider.tsx / theme-toggle.tsx**: gestión de tema (claro/oscuro) y proveedor de contexto de tema.

**Submódulos importantes**
- **dnd/**: contenedor y componentes para drag & drop (p. ej. `DndContainer`, `DndComponents.tsx`). Usado por `FormEditor`.
- **form-report-table/**: tablas y utilidades para mostrar datos/reportes de formularios (`data-table.tsx`, `data.json`).
- **dnd-example/**: ejemplos y utilidades de DnD usados para referencia y pruebas.
- **ui/**: biblioteca de componentes UI reutilizables (primitivas y layout):
  - **button.tsx**: botones estilizados.
  - **input.tsx / textarea.tsx / select.tsx / radio-group.tsx / checkbox.tsx**: controles de formulario.
  - **label.tsx / field.tsx**: etiquetas y envoltorios de campo.
  - **dialog.tsx / drawer.tsx / popover.tsx / tooltip.tsx**: elementos de interacción.
  - **table.tsx / data-table.tsx**: tablas reutilizables.
  - **card.tsx / avatar.tsx / badge.tsx**: componentes de presentación.

**Contextos y hooks**
- **contexts/**
  - `form-editor-context.tsx`: estado y acciones del editor de formularios.
  - `sidebar-context.ts`: estado de la barra lateral (abierta/cerrada, sección activa).
  - `theme-provider-context.ts`: contexto del tema.
  - `user-context-provider.tsx` / `user-context.ts`: gestión de usuario y sesión.
- **hooks/**
  - `use-formEditor.ts`: hook con lógica del editor (selección, propiedades, persistencia).
  - `use-mobile.ts`: detección de dispositivo móvil / responsive helpers.
  - `use-sidebar.ts`: control de comportamiento de la sidebar.
  - `use-theme.ts`: conmutador y persistencia del tema.
  - `use-user.ts`: helpers para usuario y permisos.

**Otros**
- **lib/utils.ts**: utilidades compartidas (formatos, ayudas pequeñas).
- **types/types.ts**: tipos TypeScript usados por la aplicación.

---

Notas y próximos pasos sugeridos:
- Revisar cada página y componente para ampliar la descripción con ejemplos de uso (props importantes, events).
- Añadir diagramas (Mermaid) para visualizar dependencias si se desea.

Archivo generado automáticamente por la documentación inicial.

# Componente: FormEditor

**Ubicación:** `src/pages/FormEditor.tsx`

**Resumen:**

Editor visual de formularios con capacidades drag & drop. Permite añadir componentes estándar y componentes personalizados, ordenar items, guardar atributos y publicar formularios.

**Responsabilidad:**

- Proveer experiencia de edición de formularios (arrastrar, soltar, reordenar, propiedades).
- Integrarse con el `FormEditorProvider` y el hook `useFormEditor` para gestionar el estado del editor.
- Persistir cambios en atributos de formulario y exponer acciones de guardado/ publicación.

**Implementación (puntos clave):**

- Componente principal `FormEditor` envuelve `FormEditorInner` con `FormEditorProvider` (recibe `formId` desde query string).
- `FormEditorInner` usa `useFormEditor()` para obtener `items` y `setItems`.
- Renderiza la barra de herramientas `ComponentToolsBar` (botones para añadir campos/ paneles/ componentes personalizados) y un `DndContainer` para mostrar los items cuando existen.
- Funciones principales:
  - `handleAddNewItem`: añade componentes estándar o carga componentes personalizados desde la API y los inserta (crea panel + children).
  - `handleSave`: serializa `items` y los POSTea a `/api/form-attributes`.
  - `handlePublish`: PUT a `/api/forms/publish/:id`.
- Usa `sonner` para feedback y `lucide-react` para iconos.

**Interacciones y rutas:**

- Ruta de edición: `/designer/forms/form?id=<formId>` (lee `id` desde `window.location.search`).

**Extensiones recomendadas:**

- Añadir confirmaciones y undo/redo para cambios en el editor.
- Validación client-side y manejo de conflictos (p. ej. multiusuario editando el mismo formulario).
- Exportar una vista previa del formulario renderizado por `DynamicForm` para ver el resultado final.

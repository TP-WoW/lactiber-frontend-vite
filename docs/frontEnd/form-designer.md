# Componente: FormDesigner

**Ubicación:** `src/pages/FormDesigner.tsx`

**Resumen:**

Interfaz para listar y crear formularios en el sistema; muestra una tabla de formularios (`DataTable`) y un diálogo para añadir nuevos (`AddNewFormDialog`).

**Responsabilidad:**

- Obtener la lista de formularios desde la API (`/api/forms`).
- Renderizar un listado con columnas configuradas y ofrecer la posibilidad de crear nuevos formularios vía `Dialog`.

**Implementación (puntos clave):**

- Define `columns: ColumnDef<FormInfo>[]` que alimentan `DataTable`.
- Usa `useEffect` para llamar a `fetchForms` al montar.
- `AddNewFormDialog` encapsula UI y lógica para crear un formulario y refrescar la lista mediante `updateFormList`.
- Usa `useTranslation` para strings localizados.

**Interacciones y rutas:**

- Ruta asociada: `/designer/forms`.

**Extensiones recomendadas:**

- Añadir paginación y búsqueda en `DataTable`.
- Validaciones en el formulario de creación y manejo de errores al POSTear al backend.
- Extraer la lógica de fetch a `actions` reutilizables para facilitar testing.

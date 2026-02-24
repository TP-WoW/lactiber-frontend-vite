# Componente: Forms

**Ubicación:** `src/pages/Forms.tsx`

**Resumen:**

Página que lista formularios publicados y muestra reportes asociados en una tabla. Obtiene formularios y reportes mediante acciones (`getAllForms`, `getAllFormReports`), transforma los datos y los pasa a `DataTable` para visualización.

**Responsabilidad:**

- Cargar y transformar datos de formularios y reportes.
- Mostrar contadores y estadísticas breves (reportes última semana, completados, pendientes).
- Proveer un diálogo para crear nuevas instancias (`AddNewFormInstance`).

**Implementación (puntos clave):**

- Usa `useEffect` para ejecutar `fetchForms` y `fetchFormReports` al montar.
- Transforma los `FormReport` a `TransformedReport` ajustando campos y formateando `createdAt`.
- Usa `DataTable` de `src/components/form-report-table/data-table` para renderizar los reportes.
- Envuelto con `memo` para optimización.

**Interacciones y rutas:**

- Ruta asociada: `/dashboard/forms`.
- `AddNewFormInstance` recibe `forms` como prop para permitir crear instancias relacionadas.

**Extensiones recomendadas:**

- Manejar estados de carga y error cuando las acciones fallan.
- Paginación y filtros en `DataTable` para grandes volúmenes de reportes.
- Extraer transformaciones a utilitarios testables si la lógica crece.

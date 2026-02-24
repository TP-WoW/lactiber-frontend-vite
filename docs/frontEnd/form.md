# Componente: Form (CustomForm)

**Ubicación:** `src/pages/Form.tsx` (exporta `CustomForm`)

**Resumen:**

Vista para mostrar y enviar una instancia de formulario dinámica. Obtiene los parámetros del reporte (`fetchReportParameters`) y renderiza el formulario mediante `DynamicForm`.

**Responsabilidad:**

- Cargar atributos/parametrizaciones del reporte (campos del formulario).
- Mostrar metadatos (nombre, descripción, estado) y badge de estado.
- Manejar el envío de los valores del formulario (`handleSubmit`) y dar feedback al usuario (toasts).

**Implementación (puntos clave):**

- Lee `reportId` desde `URLSearchParams` obtenida de `useLocation`.
- Usa `useEffect` para ejecutar la petición `fetchReportParameters(reportId)` y transforma la respuesta con `keysToCamelCase`.
- Estado local `reportParams: ReportAttribute[]` contiene la estructura usada por `DynamicForm`.
- `DynamicForm` recibe `attributes`, `onSubmit` e `isEditable` según `ReportStatus`.
- Utiliza `useTranslation` para textos y `sonner` para toasts.

**Interacciones y rutas:**

- Ruta de ejemplo: `/dashboard/forms/form?reportId=...` (registrada en `src/App.tsx`).

**Extensiones recomendadas:**

- Validaciones cliente y manejo robusto de errores en fetch/submit.
- Soporte offline o guardado temporal para formularios largos.
- Documentar el contrato de la API que devuelve los parámetros del reporte para facilitar el mantenimiento.

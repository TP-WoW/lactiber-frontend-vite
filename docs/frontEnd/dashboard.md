# Componente: Dashboard

**Ubicación:** `src/pages/Dashboard.tsx`

**Resumen:**

Página principal del panel de control que muestra KPIs resumidos (reportes iniciados, pendientes, notificaciones sin leer y workflows ejecutados). Obtiene datos mediante una función de fetch simulada (`fetchDashboardData`) y los muestra en tarjetas interactuables.

**Responsabilidad:**

- Mostrar indicadores clave de la aplicación.
- Proveer accesos rápidos a secciones relacionadas (por ejemplo, navegar a `/dashboard/forms`).

**Implementación (puntos clave):**

- Usa `useState` para almacenar `kpis` y `useEffect` para cargar datos al montar.
- Consume `useUser` para mostrar saludo personalizado cuando hay sesión.
- Usa `useNavigate` y `onClick` en las `Card` para navegar a rutas relacionadas.
- Importa y usa componentes UI: `Card`, `CardHeader`, `CardContent`, `CardTitle`.
- Iconos provistos por `lucide-react` (p. ej. `FileText`, `Bell`).

**Ruta:**

- Registrado en `src/App.tsx` como `/dashboard`.

**Extensiones recomendadas:**

- Reemplazar la función simulada `fetchDashboardData` por llamadas reales a la API y manejar errores/estado de carga.
- Añadir tests unitarios para la lógica de mapeo de KPIs.
- Permitir refresco manual y filtros por periodo.

**Ejemplo reducido:**

```tsx
// Obtiene kpis y renderiza tarjetas con onClick para navegar
useEffect(() => { fetchDashboardData().then(setKpis); }, []);
```

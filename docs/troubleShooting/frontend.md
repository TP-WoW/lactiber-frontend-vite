# Problemas Frontend y Build

Síntomas comunes:

- La UI muestra errores en consola (React errors) o pantalla en blanco.
- Recursos 404 (JS/CSS) al desplegar la app.
- Errores en llamadas fetch (CORS, network error).
- Diferencias entre entorno dev y producción (ENV variables, base paths).

Diagnóstico:

- Abrir consola del navegador (DevTools) y revisar `Console` y `Network`.
- Verificar que `import.meta.env` variables estén definidas en el entorno de build.
- Revisar la ruta base en `vite.config.ts` si los assets no se cargan.

Comprobaciones rápidas:

```bash
# Ejecutar build local y servir el build
npm run build
npx serve dist
```

Errores de React (componentes):

- Revisar stack trace en consola para ubicar componente y línea.
- Asegurar que props estén definidos antes de renderizar (uso de optional chaining o condiciones).

CORS y llamadas API:

- Asegúrate que el backend devuelva `Access-Control-Allow-Origin` para el origen del frontend.
- En dev, configurar proxy en `vite.config.ts` para evitar CORS durante local development:

```ts
// vite.config.ts
export default defineConfig({
  server: { proxy: { '/api': 'http://localhost:3000' } }
})
```

Insights y soluciones:

- Errores en producción por rutas: revisar `base` en Vite y rutas absolutas usadas en la app.
- Builds que incluyen módulos no transpileados: ajustar `optimizeDeps` o `esbuild` settings.
- React que crashea por props null: mejorar guardas y tipos (TypeScript), añadir tests y manejo de errores en componentes críticos.

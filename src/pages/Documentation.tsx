import { memo } from 'react';

const Documentation = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Documentation</h2>
      <p className="mb-2">La documentación generada está disponible en el servidor local de documentación:</p>
      <p className="mb-4">
        <a href={import.meta.env.VITE_DOCS_BASE_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline">{import.meta.env.VITE_DOCS_BASE_URL}</a>
      </p>
      <p className="text-sm text-muted-foreground">Abre el enlace en una nueva pestaña. Si usas un certificado autofirmado, acepta el aviso del navegador.</p>
    </div>
  );
};

export default memo(Documentation);
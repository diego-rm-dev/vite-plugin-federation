import React, { Suspense, lazy } from 'react';

// Importamos el componente remoto. 
// Nótese la ruta: "remote1/App" coincide con expose: { './App': './src/App.tsx' }
// Y con la clave remotes: { remote1: ... } en la config de vite
const RemoteApp = lazy(() => import('remote1/App'));
const RemoteSecond = lazy(() => import('remote2/App'));

export default function Remote1() {
    return (
        <div style={{ margin: 20 }}>
            <h1>Remotes Apps </h1>

            <Suspense fallback={<div>Cargando remote...</div>}>
                <RemoteApp />
                <RemoteSecond />
            </Suspense>
        </div>
    );
}

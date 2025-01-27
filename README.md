Below is an updated **README** that focuses on the new single-command setup using the **`setup.js`** script in the project’s root directory.

---

# **Module Federation with Vite and React – Host and Remote Applications**

This repository provides an example of how to implement **Module Federation** using `@module-federation/vite` in a **React** and **Vite** environment. The project consists of:

- **Host Application** – The main application that consumes remote components.
- **Microservice 1** – A remote application that exposes components to the host.
- **Microservice 2** – Another remote application exposing additional components.

## **Versions Used**

This example is based on the following package versions:

- **`@module-federation/vite`**: `^1.2.1`
- **`react`**: `^18.3.1`
- **`react-dom`**: `^18.3.1`

---

## **Getting Started**

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/your-repo/module-federation-vite-example.git
```

Navigate into the project directory:

```bash
cd module-federation-vite-example
```

### **Step 2: One-Command Setup**

In the **root** of the repository, run:

```bash
npm run setup
```

This command will:

1. Install dependencies for:
   - **Host** (`host`)
   - **Microservice-1** (`microservice-1`)
   - **Microservice-2** (`microservice-2`)
2. Start both microservices.
3. Finally, start the host application.

### **Step 3: Access the Application**

Once all applications are running, open your browser and navigate to:

```
http://localhost:3000/
```

You should see the host application loading components from **microservice-1** and **microservice-2**.

---

## **Project Structure**

```
module-federation-vite-example/
│-- host/               # Main application (Host)
│-- microservice-1/     # First microservice (Remote 1)
│-- microservice-2/     # Second microservice (Remote 2)
│-- setup.js            # Automation script
│-- package.json        # Root package with "setup" script
└-- README.md
```

---

## **Configuration Overview**

Each project contains a `vite.config.ts` file with the necessary configuration for module federation.

### **Host Configuration (`host/vite.config.ts`)**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'host',
            remotes: {
                remote1: {
                    type: 'module',
                    name: 'remote1',
                    entry: 'http://localhost:3001/remoteEntry.js',
                },
                remote2: {
                    type: 'module',
                    name: 'remote2',
                    entry: 'http://localhost:3002/remoteEntry.js',
                },
            },
            shared: ['react', 'react-dom'],
        }),
    ],
    build: {
        target: 'esnext',
        minify: false,
    },
    server: {
        port: 3000,
    },
});
```

### **Remote Configuration (`microservice-1/vite.config.ts` and `microservice-2/vite.config.ts`)**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'remote1', // or 'remote2', depending on the microservice
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App.tsx',
            },
            shared: ['react', 'react-dom'],
        }),
    ],
    build: {
        target: 'esnext',
        minify: false,
    },
    server: {
        port: 3001, // Change to 3002 for microservice-2
    },
});
```

---

## **Understanding Key Configuration Options**

### **Federation Plugin Options**

- **`name`**: Defines the name of the module (host or remote).
- **`remotes`**: Specifies remote applications that the host can consume.
- **`entry`**: The URL where the remote module is exposed.
- **`exposes`**: Declares the components or modules made available by the remote.
- **`shared`**: Lists shared dependencies between host and remotes to avoid duplication.

### **Build Options**

- **`target`**:  
  Defines the JavaScript version for output.  
  - `"esnext"` allows the latest JavaScript features without additional transformation.
  - Can be changed to older versions like `"es2015"` for broader browser support.

- **`minify`**:  
  Controls whether the code should be minified (compressed).  
  - `false`: No minification, useful for debugging.
  - `true`: Minifies the code for production, improving performance.

---

## **Rendering Remote Components**

In the host application, you can dynamically render remote components as follows:

```javascript
import React, { Suspense, lazy } from 'react';

// Import remote components dynamically
const RemoteApp = lazy(() => import('remote1/App'));
const RemoteSecond = lazy(() => import('remote2/App'));

export default function Remote1() {
    return (
        <div style={{ margin: 20 }}>
            <h1>Remote Apps</h1>
            <Suspense fallback={<div>Loading remote...</div>}>
                <RemoteApp />
                <RemoteSecond />
            </Suspense>
        </div>
    );
}
```

### **Explanation:**

- **`lazy`**: Dynamically imports the remote component at runtime.
- **`Suspense`**: Provides a loading fallback while the remote component is being fetched.
- **Import Paths**:  
  - `"remote1/App"` matches the `exposes` key in the `microservice-1` configuration.
  - `"remote2/App"` matches the `exposes` key in the `microservice-2` configuration.

---

## **Troubleshooting**

If you encounter issues, ensure:

1. Microservices **`microservice-1`** and **`microservice-2`** are running before or alongside the **host**.
2. No port conflicts occur (3000 for host, 3001 and 3002 for remotes).
3. The same versions of `react` and `react-dom` are installed across all applications.
4. Your browser cache is cleared if module federation updates are not reflected.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contributing**

Feel free to submit issues and pull requests to enhance this example.

---

# AstroJr 🪐

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**AstroJr** es una aplicación web inmersiva construida con Next.js y Three.js, diseñada para explorar cuerpos celestes de manera interactiva.

## 🚀 Características

- 🌌 **Visualización 3D**: Renderizado de planetas y modelos 3D usando `@react-three/fiber` con un motor de física personalizado.
- 🪐 **Mecánica Orbital Real**: Implementación de elementos keplerianos precisos (excentricidad, inclinación, nodos ascendentes).
- 🔭 **Sistemas Especiales**:
    - **Urano**: Órbitas perpendiculares respetando su inclinación axial extrema (97.7°).
    - **Plutón-Caronte**: Simulación de sistema binario con proporciones de tamaño y órbitas sincronizadas.
    - **Tritón**: Órbitas retrógrada real alrededor de Neptuno.
    - **Haumea**: Representación no esférica (forma de elipsoide) y rotación ultra-rápida.
    - **Cometa Halley**: Trayectoria altamente elíptica con cola dinámica que reacciona a la proximidad del Sol.
- 🌌 **Fondo Dinámico**: Universo esférico envolvente de 360° con shader de gradiente y 5,000 estrellas dinámicas que reaccionan al movimiento de la cámara.
- ☄️ **Contexto Espacial**: Cinturón de Asteroides y Cinturón de Kuiper generados mediante sistemas de partículas optimizados.
- ⚡ **Performance**: Optimizado con Next.js (App Router) y lazy loading de modelos 3D.
- 🎨 **Diseño Moderno**: Estilizado con Tailwind CSS v4 para una apariencia premium y futurista.
- 🔥 **Backend Serverless**: Integración con Firebase para gestión de datos educativos y científicos.
- 🐻 **Gestión de Estado**: Uso de Zustand para un manejo de estado global ligero y rápido.

## 🛠️ Stack Tecnológico

- **Frontend Core**: [React 19](https://react.dev/), [Next.js 16](https://nextjs.org/)
- **3D & Animación**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmndrs/drei), [Framer Motion](https://www.framer.com/motion/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend & DB**: [Firebase](https://firebase.google.com/)
- **Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)

## 📋 Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

- Node.js (v20 o superior recomendado)
- npm o yarn

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/usuario/astro-jr.git
   cd astro-jr
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**

   Copia el archivo de ejemplo y configura tus credenciales de Firebase:

   ```bash
   cp .env.example .env.local
   ```

   Edita `.env.local` con tus keys de Firebase.

4. **Iniciar servidor de desarrollo**

   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

```text
astro-jr/
├── public/          # Assets estáticos
├── src/
│   ├── app/         # Rutas y layouts (Next.js App Router)
│   ├── components/  # Componentes React
│   │   ├── 3d/      # Componentes Three.js
│   │   └── ui/      # Componentes de interfaz de usuario
│   ├── hooks/       # Custom hooks
│   └── lib/         # Utilidades y configuración (Firebase, Store)
├── .env.local       # Variables de entorno (no commitear)
└── ...config files  # Configuraciones de herramientas
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos:

1. Haz un Fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-feature`).
3. Haz commit de tus cambios (`git commit -m 'feat: Agrega nueva feature'`). *Usa commits semánticos*.
4. Haz Push a la rama (`git push origin feature/nueva-feature`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

Hecho con explicita pasión por el código limpio. ✨

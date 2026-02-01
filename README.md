# AstroJr 🚀

Aplicación web interactiva para la exploración del sistema solar, diseñada para niños y entusiastas del espacio.

## 🌟 Características Principales

- 🪐 **Sistema Solar 3D**: Visualización interactiva de planetas, lunas y el Sol con órbitas precisas.
- 🌌 **Universo Realista**: Fondo dinámico de 360° con:
  - **10,000 Estrellas**: Generadas mediante un sistema de partículas optimizado por GPU.
  - **Efecto de Parpadeo**: Animación de centelleo asíncrona para cada estrella individual.
  - **Profundidad Constante**: Fondo que sigue a la cámara para simular distancias infinitas.
  - **Gradiente Espacial**: Shader de atmósfera profunda para mayor inmersión.
- 🔭 **Exploración Dinámica**: Selecciona cualquier cuerpo celeste para enfocar la cámara y descubrir detalles.
- ⚡ **Alto Rendimiento**: Implementado con React Three Fiber para una experiencia fluida de 60 FPS.

## 🛠️ Tecnologías

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **3D Engine**: [Three.js](https://threejs.org/) con [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Estilos**: Tailwind CSS
- **Estado**: Zustand
- **Shader Language**: GLSL (para efectos especiales del fondo y atmósfera)

## 🚀 Instalación y Desarrollo

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ClaudioCeppi83/astroJr.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🌌 Detalles Técnicos del Universo

El componente `ModernUniverseBackground` utiliza técnicas avanzadas de renderizado:
- **Zero Decay Lighting**: Iluminación solar constante que permite ver planetas lejanos con claridad.
- **Custom Shaders**: Los parpadeos y formas circulares de las estrellas se calculan en la GPU para minimizar el uso de CPU.
- **Render Order Management**: Asegura que el universo siempre sea el telón de fondo, sin conflictos de profundidad con las órbitas o planetas.

---
Hecho con ❤️ para los futuros astrónomos.

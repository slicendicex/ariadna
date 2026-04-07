---
trigger: always_on
---

# Ariadna — Generated Project Context

## Current Status
- **Stack**: React, TypeScript, Vite, Three.js, @react-three/fiber, @react-three/drei.
- **State**: Граф работает как живая структура данных: узлы хранятся в `useState` в `App.tsx`, поддерживается создание узлов через DOM-панель, выделение по клику, 2D DOM-карточка выделенного узла и статические рёбра.

## Folder Map
- `/.agents/` – Agent rules, skills, workflows, and prompts.
- `/docs/plans/` – Implementation plans:
  - `scene-initialization.md`
  - `camera-navigation.md`
  - `node-component.md`
  - `node-props.md`
  - `data-driven-nodes.md`
  - `node-selection.md`
  - `edges-static.md`
  - `node-card.md`
  - `node-creator.md`
- `/src/` – Source code directory.
  - `main.tsx` — Entry point mounting the React app.
  - `App.tsx` — Root coordinator: владеет `nodes` (useState), `edges`, `selectedNodeId`. Монтирует `<Scene>`, `<NodeCard>`, `<NodeCreator>`.
  - `Scene.tsx` — Принимает `nodes`, `edges`, `selectedNodeId`, `onSelectNode` как props. Только рендерит 3D-мир, без собственного стейта.
  - `/types/` – Shared type definitions.
    - `node.ts` — `NodeData` и `EdgeData` — единственный источник правды для типов графа.
  - `/scene/` – 3D components layer.
    - `Node3D.tsx` — 3D representation of a single Node element.
    - `Edge3D.tsx` — 3D line between two node positions, using `THREE.Line` via `<primitive>`.
  - `/ui/` – 2D DOM overlay components.
    - `NodeCard.tsx` — Фиксированная панель в правом верхнем углу. Показывает `title`, `id` (8 символов), `colorName` выделенного узла.
    - `NodeCreator.tsx` — Фиксированная форма в нижнем левом углу. Содержит палитру `NODE_PALETTE` (`{ hex, name }`), функции `computeNodePosition()` и `pickNodeEntry()`.
  - `index.css` — Basic global styles (full viewport, no overflow, `position: relative` на `.scene-container`).
- `package.json`, `vite.config.ts`, `tsconfig.json` — Build configuration.

## What Already Exists
- Initialized 3D rendering context (R3F Canvas) и базовое освещение.
- `OrbitControls` для навигации в 3D пространстве с помощью мыши.
- `<Node3D />` — переиспользуемый 3D-компонент, поддерживающий `position`, `color`, `isSelected`, `onClick`.
- Data-driven rendering: `Scene` рендерит узлы и рёбра из пропсов через `.map()`.
- Raycasting Selection: выделение узлов кликом (scale feedback), сброс по `onPointerMissed`.
- Static Edges: рёбра из `MOCK_EDGE_DATA`, безопасный пропуск при отсутствующем узле.
- **Node Card**: DOM-панель поверх WebGL (`position: absolute`), показывает `title`, `id`, `colorName` выделенного узла.
- **Node Creator**: DOM-форма создания узлов. Новый узел получает детерминированную позицию (сетка 4 колонки), цвет и его название из единой палитры `NODE_PALETTE`.
- **Shared types**: `NodeData` (`id`, `position`, `color`, `colorName`, `title`) и `EdgeData` живут в `src/types/node.ts`.

## What is Missing for Minimal Prototype
1. **State Architecture**: Полноценный in-memory store (Zustand) для масштабирования. Текущий `useState` в `App` достаточен для MVP.
2. **Edge creation UI**: Пользователь не может создавать рёбра.
3. **Node editing**: Нет возможности редактировать поля существующего узла.
4. **Persistence**: Граф сбрасывается при обновлении страницы.

---

## 📅 Architecture History

### [Update: React + Vite Skeleton]
- **New Files**: `vite.config.ts`, `tsconfig.json`, `index.html`, `src/App.tsx`, `src/main.tsx`, `src/index.css`.
- **Architectural Responsibilities**:
  - `App.tsx` serves as the top-level container where the 3D scene canvas and UI overlays will eventually be mounted.

### [Update: 3D Scene Initialization]
- **New Files**: `src/Scene.tsx`, `docs/plans/scene-initialization.md`.
- **Architectural Responsibilities**:
  - `Scene.tsx` инкапсулирует весь 3D-мир. Здесь находится компонент `<Canvas>` и базовый свет.
  - `@react-three/fiber` автоматически управляет WebGL-контекстом, рендер-циклом и масштабированием экрана.

### [Update: Camera Navigation]
- **New Files**: `docs/plans/camera-navigation.md`. Зависимость `@react-three/drei`.
- **Architectural Responsibilities**:
  - `OrbitControls` внутри `src/Scene.tsx` перехватывает события мыши на холсте и напрямую мутирует матрицу камеры (`PerspectiveCamera`), не затрагивая React state.
- **New Interactions**: Вращение камеры (ЛКМ), панорамирование (ПКМ), зум (Колесико).

### [Update: Node3D Component Extraction & Parametrization]
- **New Files**: `src/scene/Node3D.tsx`, `docs/plans/node-component.md`, `docs/plans/node-props.md`.
- **Architectural Responsibilities**:
  - `Scene` — верхнеуровневый композитор («что рисуем и где»), `Node3D` инкапсулирует 3D-отрисовку («как рисуем»).
- **New Interactions**: Внешнее конфигурирование узла через `Node3DProps`.

### [Update: Data-Driven Scene Rendering]
- **New Files**: `docs/plans/data-driven-nodes.md`.
- **Architectural Responsibilities**:
  - `Scene.tsx` преобразует массив данных в массив 3D-узлов через `.map()`.

### [Update: Node Click Selection]
- **New Files**: `docs/plans/node-selection.md`.
- **Architectural Responsibilities**:
  - `selectedNodeId` хранится в родителе (`Scene`, позже перенесён в `App`). `Node3D` поднимает клик наверх через `onClick`.
- **New Interactions**: Клик по сфере (scale 1.2x) и клик по фону (сброс) через Raycasting.

### [Update: Static 3D Edges]
- **New Files**: `src/scene/Edge3D.tsx`, `docs/plans/edges-static.md`.
- **Architectural Responsibilities**:
  - `Edge3D` — линия через `THREE.Line` + `<primitive>` (обход конфликта JSX `<line>` с SVG).
  - `Scene` разрешает позиции рёбер через `Array.find()` по ID; несуществующие endpoint'ы пропускаются.
- **New Interactions**: Граф выглядит как связная структура.
- **Unresolved Complexity Zones**:
  - Рёбра не реагируют на выделение смежного узла.
  - Нет UI для создания/удаления рёбер.

### [Update: DOM Node Card]
- **New Files**: `src/ui/NodeCard.tsx`, `docs/plans/node-card.md`.
- **Architectural Responsibilities**:
  - `App.tsx` стал владельцем `selectedNodeId` и данных узлов. `Scene.tsx` стал stateless — принимает пропсы.
  - `NodeCard` — тупой дисплейный компонент: `position: absolute` поверх `<Canvas>`, `pointerEvents: none`.
- **New Interactions**: При выделении узла в правом верхнем углу появляется карточка с данными.

### [Update: Node Creator + Shared Types]
- **New Files**: `src/types/node.ts`, `src/ui/NodeCreator.tsx`, `docs/plans/node-creator.md`.
- **Architectural Responsibilities**:
  - `NodeData` и `EdgeData` вынесены из `Scene.tsx` в `src/types/node.ts` — единственный источник правды для типов графа.
  - `NodeData` получила поля `colorName: string` (читаемое название) и `title: string` (имя узла). `color` хранит hex.
  - `nodes` переехали из статической константы в `useState` в `App.tsx`. `App` владеет данными и функцией `addNode()`.
  - `NodeCreator` содержит палитру `NODE_PALETTE ({ hex, name })` — единственное место, где живут цвета с именами. `pickNodeEntry()` возвращает оба значения при создании узла.
  - `NodeCard` читает `node.colorName` напрямую — без маппингов и зависимостей от палитры.
  - Позиция новых узлов детерминирована: `computeNodePosition(count)` формирует сетку 4 колонки.
  - ID новых узлов — `crypto.randomUUID()`.
- **New Interactions**: Пользователь вводит название, нажимает «Add Node» — новый узел появляется в 3D-сцене.
- **Unresolved Complexity Zones**:
  - Граф сбрасывается при обновлении страницы (нет персистентности).
  - Нет возможности редактировать или удалять узлы.
  - Новые узлы не соединяются рёбрами автоматически.

# DOM-карточка выделенного узла (Node Card Overlay)

Мы добавляем 2D DOM-панель поверх WebGL-холста. Она появляется при выделении узла и отображает базовую информацию.

## Новая архитектура компонентов

```
App.tsx               — владеет selectedNodeId и данными узлов
├── Scene.tsx         — получает selectedNodeId и onSelectNode через props
└── NodeCard.tsx      — получает node | null и рендерит DOM-панель
```

## Критерии приемки (Acceptance Criteria)
- `src/ui/NodeCard.tsx` — принимает `node: { id, color } | null`, рендерит панель или `null`.
- `App.tsx` — хранит `selectedNodeId`, ищет узел через `find()`, рендерит `<Scene>` и `<NodeCard>`.
- `Scene.tsx` — принимает `selectedNodeId` и `onSelectNode` как props (без внутреннего useState).
- Карточка позиционирована в правом верхнем углу (`position: absolute`).
- `scene-container` получает `position: relative` в `index.css`.
- Отображаемые поля: ID, Color. Position — пока нет.

## Затронутые файлы
- `src/ui/NodeCard.tsx` `[NEW]`
- `src/App.tsx` `[MODIFIED]`
- `src/Scene.tsx` `[MODIFIED]`
- `src/index.css` `[MODIFIED]`

## Что НЕ включено
- Редактирование данных.
- Карточка в 3D-позиции.
- Анимации.
- Новые зависимости.

# Панель создания узлов (Node Creator)

Пользователь вводит название узла и нажимает кнопку — новый узел появляется в 3D-сцене.

## Архитектурные решения
- `NodeData` и `EdgeData` вынесены в `src/types/node.ts`.
- `MOCK_NODE_DATA` переходит в `useState` в `App.tsx`.
- `title: string` — обязательное поле, у начальных узлов дефолтные названия.
- Позиция новых узлов — детерминированная сетка (4 колонки, строки снизу вверх).
- Цвет нового узла — циклический из палитры на основе `nodes.length`.
- ID — `crypto.randomUUID()`.

## Затронутые файлы
- `src/types/node.ts` `[NEW]` — единое место хранения типов графа.
- `src/ui/NodeCreator.tsx` `[NEW]` — форма создания узла.
- `src/App.tsx` `[MODIFIED]` — nodes в useState, addNode().
- `src/Scene.tsx` `[MODIFIED]` — импорт из types/node.
- `src/ui/NodeCard.tsx` `[MODIFIED]` — отображение title.

## Что НЕ включено
- Клик по сцене для размещения, drag, рёбра, редактирование, бэкенд.

# Feature: Editable Node Card

Мы хотим дать пользователю возможность редактировать данные узла (заголовок и содержимое) прямо через всплывающую карточку в DOM-интерфейсе. 

## Goal
Позволить редактировать `title` и новое поле `content` для выделенного узла в 2D-карточке (`NodeCard`), обновляя стейт приложения.

## Acceptance Criteria
- Интерфейс `NodeData` содержит обязательное поле `content: string`.
- Карточка `NodeCard` отображает `title` как `<input>`, и новое поле `content` как `<textarea>`.
- Изменение текста мгновенно вызывает коллбэк и обновляет массив `nodes` внутри `App.tsx`.
- Работа с интерфейсом карточки (клики, ввод текста) не ломает 3D-сцену (нажатие на инпут не должно вращать камеру через OrbitControls).
- Никаких новых зависимостей не добавлено.

## Files / Modules Affected
- **`src/types/node.ts`**:
  Свойство `content: string` добавляется в тип `NodeData`.
- **`src/App.tsx`**:
  - `INITIAL_NODES` получают дефолтный `content: ''`.
  - Фунцкия `addNode` теперь создает узел с `content: ''`.
  - Появляется функция `updateNodeUpdate(id: string, updates: Partial<NodeData>)`.
  - `NodeCard` получает пропс `onUpdateNode`.
- **`src/ui/NodeCard.tsx`**:
  - Снимаем `pointer-events: none` и ставим `auto`, чтобы форма стала интерактивной.
  - Меняем отображение заголовка на `<input type="text">` или `contentEditable`.
  - Добавляем блок с `<textarea>` для редактирования `content`.
  - Добавим `onPointerDown={(e) => e.stopPropagation()}`, чтобы избежать передачи событий на 3D-холст.

## Risks
- **Перекрытие событий мыши (Event Bubbling):** Карточка — это DOM-оверлей поверх Canvas. При клике на `<input>` событие может провалиться вниз и спровоцировать OrbitControls (зум, вращение). Мы решим это либо через CSS, либо через `e.stopPropagation()`.

## What will NOT be included
- Поддержка Markdown (рендер разметки).
- Кастомные редакторы (Rich Text).
- Создание рёбер и перетаскивание узлов.
- Сохранение в базу (backend) или LocalStorage.

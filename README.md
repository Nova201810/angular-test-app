# AngularTestApp

Таск менеджер для ведения личных задач. Позволяет управлять задачами, графически отображает общее состояние списка, а также даёт возможность настраивать интерфейс для удобной работы.

## Локальная разработка

1. Установить зависимости, выполнив `yarn`
2. Запустить проект командой `yarn dev`

Приложение будет развернуто на `http://localhost:3000/`.  
Сервер с моковыми данными будет развернут на `http://localhost:3001/`.  
Все запросы к серверу по пути `http://localhost:3000/api` будут проксироваться на `3001` порт.

## Сборка  

Выполнить команду `yarn build`.  
Запустить собранный проект можно командой `yarn start`.

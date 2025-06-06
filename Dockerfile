# Используем официальный образ Node.js
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm install

# Копируем проект и собираем
COPY . .
RUN npm run build

# Запуск сервера
CMD ["npm", "run", "start"]
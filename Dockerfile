FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Optional: add build args if needed
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]

FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

#ENTRYPOINT ["npx", "prisma", "migrate", "deploy"]
# ENTRYPOINT ["npx", "prisma", "generate"]

CMD ["npm", "start"]
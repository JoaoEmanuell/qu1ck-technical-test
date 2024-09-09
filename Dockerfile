FROM node:20-alpine

RUN apk add --no-cache openssl

USER node

WORKDIR /home/node/

COPY --chown=node:node qu1ck-technical-test .

COPY --chown=node:node .env .

RUN npm install -y && \
    npm run prisma:generate && \
    npm run build && \ 
    npm cache clean --force

EXPOSE 8080

CMD ["npm", "run", "start"]
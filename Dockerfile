FROM node:18.12.1

WORKDIR /api

COPY . .
COPY ./.env.production ./.env

RUN yarn install --quiet --no-optional --no-fund --loglevel=error
RUN yarn run build
RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["yarn","run","start:prod"]
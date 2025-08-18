FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS dev
COPY ./packages/server/ .
RUN pnpm install
CMD pnpm start

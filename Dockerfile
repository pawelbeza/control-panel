FROM node:20-slim AS build

RUN apt-get update
RUN apt-get install -y ca-certificates

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN $GITHUB_TOKEN

COPY ./pnpm-lock.yaml /app
RUN pnpm fetch

COPY ./design-system/pnpm-lock.yaml /app/design-system/pnpm-lock.yaml
RUN cd design-system && pnpm fetch

COPY . .
RUN pnpm install --offline --frozen-lockfile
RUN cd design-system && pnpm install --prefer-offline --frozen-lockfile

ARG ENVIRONMENT
ENV VITE_ENVIRONMENT $ENVIRONMENT

ARG KOYEB_GIT_SHA
ARG APP_VERSION
ENV VITE_APP_VERSION ${KOYEB_GIT_SHA:-${APP_VERSION}}

ARG API_URL
ENV VITE_API_URL $API_URL

ARG PAGE_CONTEXT_BASE_URL
ENV VITE_PAGE_CONTEXT_BASE_URL $PAGE_CONTEXT_BASE_URL

ARG RECAPTCHA_CLIENT_KEY
ENV VITE_RECAPTCHA_CLIENT_KEY $RECAPTCHA_CLIENT_KEY

ARG SEGMENT_WRITE_KEY
ENV VITE_SEGMENT_WRITE_KEY $SEGMENT_WRITE_KEY

ARG POSTHOG_KEY
ENV VITE_POSTHOG_KEY $POSTHOG_KEY

ARG STRIPE_PUBLIC_KEY
ENV VITE_STRIPE_PUBLIC_KEY $STRIPE_PUBLIC_KEY

ARG MAPBOX_TOKEN
ENV VITE_MAPBOX_TOKEN $MAPBOX_TOKEN

ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN $SENTRY_AUTH_TOKEN

RUN pnpm run build

FROM nginx:latest

RUN apt-get update

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
COPY nginx.conf /etc/nginx/conf.d/default.conf

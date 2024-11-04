
FROM cgr.dev/chainguard/node:latest AS build-dist
WORKDIR /usr/src/app
COPY --chown=node:node boilerplate ./
RUN npm install 
RUN npm run build 

FROM cgr.dev/chainguard/node:latest
ENV NODE_ENV="production"
ENV PORT=3000
WORKDIR /app
COPY --chown=node:node --from=build-dist /usr/src/app/.next ./shared/.next
COPY --chown=node:node --from=build-dist /usr/src/app/.next/static ./shared/.next/standalone/.next/static
COPY --chown=node:node --from=build-dist /usr/src/app/public ./shared/.next/standalone/public
RUN chmod -R 755 ./shared/.next
EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node","shared/.next/standalone/server.js"]  
# Size: 425mb



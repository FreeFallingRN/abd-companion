FROM node:22-alpine

WORKDIR /app

# Copy dependency specifications first
COPY package.json ./

# Install dependencies using legacy peer deps for Sanity 3 + Next 14 compatibility
RUN npm install --legacy-peer-deps

# Copy the rest of the workspace
COPY . .

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "dev"]

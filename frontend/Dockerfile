# Use the official Node.js image as the base image
FROM node:20

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
# Set the working directory
WORKDIR /usr/src/app

COPY . .

# Install dependencies
RUN npm install

RUN npm run build

RUN npm install serve -g

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist"]
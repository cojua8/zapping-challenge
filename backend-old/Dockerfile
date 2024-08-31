# Use the official Node.js image as the base image
FROM node:20

#download the video
RUN apt-get update && apt-get install -yy pipx && pipx install gdown
WORKDIR /usr/video
RUN pipx run gdown 1exGq6BJ6r1lXezOanp88sWwxqcMbDntJ -O file.zip \
    && unzip file.zip -d . \
    && mv "hls test" videos \
    && rm file.zip
ENV VIDEOS_PATH=/usr/video/videos

# Copy the app, install and run
WORKDIR /usr/src/app
COPY . .
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
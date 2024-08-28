# Use the official Node.js image as the base image
FROM node:20

RUN apt-get update && apt-get install -yy pipx && pipx install gdown

#download the video
WORKDIR /usr/video
RUN pipx run gdown 1exGq6BJ6r1lXezOanp88sWwxqcMbDntJ -O file.zip
RUN unzip file.zip -d .
RUN mv "hls test" videos
RUN rm file.zip
ENV VIDEOS_PATH=/usr/video/videos

WORKDIR /usr/src/app
COPY . .
# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
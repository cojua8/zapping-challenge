FROM rust:1.78.0

RUN apt-get update && apt-get install -yy pipx && pipx install gdown
WORKDIR /usr/video
RUN pipx run gdown 1exGq6BJ6r1lXezOanp88sWwxqcMbDntJ -O file.zip \
    && unzip file.zip -d . \
    && mv "hls test" videos \
    && rm file.zip
ENV VIDEOS_PATH=/usr/video/videos

WORKDIR /usr/src/app
COPY . .
RUN cargo build --release

EXPOSE 3000

CMD ["./target/release/zapping-hls-backend"] 
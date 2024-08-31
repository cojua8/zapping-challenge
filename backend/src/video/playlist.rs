use std::{cmp::min, time::SystemTime};

use crate::Config;

pub fn create_playlist(config: &Config) -> String {
    let started_time = config.started_time.lock().unwrap();
    let segments_count = elapsed_segments(*started_time, config.total_segments);

    let headers = create_headers(segments_count);
    let segments = create_segments(segments_count, config);
    let footers = create_footers(segments_count, config);

    format!("{}{}{}", headers, segments, footers)
}

fn create_headers(sequence_counter: usize) -> String {
    let mut headers = String::new();

    headers.push_str("#EXTM3U\n");
    headers.push_str("#EXT-X-VERSION:3\n");
    headers.push_str("#EXT-X-TARGETDURATION:10\n");
    headers.push_str(&format!("#EXT-X-MEDIA-SEQUENCE:{}\n", sequence_counter));

    headers
}

fn create_segments(segments_count: usize, config: &Config) -> String {
    (0..3)
        .map(|i| create_segment(segments_count + i, config))
        .collect()
}

fn create_segment(segment_counter: usize, config: &Config) -> String {
    let segment_file = format!("segment{}.ts", segment_counter);

    match segment_counter.cmp(&config.total_segments) {
        std::cmp::Ordering::Less => format!("#EXTINF:10.000000,\n{segment_file}\n"),
        std::cmp::Ordering::Equal => format!("#EXTINF:4.566667,\n{segment_file}\n"),
        std::cmp::Ordering::Greater => String::new(),
    }
}

fn create_footers(segments_count: usize, config: &Config) -> String {
    if segments_count > config.total_segments - config.playlist_size {
        String::from("#EXT-X-ENDLIST\n")
    } else {
        String::new()
    }
}

fn elapsed_segments(started_time: SystemTime, total_segments: usize) -> usize {
    min(
        started_time.elapsed().unwrap().as_secs() as usize / 10,
        total_segments + 1,
    )
}

fn move_to_segment(segment_number: usize, config: &Config) {
    let new_started_time =
        SystemTime::now() - std::time::Duration::from_secs((segment_number * 10) as u64);

    config.set_started_time(new_started_time);
}

pub fn move_to_final_segment(config: &Config) {
    move_to_segment(config.total_segments - config.playlist_size - 1, config);
}

pub fn move_to_initial_segment(config: &Config) {
    move_to_segment(0, config);
}

# Open-license listening collection — 2026-11-03

The ten lessons replace the earlier X selection. They are ten continuous topical excerpts from two VPRO interviews, not ten different speakers. Eight feature Yoshua Bengio and two feature Pascale Fung. Dates are historical, not current news.

## License evidence

- Project reuse statement: https://themindoftheuniverse.org/about — raw interviews, including subtitles, available for reuse, remixing and editing under Creative Commons BY-SA. The project notes that automated subtitles can contain mistakes.
- Bengio: https://commons.wikimedia.org/wiki/File:Yoshua_Bengio_on_intelligent_machines-VPRO-The_Mind_of_the_Universe.ogv
- Fung: https://commons.wikimedia.org/wiki/File:Pascale_Fung_on_building_robots_with_empathy-VPRO-The_Mind_of_the_Universe.ogv
- Both file descriptions identify VPRO and explicitly give CC BY-SA 3.0 Netherlands. Fung's recorded date is 2016-04-15. The Bengio Commons date field was inconsistent, so the page uses the project's 2015–2017 filming period / 2017 public release rather than inventing a date.
- License: https://creativecommons.org/licenses/by-sa/3.0/nl/

Video excerpts, stills derived from those videos, and translated subtitle adaptations in this collection are distributed under **CC BY-SA 3.0 NL**. Original production: VPRO, The Mind of the Universe. Excerpting, compression, Chinese translation and subtitle editing: aiai 学院. No endorsement by VPRO or speakers is implied.

## Process and limits

Downloaded the 480p VP9 derivatives and project English SRTs from Wikimedia Commons. Excerpted with ffmpeg to H.264/AAC MP4 with faststart. All video files are below 25 MiB. Exact source filename, source interval, license, subtitle-source link, local duration and bilingual cues are stored in `data/listening-lessons.json`.

Used local whisper.cpp v1.5.5, small.en model for an independent recognition pass on all ten actual MP4 audio tracks. Compared recognized speech against source SRTs, corrected clear transcription errors (e.g. “items” → “algorithms”, “wars” → “doors”), matched word sequences to adjust sentence boundaries, joined broken subtitle lines and translated to Chinese. Adjusted excerpt 6 to recover a clipped sentence opening and removed the preceding interviewer fragment from excerpt 10. No cloud transcription API or paid service was used. This is source-caption plus ASR review, not a claim of professional human listening certification; brief interjections that ASR missed retain source-caption evidence.

## Validation

Verified all ten selectable lessons load distinct matching MP4s, show nonempty bilingual cues and play from a clicked sentence in a browser. Verified sentence loop, sentence-end pause, speed, language visibility and mobile-width layout. The validator checks timing order, bounds against ffprobe duration, valid source/attribution/license, subtitles and media availability, file-size ceiling and absence of summary-only placeholder lessons.

Homepage hero video

Add the complete five-column/strip composition here as:
- hero-video.webm (preferred, VP9)
- hero-video.mp4 (fallback, H.264)

After adding both files, set `window.KLB_HERO_VIDEO_READY = true` in hero-video.js. The page then uses WebM first and MP4 fallback with autoplay, muted, loop, playsinline, and metadata preload. Until enabled, the artwork poster/fallback stays visible without requesting missing media. Keep the export optimized for web delivery; the video fills the full hero with a dark readability overlay.

Animation media

Place animation previews in this folder (WebM/VP9 preferred, MP4/H.264 optional fallback). Then register each actual file in the `window.KLB_ANIMATION_MEDIA` array at the top of animation-media.js, for example:

{
  webm: "assets/Animation/your-preview.webm",
  mp4: "assets/Animation/your-preview.mp4",
  poster: "art/6.png",
  alt: "Describe the visible animation"
}

No animation files were present when this site update was made, so the list starts empty. The homepage uses its existing artwork poster until a preview is registered; the Animation page displays a clear empty state rather than broken or invented media. Animation-page previews are loaded when scrolled near and play muted only while visible.

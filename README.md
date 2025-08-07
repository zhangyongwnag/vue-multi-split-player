# Video Player

A custom video player component for web applications for Vue2.7.


## Installation

```bash
pnpm install video-player -S
yarn add video-player
```

## Usage

```javascript
// Import the video player
import VideoPlayer from 'video-player';

// Create a new player instance
const player = new VideoPlayer({
  container: '#player-container',
  src: 'path/to/video.mp4',
  width: 800,
  height: 450,
  autoplay: false,
  controls: true
});

// Play the video
player.play();

// Pause the video
player.pause();
```

## API

### Methods
- `play()`: Start playing the video
- `pause()`: Pause the video
- `togglePlay()`: Toggle between play and pause
- `seek(time)`: Seek to a specific time (in seconds)
- `setVolume(volume)`: Set volume (0-1)
- `mute()`: Mute the video
- `unmute()`: Unmute the video
- `toggleMute()`: Toggle mute state

### Events
- `play`: Emitted when the video starts playing
- `pause`: Emitted when the video is paused
- `ended`: Emitted when the video ends
- `timeupdate`: Emitted when the current time changes
- `volumechange`: Emitted when the volume changes

## License

MIT © [yw.z]
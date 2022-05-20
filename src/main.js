import './style.css'
import { audio1, audio2, audio3, audio4, loadTrack, loadTrackAsStream, loadTrackAsStreamWithAuth, loadTrackAsStreamWithPresignedUrl } from './audio.service'
import { createAudioElement, createElement, createTextArea } from './dom.service'

document.addEventListener('DOMContentLoaded', () => {
  const audioContent = createElement('div', 'audio-content')
  const textArea = createTextArea()

  const audioElement1 = createAudioElement(
    'Audio Sample 1',
    'audio loaded as file',
    audio1,
    textArea,
    (options) => loadTrack(options)
  )

  const audioElement2 = createAudioElement(
    'Audio Sample 2',
    'audio loaded as stream',
    audio2,
    textArea,
    (options) => loadTrackAsStream(options)
  )

  const audioElement3 = createAudioElement(
    'Audio Sample 3',
    'large audio loaded as stream with presigned url',
    audio3,
    textArea,
    (options) => loadTrackAsStreamWithPresignedUrl(options)
  )

  const audioElement4 = createAudioElement(
    'Audio Sample 4',
    'large audio loaded with authentication',
    audio4,
    textArea,
    (options) => loadTrackAsStreamWithAuth(options)
  )

  audioContent.append(audioElement1, audioElement2, audioElement3, audioElement4)

  document.getElementById('app').append(audioContent,textArea.node)
})

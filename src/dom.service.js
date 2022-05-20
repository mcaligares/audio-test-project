const RATE = 500

export const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName)
  element.className = className
  element.textContent = text
  return element
}

const createButton = (text, onClick) => {
  const elemButton = document.createElement('button')
  elemButton.textContent = text
  elemButton.onclick = onClick
  return elemButton
}

const createVolume = (onChange) => {
  const volumeControl = document.createElement('input')
  volumeControl.type = 'range'
  volumeControl.min = '0'
  volumeControl.max = '10'
  volumeControl.value = '2'
  volumeControl.onchange = () => {
    onChange(Number.parseInt(volumeControl.value) * 0.1)
  }
  return volumeControl
}

const createPosition = (duration, onChange) => {
  const positionControl = document.createElement('input')
  positionControl.className = 'audio-element-position'
  positionControl.type = 'range'
  positionControl.min = 0
  positionControl.max = duration
  positionControl.value = 0
  positionControl.onchange = () => {
    onChange(Number.parseFloat(positionControl.value))
  }
  return positionControl
}

export const createAudioElement = (name, description, audioFile, logger, create) => {
  let timer = null

  const audioElement = createElement('div', 'audio-element')
  const nameElement = createElement('h1', 'audio-element-name', name)
  const descElement = createElement('p', 'audio-element-desc', description)
  const content = createElement('div', 'audio-element-control')

  const seekText = createElement('span', 'audio-element-seek')
  seekText.textContent = '0.00'

  const track = create({ name, audio: audioFile, logger })

  const position = createPosition(track.duration(), (value) => {
    track.seek(value)
  })
  const playButton = createButton('Play', () => {
    track.play()
    timer = setInterval(() => {
      seekText.textContent = track.seek().toFixed(2)
      position.max = track.duration()
      position.value = track.seek()
    },RATE)
  })
  const pauseButton = createButton('Pause', () => {
    track.pause()
    clearInterval(timer)
  })
  const stopButton = createButton('Stop', () => {
    track.stop()
    seekText.textContent = track.seek()
    position.value = track.seek()
    clearInterval(timer)
  })
  const volumeInput = createVolume((value) => {
    track.volume(value)
  })
  content.append(playButton, pauseButton, stopButton, volumeInput)

  audioElement.append(nameElement, descElement, position, seekText, content)
  return audioElement
}

export const createTextArea = () => {
  const textElement = document.createElement('textarea')
  textElement.className = 'audio-element-text'
  return {
    append: (text) => {
      const now = new Date()
      const minutes = `${now.getMinutes()}`.padStart(2, '0')
      const seconds = `${now.getSeconds()}`.padStart(2, '0')
      const milliseconds = `${now.getMilliseconds()}`.padStart(3, '0')
      const timeStr = `${minutes}:${seconds}.${milliseconds}`
      textElement.textContent += `\n[${timeStr}] ${text}`
      textElement.scrollTop = textElement.scrollHeight
    },
    node: textElement
  }
}

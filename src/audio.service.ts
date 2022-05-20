import { Howl, Howler } from 'howler'

export const audio1 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/sample1.mp3'
export const audio2 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/sample2.mp3'
export const audio3 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/sample3.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXNhLWVhc3QtMSJHMEUCIGmSH9%2Bz4G1L%2Fphs01%2FhpJtd1YGximqa41ufG1%2Bkes3HAiEAxI79DLp%2BEwT8PHrWW02pjl4Eb96NNssuhR7IFJMgf0Yq5AIIGBADGgwyNTA3NjkwOTI5MDkiDOsYCsGrgoaWMUr5OirBAqEV6GykruuxrXazDd3T9GAp5FAqTcbTOrr4BJ9iavlc883Bw1IazVNG8xFw3qmRmeXNLI11jluWhsZosHLmS0eLt6cXzu2%2BPZeqLqAh0TtqoExuCrI3cZgZoj7IpNSpvD9lwNggAsHN2ZX5JZHpvy9qA0VhJxMYQ6WkAh%2FKD7eO3spVcDjBOMh%2FPO%2BbqjfhIH1a%2B%2BypVvtuNX0bR7XvOkFHusz6ubyagdqS4f1s4xTIXfEIkRTNGeKIXqMHo6xBWV%2FeLGicHveiii%2B7VcaPRaAf3Ij1FSVaXMXU0STyibPgU2dbwYCrq9ypF4eySi4aG0TszrBeR7tm1js5HyM7VMS%2F0%2B5JqJ2hQqQacslx4zmeEP%2FrNM5hbbjcwdAF0eznOJmGEio8lZLyhELkl1ukWwLnnqmMFOVRDIc0QiKetMA%2FSzCk156UBjqzAoHyTtr8CkP9v36cdO7yVyBdnCTD6hL4AzK6gInlsnw6E7MLWJLvmNLrQABNiD0TI%2FVRPzFmIBUaIxm4zP7trH%2Fbcq8WCo5JupAOH069aURb%2FL65qkTP%2BP5AMBl12alDFPF7YRcwtrea%2BBD5FtyNhCSM6UnRf6%2B7thW46nHG86oGGOHa1cNwpvV4tVflrSx71q3YKLAWrt3HfcD2mZbaciUUdASrc0C%2FKxCejjH2eXHevBP8uZcr%2FZcJ4dJjgpIYIG%2FQ9lkaSRO7ahUqprtOcp%2FupTYVk2j5xmN9XyrQvHZQkB0Nz7mMTq4fQECXxuSZlF21PFyjCfTp8Vs2Yz%2BrtYs%2FvnvihoU4M7XpDpdi3i45Bq0UJQzLrQeWIyg0S9iV1xVObtvKHTn0FMb6iPk7fc3MxvU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220520T151909Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIATUYYAWEW5XT6DIHV%2F20220520%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a49a6ca3796288a233292302aa16d3463ac995de339f57d931ad896ea5270670'
export const audio4 = 'https://test-mcaligares.s3.sa-east-1.amazonaws.com/sample4.mp3'

type Logger = { append: (message: string) => void }
type TrackOptions = { name: string, audio: string, logger: Logger }

const loadTrack = (options: TrackOptions ): Howl => {
  const track = new Howl({
    src: [options.audio],
    volume: 0.2,
    preload: 'metadata',
  })
  options.logger.append(`${options.name} > track created`)
  addEventListener(track, options)
  return track
}

const loadTrackAsStream = (options: TrackOptions): Howl => {
  const track = new Howl({
    src: [options.audio],
    volume: 0.2,
    html5: true,
    preload: 'metadata',
  })
  options.logger.append(`${options.name} > track created as stream`)
  addEventListener(track, options)
  return track
}

const loadTrackAsStreamWithAuth = (options: TrackOptions): Howl => {
  const track = new Howl({
    src: [options.audio],
    volume: 0.2,
    xhr: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: SOME_TOKEN',
      },
      withCredentials: true,
    }
  })
  options.logger.append(`${options.name} > track created as stream with authentication`)
  addEventListener(track, options)
  return track
}

const loadTrackAsStreamWithPresignedUrl = (options: TrackOptions): Howl => {
  const track = new Howl({
    src: [options.audio],
    volume: 0.2,
    html5: true,
    preload: 'metadata',
  })
  options.logger.append(`${options.name} > track created as stream with presigned url`)
  addEventListener(track, options)
  return track
}

const changeVolume = (value: number) => {
  Howler.volume(value)
}

const addEventListener = (track: Howl, options: TrackOptions) => {
  track
    .once('load', () => {
      options.logger.append(`${options.name} > track loaded ${options.audio}`)
    })
    .on('loaderror', (params) => {
      options.logger.append(`${options.name} > ERROR: track loaded with error ${params}`)
    })
    .on('end', () => {
      options.logger.append(`${options.name} > track ended`)
    })
    .on('play', () => {
      options.logger.append(`${options.name} > track playing at ${track.seek()}`)
    })
    .on('playerror', (params) => {
      options.logger.append(`${options.name} > ERROR: track playing with error ${params}`)
    })
    .on('pause', () => {
      options.logger.append(`${options.name} > track paused at ${track.seek()}`)
    })
    .on('stop', () => {
      options.logger.append(`${options.name} > track stoped`)
    })
    .on('volume', (params) => {
      options.logger.append(`${options.name} > track volume changed ${track.volume()}`)
    })
    .on('seek', () => {
      options.logger.append(`${options.name} > track seek changed ${track.seek()} (seconds)`)
    })
}

export {
  loadTrack,
  loadTrackAsStream,
  loadTrackAsStreamWithAuth,
  loadTrackAsStreamWithPresignedUrl,
  changeVolume,
}
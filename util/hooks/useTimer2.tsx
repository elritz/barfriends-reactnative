import { useCallback, useEffect, useRef, useState } from 'react'

function useTimer2(stringTime: string): IUseTimerResponse {
	const timer = useRef<any>()

	const twoChars = useCallback(number => {
		return '' + (+number < 10 ? `0${number}` : number)
	}, [])

	const [minutes, seconds] = stringTime.split(':')
	const getInitialTime = useCallback(() => {
		return {
			minutes: twoChars(+minutes || 0),
			seconds: twoChars(+seconds || 0),
		}
	}, [minutes, seconds, twoChars])

	const [time, setTime] = useState(getInitialTime())
	const [started, setStarted] = useState(false)

	const hasFinished = +time.minutes === 0 && +time.seconds === 0

	const start = useCallback(() => {
		clearInterval(timer.current)
		setStarted(true)
		timer.current = setInterval(() => {
			setTime(time => ({
				minutes: twoChars(+time.seconds === 0 ? time.minutes - 1 : +time.minutes),
				seconds: twoChars(+time.seconds === 0 ? 59 : time.seconds - 1),
			}))
		}, 1000)
	}, [twoChars])

	const pause = useCallback(() => {
		clearInterval(timer.current)
	}, [])

	const finished = useCallback(
		func => {
			if (hasFinished) {
				return func && func()
			}
		},
		[hasFinished],
	)

	const reset = useCallback(() => {
		setTime(getInitialTime())
	}, [getInitialTime])

	const setTimer = useCallback(
		stringTime => {
			const [minutes, seconds] = stringTime.split(':')

			setTime({
				minutes: twoChars(+minutes || 0),
				seconds: twoChars(+seconds || 0),
			})
		},
		[twoChars],
	)

	useEffect(() => {
		if (hasFinished) {
			clearInterval(timer.current)
		}

		return () => clearInterval(timer.current)
	}, [hasFinished])

	return {
		...time,
		started,
		start,
		pause,
		finished,
		reset,
		setTimer,
	}
}

interface IFinishedCallback {
	(): void
}

interface IUseTimerResponse {
	started: boolean
	minutes: string
	seconds: string
	start: () => void
	pause: () => void
	finished: (func: IFinishedCallback) => void
	reset: () => void
	setTimer: (newTimer: string) => void
}

export default useTimer2

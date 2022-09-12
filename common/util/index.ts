import { Process } from '../classes/process'
import { Algorithms } from './algorithms.enum'
import { ProcessSettings } from './processSettings.interface'
import { Data, Results } from './results.interface'

export const getLowestRemainingTime = (processes: Array<Process>): Process | null => {
	return processes.reduce((prev: Process, current: Process) => {
		return prev.remainingTime <= current.remainingTime ? prev : current
	})
}

export const getLowestBurstTime = (processes: Array<Process>): Process | null => {
	return processes.reduce((prev: Process, current: Process) => {
		return prev.burstTime <= current.burstTime ? prev : current
	})
}

export const getNextElement = (processes: Process[]): Process | null => {
	return processes.find(x => !x.hasCompleted) || null
}

export const getHighestPriority = (processes: Array<Process>): Process | null => {
	return processes.reduce((prev: Process, current: Process) => {
		return prev.priority <= current.priority ? prev : current
	})
}

export const getNextElementInQueue = (processes: Array<Process>): Process => {
	return processes[0]
}

export const shiftArray = <T>(array: Array<T>) => {
	const [first, ...rest] = array
	return [...rest, first]
}

export const generateResultsList = (processCount: number) => {
	const keys = [...Array(processCount).keys()]
	const results: Results = {}
	keys.forEach(x => {
		results[x] = new Array<Data>()
	})
	return results
}

export const processesFromSettings = (settings: ProcessSettings[]) => {
	return settings.map((x, i) => {
		return new Process(i, x)
	})
}

export const getEnumNames = (object: any) => {
	const names = Object.values(object).filter(value => typeof value === 'string') as string[]

	return names.map((name, i) => {
		return { label: name, value: i }
	})
}

import {
	getHighestPriority,
	getLowestBurstTime,
	getLowestRemainingTime,
	getNextElement,
	getNextElementInQueue,
} from '.'
import { Process } from '../classes/process'
import { Algorithms } from './algorithms.enum'

export const AlgorithmMap: Record<Algorithms, (processes: Process[]) => Process | null> = {
	[Algorithms.FCFS]: getNextElement,
	[Algorithms.SRT]: getLowestRemainingTime,
	[Algorithms.RRS]: getNextElementInQueue,
	[Algorithms.PBS]: getHighestPriority,
	[Algorithms.SJF]: getLowestBurstTime,
}

import { Algorithms } from './algorithms.enum';
import { Process } from './process';
import {
	getHighestPriority,
	getLowestBurstTime,
	getLowestRemainingTime,
	getNextElement,
	getNextElementInQueue,
} from './util';

export const AlgorithmMap: Record<Algorithms, (processes: Process[]) => Process | null> = {
	[Algorithms.FCFS]: getNextElement,
	[Algorithms.SRT]: getLowestRemainingTime,
	[Algorithms.RRS]: getNextElementInQueue,
	[Algorithms.PBS]: getHighestPriority,
	[Algorithms.SJF]: getLowestBurstTime,
};

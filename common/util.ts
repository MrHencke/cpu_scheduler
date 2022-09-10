import { Process } from './process';

export const getLowestRemainingTime = (processes: Array<Process>): Process | null => {
	return processes.reduce((prev: Process, current: Process) => {
		return prev.remainingTime <= current.remainingTime ? prev : current;
	});
};

export const getLowestBurstTime = (processes: Array<Process>): Process | null => {
	return processes.reduce((prev: Process, current: Process) => {
		return prev.burstTime <= current.burstTime ? prev : current;
	});
};

export const getNextElement = (processes: Process[]): Process | null => {
	return processes.find((x) => !x.hasCompleted) || null;
};

export const getHighestPriority = (processes: Array<Process>): Process | null => {
	return processes.reduce((prev: Process, current: Process) => {
		return prev.priority <= current.priority ? prev : current;
	});
};

export const getNextElementInQueue = (processes: Array<Process>): Process => {
	return processes[0];
};

export const shiftArray = <T>(array: Array<T>) => {
	const [first, ...rest] = array;
	return [...rest, first];
};

export const testProcs = () => [
	new Process(0, 5),
	new Process(1, 3),
	new Process(2, 1),
	new Process(3, 4),
	new Process(4, 2),
	new Process(5, 6),
	new Process(6, 10),
];

export const testProcsPrioritized = () => [
	new Process(0, 5, 0, 1),
	new Process(1, 3, 0, 0),
	new Process(2, 1, 0, 2),
	new Process(3, 4, 0, 0),
	new Process(4, 2, 0, 3),
	new Process(5, 6, 0, 4),
	new Process(6, 10, 0, 1),
];

export const testProcsLateArrival = () => [
	new Process(0, 5, 4),
	new Process(1, 3, 2),
	new Process(2, 1, 5),
	new Process(3, 4, 3),
	new Process(4, 2, 1),
	new Process(5, 6, 3),
	new Process(6, 10),
];

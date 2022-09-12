import { ProcessSettings } from './processSettings.interface'

export const testProcSettings = (): ProcessSettings[] => [
	{ burstTime: 5, arrivalTime: 0, priority: 0 },
	{ burstTime: 3, arrivalTime: 0, priority: 0 },
	{ burstTime: 1, arrivalTime: 0, priority: 0 },
	{ burstTime: 4, arrivalTime: 0, priority: 0 },
	{ burstTime: 2, arrivalTime: 0, priority: 0 },
	{ burstTime: 6, arrivalTime: 0, priority: 0 },
	{ burstTime: 10, arrivalTime: 0, priority: 0 },
	{ burstTime: 3, arrivalTime: 0, priority: 0 },
	{ burstTime: 8, arrivalTime: 0, priority: 0 },
]

export const testProcSettingsLateArrival = (): ProcessSettings[] => [
	{ burstTime: 5, arrivalTime: 0, priority: 0 },
	{ burstTime: 3, arrivalTime: 2, priority: 0 },
	{ burstTime: 1, arrivalTime: 0, priority: 0 },
	{ burstTime: 4, arrivalTime: 5, priority: 0 },
	{ burstTime: 2, arrivalTime: 0, priority: 0 },
	{ burstTime: 6, arrivalTime: 3, priority: 0 },
	{ burstTime: 10, arrivalTime: 0, priority: 0 },
	{ burstTime: 3, arrivalTime: 1, priority: 0 },
	{ burstTime: 8, arrivalTime: 0, priority: 0 },
]

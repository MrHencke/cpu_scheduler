export interface ProcessSettings {
	burstTime: number
	arrivalTime: number
	priority: number
}

export const defaultProcessSetting: ProcessSettings = {
	burstTime: 1,
	arrivalTime: 0,
	priority: 0,
}

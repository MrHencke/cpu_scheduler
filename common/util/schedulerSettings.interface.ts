import { Algorithms } from './algorithms.enum'
import { ProcessSettings } from './processSettings.interface'
import { testProcSettings } from './testVars'

export interface SchedulerSettings {
	processes: ProcessSettings[]
	preemptive: boolean
	algorithm: Algorithms
	tickRate: number
	timeQuanta: number
}

export const initialSettings: SchedulerSettings = {
	processes: testProcSettings(),
	preemptive: false,
	algorithm: Algorithms.FCFS,
	tickRate: 1,
	timeQuanta: 1,
}

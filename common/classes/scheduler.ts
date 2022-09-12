import { Process } from './process'
import { generateResultsList, processesFromSettings, shiftArray } from 'common/util'
import { Algorithms } from 'common/util/algorithms.enum'
import { AlgorithmMap } from 'common/util/algorithms.map'
import { Results } from 'common/util/results.interface'
import { SchedulerSettings } from 'common/util/schedulerSettings.interface'

export class Scheduler {
	private _queuedProcesses: Process[]
	private _unqueuedProcesses: Process[]
	private _lastProcess: Process | null
	private _preemptive: boolean
	private _time: number
	private _timeQuantaTimer: number
	private _selectionFunction: (processes: Process[]) => Process | null
	private _timeQuanta: number
	private _isRoundRobin: boolean
	private _tickRate: number
	private _finishedCount: number
	private _processCount: number
	private _results: Results
	private _completed: boolean

	constructor(settings: SchedulerSettings) {
		const procs = processesFromSettings(settings.processes)
		this._queuedProcesses = procs.filter(x => x.hasArrived)
		this._unqueuedProcesses = procs.filter(x => !x.hasArrived)
		this._lastProcess = null
		this._preemptive = settings.preemptive
		this._tickRate = settings.tickRate
		this._time = 0
		this._timeQuantaTimer = 0
		this._selectionFunction = AlgorithmMap[settings.algorithm]
		this._timeQuanta = settings.timeQuanta
		this._isRoundRobin = settings.algorithm === Algorithms.RRS
		this._finishedCount = 0
		this._processCount = settings.processes.length
		this._results = generateResultsList(settings.processes.length)
		this._completed = false
	}

	calculate() {
		let i = 0
		while (!this.hasCompleted && i < 10000) {
			this.incrementTime(this._selectionFunction)
			i++
		}
		return this._results
	}
	incrementTime(selectionFunction: (processes: Process[]) => Process | null) {
		this._unqueuedProcesses.forEach(x => x.checkArrival(this._time))
		const newlyArrived = this._unqueuedProcesses.filter(x => x.hasArrived)
		if (newlyArrived.length !== 0) {
			this._queuedProcesses = [...this._queuedProcesses, ...newlyArrived]
			this._unqueuedProcesses = this._unqueuedProcesses.filter(x => !x.hasArrived)
		}
		let currentProcess = this._lastProcess
		if (
			this._lastProcess === null ||
			this._preemptive ||
			(this._isRoundRobin && this._timeQuantaTimer % this._timeQuanta === 0)
		) {
			if (this._queuedProcesses.length === 0) {
				currentProcess = null
			} else {
				currentProcess = selectionFunction(this._queuedProcesses)
				console.log(this._time, currentProcess)
				if (this._isRoundRobin && this._timeQuantaTimer % this._timeQuanta === 0) {
					this._queuedProcesses = shiftArray(this._queuedProcesses)
				}
			}
		}
		if (this._isRoundRobin) this._timeQuantaTimer += 1
		if (currentProcess !== null) {
			const burstTime = currentProcess.decrementRemainingTime(this._time, this._tickRate)
			this._results[currentProcess._id].push([this._time, this._time + burstTime])
			this._lastProcess = currentProcess
			if (currentProcess.hasCompleted) {
				this.setProcessCompleted()
			}
			this._time += burstTime
		} else {
			this._time += this._tickRate
		}
	}

	private setProcessCompleted() {
		this._queuedProcesses = this._queuedProcesses.filter(x => !x.hasCompleted)
		this._finishedCount += 1
		this._lastProcess = null
		if (this._isRoundRobin) this._timeQuantaTimer = 0
		if (this._finishedCount === this._processCount) {
			this._completed = true
		}
	}

	public get hasCompleted() {
		return this._completed
	}

	public get time() {
		return this._time
	}
	public get results() {
		return this._results
	}
}

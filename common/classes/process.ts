import { ProcessSettings } from 'common/util/processSettings.interface'

export class Process {
	readonly _id: number
	private _remainingTime: number
	private _burstTime: number
	private _arrivalTime: number
	private _hasCompleted: boolean
	private _priority: number
	private _hasArrived: boolean

	constructor(id: number, settings: ProcessSettings) {
		this._id = id
		this._remainingTime = settings.burstTime
		this._burstTime = settings.burstTime
		this._arrivalTime = settings.arrivalTime || 0
		this._hasArrived = settings.arrivalTime === 0
		this._hasCompleted = false
		this._priority = settings.priority || 0
	}

	decrementRemainingTime(tickRate: number) {
		const remainingTime = this.remainingTime
		const res = remainingTime - tickRate
		if (res <= 0) {
			this._remainingTime = 0
			this.complete()
			return remainingTime
		} else {
			this._remainingTime = res
			return tickRate
		}
	}

	complete() {
		this._hasCompleted = true
	}

	checkArrival(currentTime: number) {
		if (this._arrivalTime <= currentTime) this._hasArrived = true
	}

	public get hasArrived(): boolean {
		return this._hasArrived
	}

	public get hasCompleted(): boolean {
		return this._hasCompleted
	}

	public get priority(): number {
		return this._priority
	}

	public get remainingTime(): number {
		return this._remainingTime
	}

	public get burstTime(): number {
		return this._burstTime
	}

	public get arrivalTime(): number {
		return this._arrivalTime
	}
}

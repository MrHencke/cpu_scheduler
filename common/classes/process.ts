import { ProcessSettings } from 'common/util/processSettings.interface'

export class Process {
	readonly _id: number
	private _remainingTime: number
	private _burstTime: number
	private _arrivalTime: number
	private _hasCompleted: boolean
	private _priority: number
	private _hasArrived: boolean
	private _completionTime: number

	constructor(id: number, settings: ProcessSettings) {
		this._id = id
		this._remainingTime = settings.burstTime
		this._burstTime = settings.burstTime
		this._arrivalTime = settings.arrivalTime || 0
		this._hasArrived = settings.arrivalTime === 0
		this._hasCompleted = false
		this._priority = settings.priority || 0
		this._completionTime = 0
	}

	decrementRemainingTime(currentTime: number, tickRate: number) {
		const remainingTime = this.remainingTime
		const res = remainingTime - tickRate
		if (res <= 0) {
			this._remainingTime = 0
			this.complete(currentTime + remainingTime)
			return remainingTime
		} else {
			this._remainingTime = res
			return tickRate
		}
	}

	complete(completionTime: number) {
		this._hasCompleted = true
		this._completionTime = completionTime
	}

	checkArrival(currentTime: number) {
		if (this._arrivalTime <= currentTime) this._hasArrived = true
	}

	isUnavailable() {
		return this._hasCompleted || !this._hasArrived
	}
	public get name() {
		return `P${this._id}`
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

	public get completionTime(): number {
		return this._completionTime
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

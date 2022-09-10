export class Process {
	readonly _id: number;
	private _remainingTime: number;
	private _burstTime: number;
	private _arrivalTime: number;
	private _hasCompleted: boolean;
	private _priority: number;
	private _hasArrived: boolean;
	private _completionTime: number;

	constructor(id: number, remainingTime: number, arrivalTime: number = 0, priority: number = 0) {
		this._id = id;
		this._remainingTime = remainingTime;
		this._burstTime = remainingTime;
		this._arrivalTime = arrivalTime;
		this._hasArrived = arrivalTime === 0;
		this._hasCompleted = false;
		this._priority = priority;
		this._completionTime = 0;
	}

	decrementRemainingTime(currentTime: number, tickRate: number) {
		const res = this._remainingTime - tickRate;
		if (res <= 0) {
			this._remainingTime = 0;
			this.complete(currentTime + tickRate);
		} else {
			this._remainingTime = res;
		}
	}

	complete(completionTime: number) {
		this._hasCompleted = true;
		this._completionTime = completionTime;
	}

	checkArrival(currentTime: number) {
		if (this._arrivalTime <= currentTime) this._hasArrived = true;
	}

	isUnavailable() {
		return this._hasCompleted || !this._hasArrived;
	}
	public get name() {
		return `P${this._id}`;
	}

	public get hasArrived(): boolean {
		return this._hasArrived;
	}

	public get hasCompleted(): boolean {
		return this._hasCompleted;
	}

	public get priority(): number {
		return this._priority;
	}

	public get completionTime(): number {
		return this._completionTime;
	}

	public get remainingTime(): number {
		return this._remainingTime;
	}

	public get burstTime(): number {
		return this._burstTime;
	}

	public get arrivalTime(): number {
		return this._arrivalTime;
	}
}

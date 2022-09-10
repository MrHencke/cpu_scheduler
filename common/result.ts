export class Result {
	private _id: number | 'None';
	private _startTime: number;
	private _endTime: number;

	constructor(id: number | 'None', startTime: number, endTime: number) {
		this._id = id;
		this._startTime = startTime;
		this._endTime = endTime;
	}

	public get id() {
		return this._id;
	}

	public get name() {
		return this._id !== 'None' ? `P${this._id}` : 'None';
	}

	public get startTime() {
		return this._startTime;
	}

	public get endTime() {
		return this._endTime;
	}

	public debug() {
		return `${this.name}: ${this._startTime}-${this._endTime}`;
	}
}

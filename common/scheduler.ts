import { Algorithms } from './algorithms.enum';
import { AlgorithmMap } from './algorithms.map';
import { Process } from './process';
import { Result } from './result';
import { shiftArray } from './util';

export class Scheduler {
	private _processes: Process[];
	private _lastProcess: Process | null;
	private _preemptive: boolean;
	private _time: number;
	private _selectionFunction: (processes: Process[]) => Process | null;
	private _timeQuanta: number | undefined;
	private _tickRate: number;
	private _finishedCount: number;
	private _processesLength: number;
	private _results: Result[];
	private _completed: boolean;

	constructor(
		processes: Process[],
		preemptive: boolean = false,
		algorithm: Algorithms,
		tickRate: number = 1,
		time: number = 0,
		timeQuanta: number | undefined = undefined
	) {
		this._processes = processes;
		this._lastProcess = null;
		this._preemptive = preemptive;
		this._tickRate = tickRate;
		this._time = time;
		this._selectionFunction = AlgorithmMap[algorithm];
		this._timeQuanta = timeQuanta;
		this._finishedCount = 0;
		this._processesLength = processes.length;
		this._results = [];
		this._completed = false;
	}

	calculate() {
		while (!this.hasCompleted) {
			this.incrementTime(this._selectionFunction);
		}
		return this._results;
	}

	incrementTime(selectionFunction: (processes: Process[]) => Process | null) {
		this._processes.forEach((x) => {
			if (!x.hasArrived) x.checkArrival(this._time);
		});
		let currentProcess = this._lastProcess;
		if (
			this._lastProcess === null ||
			this._preemptive ||
			this._time % (this._timeQuanta || 0) === 0
		) {
			const filteredProcesses = this._processes.filter((x) => !x.isUnavailable());
			if (filteredProcesses.length === 0) {
				currentProcess = null;
			} else {
				currentProcess = selectionFunction(filteredProcesses);
			}
		}
		if (currentProcess === null) {
			this._results.push(new Result('None', this._time, this._time + this._tickRate));
		} else {
			this._results.push(
				new Result(currentProcess._id, this._time, this._time + this._tickRate)
			);
			this._lastProcess = currentProcess;
			currentProcess.decrementRemainingTime(this._time, this._tickRate);
			if (currentProcess.hasCompleted) this.setProcessCompleted();
		}

		if (this._timeQuanta !== undefined) this._processes = shiftArray(this._processes);
		this._time += this._tickRate;
	}

	private setProcessCompleted() {
		this._finishedCount += 1;
		this._lastProcess = null;
		if (this._finishedCount === this._processesLength) {
			this._completed = true;
		}
	}

	public get hasCompleted() {
		return this._completed;
	}

	public get results() {
		return this._results;
	}
}

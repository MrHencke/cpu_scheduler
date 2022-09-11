import { Algorithms } from './types/algorithms.enum';
import { Scheduler } from './scheduler';
import { getEnumNames, testProcs } from './util';
import '@carbon/styles/css/styles.css';
import '@carbon/charts/styles.css';
import Chart from 'common/chart';
import { useState } from 'react';
import Select from 'react-dropdown-select';
import NumberSelect from './numberSelect';
import { Process } from './process';

const AlgoritmSelection = () => {
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(Algorithms.FCFS);
	const isRoundRobin = selectedAlgorithm === Algorithms.RRS;
	const [processes, setProcesses] = useState([new Process(0, 0, 0, 0)]);
	const [preemptive, setPreemptive] = useState(false);
	const [tickRate, setTickRate] = useState(1);
	const [timeQuanta, setTimeQuanta] = useState(3);
	const scheduler = new Scheduler(
		testProcs(),
		isRoundRobin ? false : preemptive,
		selectedAlgorithm,
		tickRate,
		isRoundRobin ? timeQuanta : undefined
	);
	const options = getEnumNames(Algorithms);
	const res = scheduler.calculate();
	const ticks = scheduler.time;

	return (
		<div className='full-width-container'>
			<Select
				options={options}
				values={[options[0]]}
				onChange={(v) => {
					const first = v[0];
					setSelectedAlgorithm(first.value);
				}}
			/>
			<NumberSelect title='Tick Rate' defaultValue={tickRate} onChange={setTickRate} />
			{isRoundRobin && (
				<NumberSelect
					title='Time Quanta'
					defaultValue={timeQuanta}
					onChange={setTimeQuanta}
				/>
			)}
			<input
				type='checkbox'
				id='preemptive'
				checked={preemptive}
				onClick={() => setPreemptive(!preemptive)}
			/>
			<label htmlFor='preemptive'> Preemptive Execution</label>
			<br />
			<Chart data={res} time={ticks} algorithm={Algorithms[selectedAlgorithm]} />
		</div>
	);
};

export default AlgoritmSelection;

import { Algorithms } from '../../common/algorithms.enum';
import { Scheduler } from '../../common/scheduler';
import { testProcs } from '../../common/util';

//First come first serve
const FCFS = () => {
	const scheduler = new Scheduler(testProcs(), false, Algorithms.FCFS);
	const res = scheduler.calculate();
	return (
		<div>
			{res.map((x, i) => {
				return <p key={i}>{x.debug()}</p>;
			})}
		</div>
	);
};

export default FCFS;

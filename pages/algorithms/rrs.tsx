import { Algorithms } from '../../common/algorithms.enum';
import { Scheduler } from '../../common/scheduler';
import { testProcsPrioritized } from '../../common/util';

//Round robin scheduling
const RRS = () => {
	const scheduler = new Scheduler(testProcsPrioritized(), false, Algorithms.RRS, 1, 0, 2);
	const res = scheduler.calculate();
	return (
		<div>
			{res.map((x, i) => {
				return <p key={i}>{x.debug()}</p>;
			})}
		</div>
	);
};

export default RRS;

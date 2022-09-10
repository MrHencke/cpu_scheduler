import { testProcs } from '../../common/util';
import { Algorithms } from '../../common/algorithms.enum';
import { Scheduler } from '../../common/scheduler';

//Shortest job first
const SJF = () => {
	const scheduler = new Scheduler(testProcs(), false, Algorithms.SJF);
	const res = scheduler.calculate();
	return (
		<div>
			{res.map((x, i) => {
				return <p key={i}>{x.debug()}</p>;
			})}
		</div>
	);
};

export default SJF;

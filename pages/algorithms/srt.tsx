import { testProcsLateArrival } from '../../common/util';
import { Algorithms } from '../../common/algorithms.enum';
import { Scheduler } from '../../common/scheduler';
//Shortest time remaining
const SRT = () => {
	const scheduler = new Scheduler(testProcsLateArrival(), true, Algorithms.SRT);
	const res = scheduler.calculate();
	return (
		<div>
			{res.map((x, i) => {
				return <p key={i}>{x.debug()}</p>;
			})}
		</div>
	);
};

export default SRT;

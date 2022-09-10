import { Algorithms } from '../../common/algorithms.enum';
import { Scheduler } from '../../common/scheduler';
import { testProcsPrioritized } from '../../common/util';

//Priority based scheduling
export const PBS = () => {
	const scheduler = new Scheduler(testProcsPrioritized(), false, Algorithms.PBS);
	const res = scheduler.calculate();
	return (
		<div>
			{res.map((x, i) => {
				return <p key={i}>{x.debug()}</p>;
			})}
		</div>
	);
};

export default PBS;

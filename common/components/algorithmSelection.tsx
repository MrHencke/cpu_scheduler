import Parameters from './settings/parameters'
import ProcessSelect from './settings/processSelect'
import { Scheduler } from 'common/classes/scheduler'
import Chart from 'common/components/chart'
import { Algorithms } from 'common/util/algorithms.enum'
import { SchedulerSettings, initialSettings } from 'common/util/schedulerSettings.interface'
import { useState } from 'react'

const AlgoritmSelection = () => {
	const [settings, setSettings] = useState<SchedulerSettings>(initialSettings)
	const scheduler = new Scheduler(settings)
	const results = scheduler.calculate()
	const time = scheduler.time

	return (
		<div className="full-width-container">
			<Parameters settings={settings} setSettings={setSettings} />
			<Chart data={results} time={time} algorithm={Algorithms[settings.algorithm]} />
		</div>
	)
}

export default AlgoritmSelection

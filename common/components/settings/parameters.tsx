import Checkbox from './checkbox'
import NumberSelect from './numberSelect'
import ProcessSelect from './processSelect'
import { getEnumNames } from 'common/util'
import { Algorithms } from 'common/util/algorithms.enum'
import { SchedulerSettings } from 'common/util/schedulerSettings.interface'
import { Dispatch, SetStateAction } from 'react'
import Select from 'react-dropdown-select'

interface ParametersProps {
	settings: SchedulerSettings
	setSettings: Dispatch<SetStateAction<SchedulerSettings>>
}
const Parameters = ({ settings, setSettings }: ParametersProps) => {
	const options = getEnumNames(Algorithms)
	const isRoundRobin = settings.algorithm === Algorithms.RRS
	return (
		<div className="settings-container">
			<Select
				style={{ backgroundColor: 'white' }}
				options={options}
				values={[options[0]]}
				onChange={v => {
					const first = v[0]
					setSettings({ ...settings, algorithm: first.value })
				}}
			/>
			<NumberSelect
				title="Tick Rate"
				disabled={true}
				value={settings.tickRate}
				onChange={v => setSettings({ ...settings, tickRate: v })}
			/>
			<NumberSelect
				title="Time Quanta"
				disabled={!isRoundRobin}
				value={settings.timeQuanta}
				onChange={v => setSettings({ ...settings, timeQuanta: v })}
			/>
			<Checkbox
				id="preemptive"
				label="Preemptive Execution"
				value={settings.preemptive}
				setValue={() =>
					setSettings({ ...settings, preemptive: isRoundRobin ? false : !settings.preemptive })
				}
				disabled={isRoundRobin}
			/>
			<ProcessSelect settings={settings} setSettings={setSettings} />
		</div>
	)
}

export default Parameters

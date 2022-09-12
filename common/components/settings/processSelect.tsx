import ProcessEditor from './processEditor'
import { Algorithms } from 'common/util/algorithms.enum'
import { defaultProcessSetting, ProcessSettings } from 'common/util/processSettings.interface'
import { SchedulerSettings } from 'common/util/schedulerSettings.interface'
import { Dispatch, SetStateAction } from 'react'

interface ProcessSelectProps {
	settings: SchedulerSettings
	setSettings: Dispatch<SetStateAction<SchedulerSettings>>
}

const ProcessSelect = ({ settings, setSettings }: ProcessSelectProps) => {
	const isPriority = settings.algorithm === Algorithms.PBS
	const setProcessSettings = (v: ProcessSettings, i: number) => {
		const newProcesses = [...settings.processes]
		newProcesses[i] = v
		setSettings({ ...settings, processes: newProcesses })
	}
	const removeProcess = (i: number) => {
		const newProcesses = [...settings.processes]
		newProcesses.splice(i, 1)
		setSettings({ ...settings, processes: newProcesses })
	}
	const addNewProcess = () => {
		setSettings({ ...settings, processes: [...settings.processes, defaultProcessSetting] })
	}
	return (
		<>
			<div className="process-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Burst Time</th>
							<th>Arrival Time</th>
							{isPriority && <th>Priority</th>}
						</tr>
					</thead>
					<tbody>
						{settings.processes.map((x, i) => {
							return (
								<ProcessEditor
									id={i}
									processSettings={x}
									setProcessSettings={setProcessSettings}
									removeProcess={removeProcess}
									isPriority={isPriority}
								/>
							)
						})}
					</tbody>
					<tfoot>
						<button onClick={addNewProcess}>New</button>
					</tfoot>
				</table>
			</div>
		</>
	)
}

export default ProcessSelect

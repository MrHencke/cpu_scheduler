import { ProcessSettings } from 'common/util/processSettings.interface'

interface ProcessEditorProps {
	id: number
	processSettings: ProcessSettings
	setProcessSettings: (v: ProcessSettings, i: number) => void
	removeProcess: (i: number) => void
	isPriority: boolean
}

const ProcessEditor = ({
	id,
	processSettings,
	setProcessSettings,
	removeProcess,
	isPriority,
}: ProcessEditorProps) => {
	return (
		<tr>
			<td style={{ textAlign: 'center' }}>P{id}</td>
			<td>
				<input
					type="text"
					id={`${id}-burst`}
					step={1}
					value={processSettings.burstTime}
					onChange={e => {
						const number = Number(e.target.value)
						setProcessSettings({ ...processSettings, burstTime: number }, id)
					}}
				/>
			</td>
			<td>
				<input
					type="number"
					id={`${id}-arrival`}
					step={1}
					value={processSettings.arrivalTime}
					onChange={e => {
						const number = Number(e.target.value)
						setProcessSettings({ ...processSettings, arrivalTime: number }, id)
					}}
				/>
			</td>
			{isPriority && (
				<td>
					<input
						type="number"
						id={`${id}-priority`}
						step={1}
						value={processSettings.priority}
						onChange={e => {
							const number = Number(e.target.value)
							setProcessSettings({ ...processSettings, priority: number }, id)
						}}
					/>
				</td>
			)}
			<td>
				<button className="remove-button" onClick={() => removeProcess(id)}>
					Remove
				</button>
			</td>
		</tr>
	)
}

export default ProcessEditor

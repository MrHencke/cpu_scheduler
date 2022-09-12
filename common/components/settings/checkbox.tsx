interface CheckBoxProps {
	id: string
	label: string
	value: boolean
	setValue: () => void
	disabled: boolean
}
const Checkbox = ({ id, label, value, setValue, disabled }: CheckBoxProps) => {
	if (disabled) return <></>
	return (
		<div>
			<input type="checkbox" id={id} checked={value} onChange={setValue} />
			<label htmlFor={id}>{label}</label>
		</div>
	)
}

export default Checkbox

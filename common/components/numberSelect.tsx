interface NumberSelectProps {
	title: string;
	value: number;
	disabled?: boolean;
	onChange: (v: number) => void;
	stepSize?: number;
}

const NumberSelect = ({ title, value, disabled, onChange, stepSize = 1 }: NumberSelectProps) => {
	if (disabled) return <></>;
	return (
		<div>
			<h5>{title}</h5>
			<button onClick={() => onChange(value - stepSize <= 0 ? 1 : value - stepSize)}>-</button>
			<span>{value}</span>
			<button onClick={() => onChange(value + stepSize)}>+</button>
		</div>
	);
};

export default NumberSelect;

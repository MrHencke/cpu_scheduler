import { Dispatch, SetStateAction, useState } from 'react';

interface NumberSelectProps {
	title: string;
	defaultValue?: number;
	onChange: Dispatch<SetStateAction<number>>;
}

const NumberSelect = ({ title, defaultValue = 0, onChange }: NumberSelectProps) => {
	const [number, setNumber] = useState(defaultValue);
	const onClick = (number: number) => {
		setNumber(number);
		onChange(number);
	};
	return (
		<div>
			<h5>{title}</h5>
			<button onClick={() => onClick(number - 1 <= 0 ? 1 : number - 1)}>-</button>
			<span>{number}</span>
			<button onClick={() => onClick(number + 1)}>+</button>
		</div>
	);
};

export default NumberSelect;

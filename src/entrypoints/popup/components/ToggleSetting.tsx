interface Props {
	title: string;
	detail: string;
	checked: boolean;
	onChange: () => void;
}

export const ToggleSetting = ({ title, detail, checked, onChange }: Props) => {
	return (
		<div className="form-control px-2 pt-4 pb-1">
			<label className="label flex cursor-pointer justify-between gap-4 text-(--color-base-content)">
				<span className="label-text text-sm">
					{title}
					<span className="block text-xs text-(--text-pale)">{detail}</span>
				</span>
				<input
					type="checkbox"
					className="toggle toggle-primary"
					checked={checked}
					onChange={onChange}
				/>
			</label>
		</div>
	);
};

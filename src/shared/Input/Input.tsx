import { InputProps } from "./input.types";

export const Input: React.FC<InputProps> = ({ label, type, placeholder, options, error, register, required}) => (
	<div className="input">
	  <label>
		{label} <span className="input__required">{required ? "*" : ""}</span>
	  </label>
	  {type === "text" && (
		<input
		  {...register}
		  type="text"
		  placeholder={placeholder}
		 className="input__text"
		 required={required}
		/>
	  )}
	  {type === "select" && <select
		{...register}
		className="input__select"
	  >
		<option value="" disabled>
		  {placeholder || "Select an option"}
		</option>
		{options?.map((option, idx) => (
		  <option key={idx} value={option}>
			{option}
		  </option>
		))}
	  </select>
	} 
	{type === "date" && <input
		{...register} 
		type="date"
		className="input__date"
	  />}
	  {error && <span className="input__error">{error}</span>}
	</div>
  );
export type InputProps = {
	label: string;
	type: "text" | "select" | 'date';
	placeholder?: string;
	options?: string[];
	error?: string;
	success?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any;
	required?: boolean
  }
export const formName: string = "contactForm";
export const formEndpoint: string = "/application";

type TForm = {
	name: string;
	label: string;
	type: "text" | "select" | "date";
	placeholder: string;
	options?: string[];
	required: boolean;
}

const terms = ['6 months', '12 months', '18 months', '24 months'];

export const formFields: TForm[] = [
	{ name: "lastName", label: "Your last name", type: "text", placeholder: "For Example Doe", required: true },
	{ name: "firstName", label: "Your first name", type: "text", placeholder: "For Example Jhon", required: true },
	{ name: "patronymic", label: "Your patronymic", type: "text", placeholder: "For Example Victorovich", required: false },
	{
	  name: "term",
	  label: "Select term",
	  type: "select",
	  placeholder: terms[0],
	  options: terms, required: true
	},
	{ name: "email", label: "Your email", type: "text", placeholder: "test@gmail.com", required: true },
	{ name: "dob", label: "Your date of birth", type: "date", placeholder: "Select Date and Time", required: true },
	{ name: "passportSeries", label: "Your passport series", type: "text", placeholder: "0000" , required: true },
	{ name: "passportNumber", label: "Your passport number", type: "text", placeholder: "000000", required: true },
  ];
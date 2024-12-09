import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSchema, FormData } from "./form.types";
import { Input } from "@shared/Input/Input";
import useFormStore from "@store/formStore/useFormStore";
import { formEndpoint, formFields, formName } from "./form.consts";
import Spinner from "@shared/Spinner/Spinner";

export const PrescoringForm = () => {

	const api = import.meta.env.VITE_BASE_URL
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(formSchema),
	  });
  
	  const { forms, submitForm } = useFormStore();
	  const formState = forms[formName] || { isLoading: false, success: false, error: null };
	
	  const onSubmit: SubmitHandler<FormData> = async (data) => 
		{
		await submitForm(formName, data, `${api}/${formEndpoint}`);
	  };
  
	return (
	  <form
		onSubmit={handleSubmit(onSubmit)}>
		<h2>Contact Information</h2>
  
		{formState.isLoading ? <Spinner /> : formFields.map(({ name, label, type, placeholder, options, required }) => (
		  <Input
			key={name}
			label={label}
			type={type as "text" | "select"}
			placeholder={placeholder}
			options={options}
			error={errors[name as keyof FormData]?.message}
			register={register(name as keyof FormData)}
			required={required}
		  />
		))}

		{formState.success && (
		  <div>
			текст после успешного принятия
		  </div>
		)}
	  </form>
	);
  };
  
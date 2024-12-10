import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formSchema, FormData } from './form.types';
import { Input } from '@shared/UI/Input/Input';
import useFormStore from '@store/formStore/useFormStore';
import { formEndpoint, formFields, formName } from './form.consts';
import Spinner from '@shared/Spinner/Spinner';
import './PrescoringForm.scss';
import Button from '@shared/UI/Button/Button';
import { useSliderStore } from '@store/sliderStore/useSliderStore';

export const PrescoringForm = () => {
  const api = import.meta.env.VITE_BASE_URL;

  const { forms, submitForm } = useFormStore();
  const { value: amount} = useSliderStore();

  const formState = forms[formName] || {
    isLoading: false,
    success: false,
    error: null,
  };

  const {
    register,
    handleSubmit,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const getFieldSchema = (fieldName: keyof FormData) =>
    formSchema.pick({ [fieldName]: true } as Record<typeof fieldName, true>);

  const isValid = (fieldName: keyof FormData) => {
    const value = getValues(fieldName);
    const schema = getFieldSchema(fieldName);
    const result = schema.safeParse({ [fieldName]: value });
    return result.success;
  };

  const isFieldDirty = (fieldName: keyof FormData) => {
    const { isDirty } = getFieldState(fieldName);
    return isDirty;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
	const termField = formFields.find((field) => field.name === 'term');
  const termValue = termField?.options?.find((opt) => opt.label === data.term)?.value;
  const payload = {
    ...data,
    term: termValue ?? data.term, 
    amount,
  };
    await submitForm(formName, payload, `${api}${formEndpoint}`);
  };

  return (
	<>
	{formState.isLoading && (
		<div className="prescoring-form">
		<Spinner />
		</div>
	) }
	
	{!formState.isLoading && !formState.success && <form onSubmit={handleSubmit(onSubmit)} className="prescoring-form">
	<h2 className="prescoring-form__title">Contact Information</h2>
	<div className="prescoring-form__fields">
	  {formFields.map(
		  ({ name, label, type, placeholder, options, required }) => (
			<Input
			  key={name}
			  label={label}
			  type={type as 'text' | 'select' | 'date'}
			  placeholder={placeholder}
			  options={options}
			  error={errors[name as keyof FormData]?.message}
			  register={register(name as keyof FormData)}
			  required={required}
			  success={
				isValid(name as keyof FormData) &&
				isFieldDirty(name as keyof FormData)
			  }
			/>
		  ),
	  )}
	</div>
	<Button className="prescoring-form__button">Continue</Button>
  </form>} 
  {formState.success && <div>форма успешно отправлена</div>}
	</>
  );
};

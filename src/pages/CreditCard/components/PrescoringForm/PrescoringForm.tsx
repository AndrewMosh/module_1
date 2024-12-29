import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formSchema, FormData, TData } from './form.types';
import { DynamicInput, Spinner, Button, apiUrl } from '@shared';
import {usePrescoringStore, useSliderStore } from '@store';
import { formEndpoint, formFields, formName } from './form.consts';
import './PrescoringForm.scss';

export const PrescoringForm = () => {
  const { forms, submitForm } = usePrescoringStore();
  const { value: amount } = useSliderStore();

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
    return schema.safeParse({ [fieldName]: value }).success;
  };

  const isFieldDirty = (fieldName: keyof FormData) => {
    const { isDirty } = getFieldState(fieldName);
    return isDirty;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const termField = formFields.find((field) => field.name === 'term');
    const termValue = termField?.options?.find(
      (opt) => opt.label === data.term,
    )?.value;

    const payload: TData = {
      ...data,
      term: termValue ?? data.term,
      middleName: data.middleName === '' ? null : data.middleName,
      amount,
    };

    await submitForm(formName, payload, `${apiUrl}${formEndpoint}`);
  };

  return (
    <>
      {formState.isLoading ? (
        <div className="prescoring-form">
          <Spinner />
        </div>
      ) : (
        !formState.success && (
          <form onSubmit={handleSubmit(onSubmit)} className="prescoring-form">
            <h2 className="prescoring-form__title">Contact Information</h2>
            <div className="prescoring-form__fields">
              {formFields.map(
                ({
                  name,
                  label,
                  type,
                  placeholder,
                  options,
                  required,
                  disabled,
                }) => (
                  <DynamicInput
                    key={name}
                    label={label}
                    type={type as 'text' | 'select' | 'date'}
                    placeholder={placeholder}
                    options={options}
                    error={errors[name as keyof FormData]?.message}
                    register={register(name as keyof FormData)}
                    required={required}
                    disabled={disabled}
                    success={
                      isValid(name as keyof FormData) &&
                      isFieldDirty(name as keyof FormData)
                    }
                  />
                ),
              )}
            </div>
            <Button className="prescoring-form__button">Continue</Button>
            {formState.error && (
              <p className="prescoring-form__error">{formState.error}</p>
            )}
          </form>
        )
      )}
    </>
  );
};

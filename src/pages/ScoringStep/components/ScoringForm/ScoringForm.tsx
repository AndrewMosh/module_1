import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DynamicInput } from '@shared/UI/DynamicInput/DynamicInput';
import Spinner from '@shared/Spinner/Spinner';
import './ScoringForm.scss';
import Button from '@shared/UI/Button/Button';
import { scoreData, scoreSchema, TScore } from './form.types';
import {
  formName,
  formEndpoint,
  scoringFields,
  Employments,
} from './form.consts';
import { z } from 'zod';
import useScoringStore from '@store/scoringStore/useScoringStore';

export const ScoringForm = ({ id }: { id: string }) => {
  const api = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
  const { forms, submitForm } = useScoringStore();

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
  } = useForm<scoreData>({
    resolver: zodResolver(scoreSchema),
  });

  const getFieldSchema = (fieldName: keyof scoreData) =>
    z.object({
      [fieldName]: scoreSchema.shape[fieldName],
    });

  const isValid = (fieldName: keyof scoreData) => {
    const value = getValues(fieldName);
    const schema = getFieldSchema(fieldName);
    return schema.safeParse({ [fieldName]: value }).success;
  };

  const isFieldDirty = (fieldName: keyof scoreData) =>
    getFieldState(fieldName).isDirty;

  const getOptionValue = (fieldName: string, fieldValue: string) => {
    const formFields = [...scoringFields, ...Employments];
    const field = formFields.find((field) => field.name === fieldName);
    return (
      field?.options?.find((opt) => opt.label === fieldValue)?.value ||
      fieldValue
    );
  };

  const onSubmit: SubmitHandler<scoreData> = async (data) => {
    const payload: TScore = {
      ...data,
      gender: getOptionValue('gender', data.gender) as TScore['gender'],
      maritalStatus: getOptionValue(
        'maritalStatus',
        data.maritalStatus,
      ) as TScore['maritalStatus'],
      dependentAmount: Number(data.dependentAmount),
      employmentStatus: getOptionValue(
        'employmentStatus',
        data.employmentStatus,
      ) as TScore['employmentStatus'],
      position: getOptionValue('position', data.position) as TScore['position'],
      workExperienceTotal: Number(data.workExperienceTotal),
      workExperienceCurrent: Number(data.workExperienceCurrent),
      employerINN: Number(data.employerINN),
      salary: Number(data.salary),
    };

    await submitForm(formName, `${api}${formEndpoint}${id}`, payload);
  };

  const renderFields = (fields: typeof scoringFields | typeof Employments) =>
    fields.map(({ name, label, type, placeholder, options, required }) => (
      <DynamicInput
        key={name}
        label={label}
        type={type as 'text' | 'select' | 'date'}
        placeholder={placeholder}
        options={options}
        error={errors[name as keyof scoreData]?.message}
        register={register(name as keyof scoreData)}
        required={required}
        success={
          isValid(name as keyof scoreData) &&
          isFieldDirty(name as keyof scoreData)
        }
        className="scoring-form__field"
      />
    ));

  if (formState.isLoading) {
    return (
      <div className="prescoring-form">
        <Spinner />
      </div>
    );
  }

  if (formState.success) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="scoring-form">
      <div className="scoring-form__header">
        <h2 className="scoring-form__title">Continuation of the application</h2>
        <p className="scoring-form__subtitle">Step 2 of 5</p>
      </div>
      <div className="scoring-form__body">
        <div className="scoring-form__fields">
          <div className="scoring-form__scoring">
            {renderFields(scoringFields)}
          </div>
          <h2 className="scoring-form__fields-title">Employment</h2>
          <div className="scoring-form__employments">
            {renderFields(Employments)}
          </div>
        </div>
        <Button className="scoring-form__button">Continue</Button>
      </div>
      {formState.error && (
        <p className="scoring-form__error">{formState.error}</p>
      )}
    </form>
  );
};

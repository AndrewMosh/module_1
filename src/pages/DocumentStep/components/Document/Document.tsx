import './Document.scss';
import Button from '@shared/UI/Button/Button';
import Table from '@shared/UI/Table/Table';
import { columns } from './document.consts';
import { useAgreementStore } from '@store/agreementStore/useAgreementStore';
import usePaymentSchedule from '../hooks/usePaymentSchedule';
import Checkbox from '@shared/UI/Input/Checkbox/Checkbox';
import DenyModal from '../DenyModal/DenyModal';
import Spinner from '@shared/Spinner/Spinner';

export const Document = ({ id }: { id: string }) => {
  const api = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
  const { data, loading, error } = usePaymentSchedule(id);
  const { isAgreed, setAgreement } = useAgreementStore();

  const handleSend = async () => {
    if (isAgreed) {
      try {
        const response = await fetch(`${api}/document/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agreement: true }),
        });

        if (!response.ok) throw new Error('Failed to submit form');

        // Обработка успешной отправки
        console.log('Form submitted successfully');
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
  };

  if (loading) return <Spinner/>;
  if (error) return <p className="document__error">Error: {error}</p>;
  return (
    <div className="document">
      <div className="document__header">
        <h2 className="document__title">Payment Schedule</h2>
        <p className="document__steps">Step 3 of 5</p>
      </div>
      <Table columns={columns} data={data} />
      <div className="document__footer">
        <DenyModal id={id} />
        <div className="document__accept">
          <Checkbox
            label="I agree with the payment schedule"
            checked={isAgreed}
            onChange={setAgreement}
			className='document__checkbox'
          />
          <Button
            className="document__send"
            onClick={handleSend}
            disabled={!isAgreed}
          >
            Send
          </Button>
        </div>
		
      </div>
	  <Checkbox label="I agree with the payment schedule"
            checked={isAgreed}
            onChange={setAgreement}
			className='document__checkbox--mobile'/>
    </div>
  );
};

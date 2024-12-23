import  { useEffect, useState } from 'react';
import './Document.scss';
import Button from '@shared/UI/Button/Button';
import Table from '@shared/UI/Table/Table';
import { columns } from './document.consts';
import Checkbox from '@shared/UI/Input/Checkbox/Checkbox';
import DenyModal from '../DenyModal/DenyModal';
import Spinner from '@shared/Spinner/Spinner';
import { usePaymentScheduleStore } from '@store/paymentScheduleStore/usePaymentScheduleStore';
import { useDocumentStore } from '@store/documetStore/useDocumentStore';

export const Document = ({ id }: { id: string }) => {
	const [isLoaded, setIsLoaded] = useState(false);
  const { isAgreed, setAgreement,loading:isSending, error, sendAgreement } =
    useDocumentStore();

	const { data, loading:isFetching,  fetchPaymentSchedule } = usePaymentScheduleStore();

	console.log(data);

	useEffect(() => {
		const fetchData = async () => {
		  await fetchPaymentSchedule(id);
		  setIsLoaded(true);
		};
	
		fetchData();
	  }, [id, fetchPaymentSchedule]);

  

  const handleSend = async () => {
    if (isAgreed) {
      await sendAgreement(id);
    }

  };


  if (isSending || isFetching || !isLoaded) return <Spinner />;
  if (error) return <p className="document__error">Error: {error}</p>;
  if (isLoaded && data.length === 0) return <p className="document__nodata">No data found on application {id}</p>;



  return (
    <div className="document">
      <div className="document__header">
        <h2 className="document__title">Payment Schedule</h2>
        <p className="document__steps">Step 3 of 5</p>
      </div>
      <Table columns={columns} data={data || []} />
      <div className="document__footer">
        <DenyModal id={id} />
        <div className="document__accept">
          <Checkbox
            label="I agree with the payment schedule"
            checked={isAgreed}
            onChange={setAgreement}
            className="document__checkbox"
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
      <Checkbox
        label="I agree with the payment schedule"
        checked={isAgreed}
        onChange={setAgreement}
        className="document__checkbox--mobile"
      />
    </div>
  );
};

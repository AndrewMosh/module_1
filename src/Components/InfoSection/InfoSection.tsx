import { Cashback } from '@components/Cashback/Cashback';
import './InfoSection.scss';
import { AboutCard } from '@components/AboutCard/AboutCard';
// import { RatesAndConditions } from '@components/RatesAndConditions/RatesAnsConditions';
export const InfoSection = () => {
  return (
    <div>
      <AboutCard />
      {/* <RatesAndConditions /> */}
	  <Cashback/>
    </div>
  );
};

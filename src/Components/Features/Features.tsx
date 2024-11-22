import './Features.scss';
import { features } from './features.utils';
import illustration from '@assets/svg/features.svg';

const Features = () => {
  return (
    <section className='features' aria-label="Features Section">
      <div className='features__container'>
		<div className='features__inner'>
			<img src={illustration} alt="illustration" />
		</div>
      
        <div className='features__inner'>
		<h2 className='features__title'>We Provide Many Features You Can Use</h2>
        <p className='features__subtitle'>
          You can explore the features that we provide with fun and have their own functions for each feature.
        </p>
          {features.map((feature) => (
            <ul key={feature.id} className='features__list'>
			  <li className='features__item'>{feature.title}</li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

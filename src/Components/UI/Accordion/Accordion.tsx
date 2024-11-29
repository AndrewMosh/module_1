import { useState } from "react";
import { AccordionProps } from "./accordion.types";
import './Accordion.scss';
import up from '@assets/svg/up.svg'
import down from '@assets/svg/down.svg'

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
  
	const toggleAccordion = (index: number) => {
	  setOpenIndex(openIndex === index ? null : index);
	};
  
	return (
	  <div className="accordion">
		{items.map((item, index) => (
  <div key={index} className="accordion__item">
    <button
      className={`accordion__title ${
        openIndex === index ? 'accordion__title--open' : ''
      }`}
      onClick={() => toggleAccordion(index)}
    >
      <span className="accordion__title-text">{item.question}</span>
      <img
        className="accordion__icon"
        src={openIndex === index ? up : down}
        alt="Toggle accordion"
      />
    </button>
    <div
      className={`accordion__content ${
        openIndex === index ? 'accordion__content--open' : ''
      }`}
    >
      {openIndex === index && <p>{item.answer}</p>}
    </div>
  </div>
))}

	  </div>
	);
  };
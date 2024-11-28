// components/Spinner.tsx
import React from 'react';
import './Spinner.scss';
import { SpinnerCircular } from 'spinners-react';

const Spinner: React.FC = () => {
  return (
    <div className="spinner">
      <SpinnerCircular size={70} thickness={50} speed={100} color="#b4387a" />
    </div>
  );
};

export default Spinner;

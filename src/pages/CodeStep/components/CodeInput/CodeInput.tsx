import React, { useRef } from 'react';
import './CodeInput.scss';
import { useCodeStore } from '@store';
import {Spinner} from '@shared';

export const CodeInput = ({ id }: { id: string }) => {
  const { code, setCode, sendCode, error, loading } = useCodeStore();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = async (index: number, value: string) => {
    if (/^\d$/.test(value) || value === '') {
      setCode(index, value);

      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      if (value && index === code.length - 1) {
        await sendCode(id);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      setCode(index - 1, '');
      inputsRef.current[index - 1]?.focus();
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="code">
      <div className="code__wrapper">
        <label className="code__label">Please enter confirmation code</label>
        <div className="code__inputs">
          {code.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="code__input"
            />
          ))}
        </div>
        {error && <p className="code__error">{error}</p>}
      </div>
    </div>
  );
};

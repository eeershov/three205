import { useState, useRef } from 'react';
import { User, ApiResponse } from '../../interfaces';
import UsersSection from '../UsersSection';
import LoadingStatus from '../LoadingStatus';
import ErrorMessage from '../ErrorMessage';
import { maskNumber } from '../../utils/maskNumber';
import { backendUrl } from '../../utils/address';

function MainPage() {
  const [inputs, setInputs] = useState(
    {email: '', number: {actualNumber: '', maskedNumber: ''}});
  const [data, setData] = useState<ApiResponse<User[]>>(
    {success: false, code: 0, message: '', error: false, data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [newInput, setNewInput] = useState(false);

  const abortController = useRef<AbortController>()

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({...prev, email: event.target.value}));
    setNewInput(true);
  };

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const maskedNumber = maskNumber(inputValue);
    const actualNumber = inputValue.replace(/[^\d]/g, ''); // remove non digits
    setInputs(prev => ({...prev, number: {actualNumber, maskedNumber}}));
    setNewInput(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (abortController.current) {
      abortController.current.abort()
    }
    setIsLoading(true);
    abortController.current = new AbortController();
    const {signal} = abortController.current;

    try {
      const queryParams = new URLSearchParams();
      queryParams.append('email', inputs.email);
      queryParams.append('number', inputs.number.actualNumber);
      
      const url = `${backendUrl}?${queryParams.toString()}`;
      setNewInput(false);
  
      const response = await fetch(url, {
        signal: signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: ApiResponse<User[]> = await response.json();
      if (data.data.length >= 0) {
        setData(data);
        setIsLoading(false);
      }
    } catch (error) {
      if (!signal.aborted) setIsLoading(false); // if error is not due to user aborting request 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter e-mail*
          <input
            type="text"
            value={inputs.email}
            onChange={handleEmailInput}
            placeholder="ivanov@gmail.com"
            required
          />
        </label>
        <label className='number'>
          Enter number
          <input
            type="text"
            value={inputs.number.maskedNumber}
            onChange={handleNumberInput}
            placeholder="22-22-22"
          />
        </label>
        <button type="submit" disabled={!newInput && isLoading}>{<LoadingStatus isLoading={isLoading} />}SUBMIT</button>
        <span className='legend'>* Required fields</span>
      </form>
      <ErrorMessage data={data} />
      <UsersSection data={data} />
    </>
  );
}

export default MainPage;

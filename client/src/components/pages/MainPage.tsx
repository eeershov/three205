import { useState } from 'react';
import { User, ApiResponse } from '../../interfaces';
import UsersSection from '../UsersSection';
import LoadingStatus from '../LoadingStatus';
import ErrorMessage from '../ErrorMessage';

function MainPage() {
  const [inputs, setInputs] = useState(
    {email: '', number: {actualNumber: '', maskedNumber: ''}});
  const [data, setData] = useState<ApiResponse<User[]>>(
    {success: false, code: 0, message: '', error: false, data: []});
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({...prev, email: event.target.value}));
  };

  const maskNumber = (number: string) => {
    return number
      .replace(/(\d{2})(?=\d{1})/g, '$1-') // hyphen after every 2 chars
      .replace(/-+/g, '-') // consecutive hyphens replaced with a single one
      .replace(/-$/, '') // remove end hyphen
      .replace(/[^\d-]/g, ''); // remove non-digits and non-hyphens
  }

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const maskedNumber = maskNumber(inputValue);
    const actualNumber = inputValue.replace(/[^\d]/g, ''); // remove non digits
    setInputs(prev => ({...prev, number: {actualNumber, maskedNumber}}));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('email', inputs.email);
      queryParams.append('number', inputs.number.actualNumber);
  
      const url = `http://localhost:9090/api/users?${queryParams.toString()}`;
  
      const response = await fetch(url, {
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
      setIsLoading(false);
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
        <button type="submit" disabled={isLoading}>{<LoadingStatus isLoading={isLoading} />}SUBMIT</button>
        <span className='legend'>* Required fields</span>
      </form>
      <ErrorMessage data={data} />
      <UsersSection data={data} />
    </>
  );
}

export default MainPage;

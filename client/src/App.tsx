import { useState } from 'react';
import './App.css';
import {User, ApiResponse} from './interfaces';
import UsersSection from './components/UsersSection';
import LoadingStatus from './components/LoadingStatus';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState({actualNumber: '', maskedNumber: ''});
  const [data, setData] = useState<ApiResponse<User[]>>(
    {success: false, code: 0, message: '', error: false, data: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const maskNumber = (number: string) => {
    return number.replace(/(\d{2})(?=\d{1})/g, '$1-').replace(/-$/, '');
  }

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const maskedNumber = maskNumber(inputValue);
    const actualNumber = inputValue.replace(/-/g, '');
    setNumber({ maskedNumber, actualNumber });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('email', email);
      queryParams.append('number', number.actualNumber);
  
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
            value={email}
            onChange={handleEmailInput}
            placeholder="ivanov@gmail.com"
            required
          />
        </label>
        <label className='number'>
          Enter number
          <input
            type="text"
            value={number.maskedNumber}
            onChange={handleNumberInput}
            placeholder="22-22-22"
          />
        </label>
        <button type="submit">{<LoadingStatus isLoading={isLoading} />}SUBMIT</button>
        <span className='legend'>* Required fields</span>
      </form>
      <ErrorMessage data={data} />
      <UsersSection data={data} />
    </>
  );
}

export default App

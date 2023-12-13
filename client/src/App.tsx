import { useState } from 'react';
import './App.css'

function App() {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email);
    console.log(number);
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
            value={number}
            onChange={handleNumberInput}
            placeholder="22-22-22"
          />
        </label>
        <button type="submit">SUBMIT</button>
        <span className='legend'>* Required fields</span>
      </form>
    </>
  );
}

export default App

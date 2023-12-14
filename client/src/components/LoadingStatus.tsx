import loader from '../assets/loader.svg'; 

function LoadingStatus({isLoading}: {isLoading: boolean}) {
  return (
    <div className="loader">
      {
      isLoading 
      ? <img src={loader} alt='loading icon' className='loader-icon'/>
      : null
      }
    </div>
  )
}

export default LoadingStatus

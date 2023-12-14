function LoadingStatus({isLoading}: {isLoading: boolean}) {
  return (
    <div>{isLoading ? 'Loading...' : null}</div>
  )
}

export default LoadingStatus

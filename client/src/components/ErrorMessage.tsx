import {ApiResponse, User} from "../interfaces/"

function ErrorMessage({data}: {data: ApiResponse<User[]>}) {
  const {error, message} = data;
  return (
    <div>
      { error ? <p>{message}</p> : null }
    </div>
  )
}

export default ErrorMessage

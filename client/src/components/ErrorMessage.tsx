import {ApiResponse, User} from "../interfaces/"

function ErrorMessage({data}: {data: ApiResponse<User[]>}) {
  const {error, message} = data;
  return (
    <>
    { 
    error 
      ? 
      <section>
        <h2>Error message</h2>
        <article>
          <span>{message}</span>
        </article>
      </section>
      : null 
    }
    </>
  )
}

export default ErrorMessage

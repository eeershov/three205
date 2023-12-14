import { ApiResponse, User } from "../interfaces"

function UsersSection({data} :{data: ApiResponse<User[]>}) {
  const users = data.data;
  return (
    <section>
      {
        users.length > 0 
        ? <section>
            <h2>Clients information</h2>
            {
              users.map(user =>   
                <article key={user.email+user.number}>
                  <span>{user.email}</span>
                  <span>{user.number}</span>
                </article>
              )
            }
          </section>
        : null
      }
    </section>
  )
}

export default UsersSection

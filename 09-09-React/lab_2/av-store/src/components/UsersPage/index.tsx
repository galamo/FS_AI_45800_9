import axios from "axios"
import { useEffect, useState } from "react"
import ErrorMessage from "../ErrorMessage"
import Spinner from "../Spinner"
import UserCard from "../UserCard"
import "./users-page.css"
import type { SingleUserType } from "./user-type"
import { getUsersApi } from "./users-api"

export default function UsersPage() {
  const [usersData, setUsersData] = useState<Array<SingleUserType>>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUsersApi() {
      try {
        setIsLoading(true)
        setError("")
        const result = await getUsersApi()
        setUsersData(result)
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.message
          : err instanceof Error
            ? err.message
            : "Failed to load users"
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsersApi()
  }, [])

  return (
    <section className="users-page" aria-busy={isLoading}>
      <header className="users-page__header">
        <h1>Users</h1>
        <p className="users-page__subtitle">People loaded from Random User</p>
      </header>

      <ErrorMessage
        title="Could not load users"
        message={error}
        onDismiss={() => setError("")}
      />

      {isLoading && <Spinner message="Loading users…" />}

      {!isLoading && (
        <div className="users-page__grid">
          {usersData.map((singleUser) => (
            <UserCard
              key={singleUser.login.uuid}
              user={singleUser}
              onRemove={() => {
                const restOfUsersWithoutThisOne = usersData.filter(
                  (user) => user.login.uuid !== singleUser.login.uuid,
                )
                setUsersData(restOfUsersWithoutThisOne)
              }}
            />
          ))}
        </div>
      )}

      <div className="users-page__actions">
        <button
          type="button"
          className="users-page__load-more"
          aria-label="Clear all data"
          disabled={isLoading || usersData.length === 0}
          onClick={() => {
            setUsersData([])
          }}
        >
          Clear all Data
        </button>
      </div>


    </section>
  )
}




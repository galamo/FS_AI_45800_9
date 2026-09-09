import axios from "axios"
import { useEffect, useState } from "react"
import ErrorMessage from "../ErrorMessage"
import Spinner from "../Spinner"
import UserCard from "../UserCard"
import UsersMap from "../UsersMap"
import "./users-page.css"
import type { SingleUserType } from "./user-type"
import { getUsersApi } from "./users-api"

export default function UsersPage() {
  const [usersData, setUsersData] = useState<Array<SingleUserType>>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  async function loadUsers(append: boolean) {
    try {
      if (append) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }
      setError("")
      const result = await getUsersApi()
      setUsersData((currentUsers) => {
        if (!append) {
          return result
        }

        const existingIds = new Set(currentUsers.map((user) => user.login.uuid))
        const extraUsers = result.filter((user) => !existingIds.has(user.login.uuid))
        return [...currentUsers, ...extraUsers]
      })
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.message
        : err instanceof Error
          ? err.message
          : "Failed to load users"
      setError(message)
    } finally {
      if (append) {
        setIsLoadingMore(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    loadUsers(false)
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

      {!isLoading && usersData.length > 0 && <UsersMap users={usersData} />}

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
          aria-label="Load more users"
          disabled={isLoading || isLoadingMore}
          onClick={() => {
            loadUsers(usersData.length > 0)
          }}
        >
          {isLoadingMore ? "Loading more…" : "Load more users"}
        </button>
        <button
          type="button"
          className="users-page__clear"
          aria-label="Clear all data"
          disabled={isLoading || isLoadingMore || usersData.length === 0}
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




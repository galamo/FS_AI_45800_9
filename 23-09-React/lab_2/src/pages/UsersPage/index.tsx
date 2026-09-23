import axios from "axios"
import { useEffect, useState } from "react"
import ErrorMessage from "../../components/ErrorMessage"
import Spinner from "../../components/Spinner"
import UserCard from "../../components/UserCard"
import UsersMap from "../../components/UsersMap"
import "./users-page.css"
import type { SingleUserType } from "./user-type"
import { getUsersApi } from "./users-api"

function toErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) {
    return err.message
  }

  if (err instanceof Error) {
    return err.message
  }

  return "Failed to load users"
}

export default function UsersPage() {
  const [usersData, setUsersData] = useState<Array<SingleUserType>>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showMap, setShowMap] = useState<boolean>(true)

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
      setError(toErrorMessage(err))
    } finally {
      if (append) {
        setIsLoadingMore(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    let cancelled = false

    async function loadInitialUsers() {
      try {
        const result = await getUsersApi()
        if (cancelled) {
          return
        }
        setUsersData(result)
      } catch (err) {
        if (cancelled) {
          return
        }
        setError(toErrorMessage(err))
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialUsers()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="users-page" aria-busy={isLoading}>
      <header className="users-page__header">
        <h1>Users</h1>
        <p className="users-page__subtitle">People loaded from Random User</p>
      </header>
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
      <ErrorMessage
        title="Could not load users"
        message={error}
        onDismiss={() => setError("")}
      />

      {isLoading && <Spinner message="Loading users…" />}
      <button
        type="button"
        className="users-page__load-more users-page__map-toggle"
        onClick={() => {
          setShowMap((current) => !current)
        }}
      >
        {showMap ? "Hide Map" : "Show Map"}
      </button>
      {!isLoading && usersData.length > 0 && showMap && <UsersMap users={usersData} />}

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

     


    </section>
  )
}




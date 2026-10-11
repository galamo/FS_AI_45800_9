import UserCard from "../../components/UserCard"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { removeFavorite, selectFavoriteUsers, clearFavorites } from "../../store/favoritesReducer"
import "./favorites-page.css"

export default function FavoritesPage() {
  const dispatch = useAppDispatch()
  const favoriteUsers = useAppSelector((state) =>  state.favorites.users )

  return (
    <section className="favorites-page">
      <header className="favorites-page__header">
        <h1>Favorites</h1>
        <p className="favorites-page__subtitle">
          {favoriteUsers.length === 0
            ? "Users you save from the Users page show up here."
            : `${favoriteUsers.length} saved ${favoriteUsers.length === 1 ? "user" : "users"}`}
        </p>
      </header>
      <div>
        <button onClick={() => dispatch(clearFavorites())}> Clear All Favorites </button>
      </div>

      {favoriteUsers.length === 0 ? (
        <p className="favorites-page__empty">No favorite users yet.</p>
      ) : (
        <div className="favorites-page__grid">
          {favoriteUsers.map((user) => (
            <UserCard
              key={user.login.uuid}
              user={user}
              removeLabel="Remove from favorites"
              onRemove={() => {
                dispatch(removeFavorite(user.login.uuid))
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}

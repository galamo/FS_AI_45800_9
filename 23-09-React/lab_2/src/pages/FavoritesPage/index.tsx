import UserCard from "../../components/UserCard"
import { useFavoritesContext } from "../../context/FavoritesContext"
import "../UsersPage/users-page.css"

export default function FavoritesPage() {
  const { favorites } = useFavoritesContext()

  return (
    <section className="users-page">
      <header className="users-page__header">
        <h1>Favorites</h1>
        <p className="users-page__subtitle">
          Your favorite users
        </p>
      </header>

      {favorites.length === 0 && (
        <p>No favorites yet.</p>
      )}

      <div className="users-page__grid">
        {favorites.map(user => (
          <UserCard
            key={user.login.uuid}
            user={user}
          />
        ))}
      </div>
    </section>
  )
}
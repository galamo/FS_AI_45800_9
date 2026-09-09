import "./user-card.css"
import type { SingleUserType } from "../UsersPage/user-type"

type UserCardProps = {
  user: SingleUserType
  onRemove: () => void
}

export default function UserCard(props: UserCardProps) {
  const { user, onRemove } = props
  const { name, gender, picture, email, location } = user
  const fullName = `${name.title} ${name.first} ${name.last}`

  return (
    <article className="user-card">
      <img
        className="user-card__image"
        src={picture.large}
        alt={fullName}
        width={120}
        height={120}
      />
      <div className="user-card__body">
        <span className="user-card__gender">{gender}</span>
        <h2 className="user-card__name">{fullName}</h2>
        <p className="user-card__email">{email}</p>
        <p className="user-card__location">
          {location.city}, {location.country}
        </p>
      </div>
      <button
        type="button"
        className="user-card__remove"
        onClick={onRemove}
      >
        Remove User
      </button>
    </article>
  )
}

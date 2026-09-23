import { useState } from "react"
import AdditionalInfo from "../AdditionalInfo"
import "./user-card.css"
import type { SingleUserType } from "../../pages/UsersPage/user-type"

type UserCardProps = {
  user: SingleUserType
  onRemove: () => void
}

export default function UserCard(props: UserCardProps) {
  const { user, onRemove } = props
  const { name, gender, picture, email, location } = user
  const fullName = `${name.title} ${name.first} ${name.last}`
  const [showDetails, setShowDetails] = useState(false)

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
        className="user-card__details-toggle"
        aria-expanded={showDetails}
        onClick={() => {
          setShowDetails((current) => !current)
        }}
      >
        {showDetails ? "Hide info" : "More info"}
      </button>
      {showDetails && <AdditionalInfo user={user} />}
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

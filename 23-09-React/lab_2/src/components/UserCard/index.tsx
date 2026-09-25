import { useState } from "react"
import AdditionalInfo from "../AdditionalInfo"
import "./user-card.css"
import type { SingleUserType } from "../../pages/UsersPage/user-type"
import { Button, Chip } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { useAppContext } from "../../context/AppContext"
import { format } from "date-fns"
import { useFavoritesContext } from "../../context/FavoritesContext"

type UserCardProps = {
  user: SingleUserType
  onRemove?: () => void
}

export default function UserCard(props: UserCardProps) {


  const { user, onRemove } = props
  const { name, gender, picture, email, location } = user
  const fullName = `${name.title} ${name.first} ${name.last}`
  const [showDetails, setShowDetails] = useState(false)
  const { settings } = useAppContext()
  const { isLocalTime } = settings

  const timeStamp = format(isLocalTime ? new Date(user.registered.date).toLocaleString() : user.registered.date, settings.dateFormat)
  const { favorites, addFavorite } = useFavoritesContext()

  const isFavorite = favorites.some(
    favorite => favorite.login.uuid === user.login.uuid
  )
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
        <div>
          <Chip label={timeStamp} color="primary" />
        </div>
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
      {onRemove && (
        <button
          type="button"
          className="user-card__remove"
          onClick={onRemove}
        >
          Remove User
        </button>
      )}
      <Button
        type="button"
        variant="outlined"
        fullWidth
        disabled={isFavorite}
        startIcon={
          isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
        }
        onClick={() => addFavorite(user)}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          minHeight: 40,
          "&.Mui-disabled": {
            color: "primary.main",
            borderColor: "primary.light",
            backgroundColor: "action.hover",
          },
        }}
      >
        {isFavorite ? "Added to favorites" : "Add to favorites"}
      </Button>
    </article>
  )
}

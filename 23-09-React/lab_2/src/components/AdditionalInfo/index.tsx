import "./additional-info.css"
import type { SingleUserType } from "../../pages/UsersPage/user-type"

type AdditionalInfoProps = {
  user: SingleUserType
}

export default function AdditionalInfo(props: AdditionalInfoProps) {
  const { user } = props
  const { name, phone, dob, location } = user
  const fullName = `${name.title} ${name.first} ${name.last}`

  return (
    <section className="additional-info" aria-label="Additional user info">
      <dl>
        <div className="additional-info__row">
          <dt>Full name</dt>
          <dd>{fullName}</dd>
        </div>
        <div className="additional-info__row">
          <dt>Phone</dt>
          <dd>{phone}</dd>
        </div>
        <div className="additional-info__row">
          <dt>Age</dt>
          <dd>{dob.age}</dd>
        </div>
        <div className="additional-info__row">
          <dt>Lat / long</dt>
          <dd>
            {location.coordinates.latitude}, {location.coordinates.longitude}
          </dd>
        </div>
      </dl>
    </section>
  )
}

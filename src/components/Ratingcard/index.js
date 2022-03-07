import './index.css'

const Ratingcard = props => {
  const {eachone, ratingWise} = props
  const {ratingId} = eachone

  const onclickratingone = () => {
    ratingWise(ratingId)
  }

  return (
    <li key={eachone.ratingId} className="list-itemone">
      <button
        className="butttoncategory"
        type="button"
        onClick={onclickratingone}
      >
        <img
          src={eachone.imageUrl}
          alt={`rating ${ratingId}`}
          className="starimageone"
        />
      </button>
    </li>
  )
}

export default Ratingcard

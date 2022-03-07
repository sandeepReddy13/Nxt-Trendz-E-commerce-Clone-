import {BsSearch} from 'react-icons/bs'
import CategoryCard from '../CategoryCard'
import './index.css'
import Ratingcard from '../Ratingcard'

const FiltersGroup = props => {
  const {
    categoryWise,
    categoryOptions,
    ratingsList,
    ratingWise,
    searchWise,
    clearBtn,
    searchInput,
    searchWise1,
  } = props

  const onchangeSearch = event => {
    searchWise(event.target.value)
  }

  const onEnterOne = event => {
    if (event.key === 'Enter') {
      searchWise1(event.target.value)
    }
  }

  const clearFilterBtnclicked = () => {
    clearBtn()
  }

  return (
    <div className="filters-group-container">
      <div className="searchboxcontainer">
        <input
          value={searchInput}
          type="search"
          className="searchInput"
          placeholder="Search"
          onChange={onchangeSearch}
          onKeyDown={onEnterOne}
        />
        <BsSearch />
      </div>
      <h1 className="categoryaparagraph">Category</h1>
      <ul>
        {categoryOptions.map(each => (
          <CategoryCard
            categoryWise={categoryWise}
            each={each}
            key={each.categoryId}
          />
        ))}
      </ul>
      <p className="categoryaparagraph">Rating</p>
      <ul>
        {ratingsList.map(eachone => (
          <Ratingcard
            eachone={eachone}
            key={eachone.ratingId}
            ratingWise={ratingWise}
          />
        ))}
      </ul>
      <button
        type="button"
        className="clearfilterbutton"
        onClick={clearFilterBtnclicked}
      >
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup

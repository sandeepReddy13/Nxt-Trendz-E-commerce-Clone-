const CategoryCard = props => {
  const {each, categoryWise} = props
  const {categoryId, name} = each

  const onclickCategoryname = () => {
    categoryWise(categoryId)
  }

  return (
    <li className="list-itemone">
      <button
        className="butttoncategory"
        type="button"
        onClick={onclickCategoryname}
      >
        {name}
      </button>
    </li>
  )
}

export default CategoryCard

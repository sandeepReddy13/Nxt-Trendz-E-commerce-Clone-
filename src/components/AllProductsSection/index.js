import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    categoryData: '',
    ratingData: '',
    isTrue: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  categoryWise = categoryData => {
    this.setState({categoryData}, this.getProducts)
  }

  ratingWise = ratingid => {
    this.setState({ratingData: ratingid}, this.getProducts)
  }

  clearBtn = () => {
    this.setState(
      {
        activeOptionId: sortbyOptions[0].optionId,
        searchInput: '',
        categoryData: '',
        ratingData: '',
      },
      this.getProducts,
    )
  }

  searchWise = searchInput1 => {
    this.setState({searchInput: searchInput1})
  }

  searchWise1 = searchInput2 => {
    this.setState({searchInput: searchInput2}, this.getProducts)
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {activeOptionId, categoryData, ratingData, searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryData}&title_search=${searchInput}&rating=${ratingData}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData.products.map(product => ({
      title: product.title,
      brand: product.brand,
      price: product.price,
      id: product.id,
      imageUrl: product.image_url,
      rating: product.rating,
    }))
    if (response.ok) {
      this.setState({
        productsList: updatedData,
        isLoading: false,
        isTrue: true,
      })
    } else if (response.status === 401) {
      this.setState({
        isTrue: false,
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  renderProductsList = () => {
    const {isTrue, productsList, activeOptionId} = this.state
    console.log(productsList)
    if (productsList.length !== 0) {
      return (
        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          {isTrue ? (
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          ) : (
            <div>
              <img
                alt="products failure"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
              />
              <h1>Oops!Something Went Wrong</h1>
              <p>
                We are having some trouble processing your request Please try
                again.
              </p>
            </div>
          )}
        </div>
      )
    }
    return (
      <div>
        <img
          alt="no products"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png "
        />
        <h1>No Products Found</h1>
        <p>We could not find any products Try other filters</p>
      </div>
    )

    // TODO: Add No Products View
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading, searchInput} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          categoryWise={this.categoryWise}
          ratingWise={this.ratingWise}
          searchWise={this.searchWise}
          clearBtn={this.clearBtn}
          searchInput={searchInput}
          searchWise1={this.searchWise1}
        />

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection

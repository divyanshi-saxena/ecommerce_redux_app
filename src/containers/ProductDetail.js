import React, { useEffect } from 'react'
import { useParams } from 'react-router' // for getting url parameter
import axios from 'axios' 
import { useDispatch } from 'react-redux';
import { selectedProducts, removeSelectedProducts } from '../redux/actions/productActions';
import { useSelector } from 'react-redux';

const ProductDetail = () => {
  const product = useSelector(state => state.product)
  const { title, image, price, category, description } = product;
  // console.log(product)
  const { productId } = useParams();
  // console.log(productId)
  const dispatch = useDispatch()

  const fetchProductDetail = async (productId) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`).catch((err) => {
      console.log("err: ", err)
    })
    dispatch(selectedProducts(response.data))
    // console.log(product)
  }

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId)
    return () => {
      dispatch(removeSelectedProducts())
    }
  }, [productId])

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img src={image} className="ui fluid image" />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
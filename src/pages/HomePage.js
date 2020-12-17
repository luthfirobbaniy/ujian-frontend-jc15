import Axios from 'axios'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { CardProduct } from '../components'
import { api_url } from '../helpers/api_url'
import { getProductData, getCategoryData } from '../redux/action/productAction'
import Select from 'react-select'
import { Link } from 'react-router-dom'

class HomePage extends Component{
    state = {}

    componentDidMount(){
        const {getProductData, getCategoryData} = this.props
        getProductData()
        getCategoryData()
    }

    cek = () => {
        console.log(this.props.categoryData)
    }

    renderProduct = () => {
        const {productData} = this.props
        return productData.map((val) => {
            return (
                <div style={{margin:"0 0 0 30px", display: "flex", flexWrap: "wrap"}}> 
                    <Link to={`/product-detail?id=${val.id}`}>
                        <CardProduct name={val.name} price={val.price} image={val.image}/>
                    </Link>
                </div>
            )
        })
    }

    render(){
        return (
            <div>
                <div className="row">
                    {this.renderProduct()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        productData: state.product.productData,
        categoryData: state.product.categoryData
    }
}

export default connect(mapStateToProps, {getProductData, getCategoryData})(HomePage)
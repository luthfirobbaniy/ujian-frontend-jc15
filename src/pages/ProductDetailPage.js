import Axios from 'axios'
import React, {Component} from 'react'
import queryString from 'querystring'
import { connect } from 'react-redux'
import { api_url } from '../helpers/api_url'
import { Redirect } from 'react-router-dom'
import { getProductDataByProductID } from '../redux/action/productAction'
import { Button } from 'reactstrap'
import swal from 'sweetalert'
import {addToCart, getCartData} from '../redux/action'

class ProductDetailPage extends Component{
    state = {
        qty: 1,
        bool: true
    }

    componentDidMount(){
        const {getProductDataByProductID, getCartData, userID} = this.props
        const productID = queryString.parse(this.props.location.search)["?id"]
        getProductDataByProductID(productID)
        getCartData(userID)
    }

    componentDidUpdate(prevProps, prevState){
        const {getCartData, userID} = this.props
        if(prevProps.userID !== this.props.userID || prevState.bool !== this.state.bool){
            getCartData(userID)
        }
    }

    decreaseQty = () => {
        this.setState({
            qty: this.state.qty - 1
        })
    }

    increaseQty = () => {
        this.setState({
            qty: this.state.qty + 1
        })
    }

    addToCart = () => {
        const {productData, userID, cart} = this.props
        const {name, price, stock, category, image, id} = productData
        const {qty} = this.state

        const cartData = {
            name,
            price,
            qty,
            stock,
            category,
            image,
            productID: id,
            userID
        }

        let userCartData = cart.find((val) =>{
            return val.productID == id
        })
        
        if(userID !== 0){
            if(userCartData !== undefined){
                if((userCartData.qty + qty) <= stock){
                    const abc = {
                        qty: userCartData.qty + qty
                    }
                    console.log(abc)
                    Axios.patch(`${api_url}/cart/${userCartData.id}`, abc)
                        .then((res) => {
                            console.log(res.data)
                            this.setState({
                                bool: !this.state.bool
                            })
                            swal( swal("Added to cart", "Quantity barang sudah ditambahkan", "success"))
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }else{
                    swal("Gagal ditambahkan", "Jumlah yang anda inginkan melebihi stok yang kami punya", "error")
                }
            }else{
                this.props.addToCart(cartData, userID)
            }
        }else{
            swal("Hayo, belum login ya?", "Gimana mau beli kalau belum login, login dulu yuk!")
        }

    }

    render(){
        const {productData} = this.props
        const {name, price, stock, category, image} = productData
        const {qty} = this.state

        if(productData.length === 0){
            return(
                <div>Loading</div>
            )
        }else{
            return(
                <div className="container">
                    <div className="row" style={{display:"flex", alignItems:"center"}}>
                        <div className="col-7">
                            <img src={image} alt={name}/>
                        </div>
                        <div className="col-5">
                            <h1>{name}</h1>
                            <h4>Rp. {price.toLocaleString()}</h4>
                            <p>Stok tersedia: {stock}</p>
                            {/* <p>Di cart anda: {cartData.productID.qty}</p> */}
                            <div className="my-3">
                                <Button onClick={this.decreaseQty} disabled={qty === 1}>-</Button>
                                <span className="mx-3">{qty}</span>
                                <Button onClick={this.increaseQty} disabled={qty === stock}>+</Button>
                            </div>
                            <p>Ini adalah bagian deskripsi produk. Bagian ini diisi dengan deskripsi dari produk. Deskripsi produk dapat membantu user untuk lebih mengenal produk yang dilihatnya. </p>
                            <Button onClick={this.addToCart}>Add to cart</Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        productData: state.product.productDataByProductID,
        userID: state.user.userID,
        cart: state.cart.cartData
    }
}

export default connect(mapStateToProps, {getProductDataByProductID, addToCart, getCartData}) (ProductDetailPage)
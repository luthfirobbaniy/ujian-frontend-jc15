import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getCartData } from '../redux/action'
import { Button, Table } from 'reactstrap'
import Axios from 'axios'
import { api_url } from '../helpers/api_url'
import swal from 'sweetalert'

class CartPage extends Component {
    state={
        bool: true
    }

    componentDidMount(){
        const {getCartData, userID} = this.props
        getCartData(userID)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState !== this.state || prevProps.userID !== this.props.userID){
            const {getCartData, userID} = this.props
            getCartData(userID)
        }
    }

    decreaseQty = (index, id) => {
        const {cartData} = this.props
        let decrease = {
            qty: cartData[index].qty - 1
        }

        Axios.patch(`${api_url}/cart/${id}`, decrease)
            .then((res) => {
                this.setState({
                    bool: !this.state.bool
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    increaseQty = (index, id) => {
        const {cartData} = this.props
        let increase = {
            qty: cartData[index].qty + 1
        }

        if(increase.qty > cartData[index].stock){
            alert("stok tidak mencukupi")
        }else{
            Axios.patch(`${api_url}/cart/${id}`, increase)
                .then((res) => {
                    this.setState({
                        bool: !this.state.bool
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    renderTBody = () => {
        const {cartData} = this.props
        return cartData.map((val, i) => {
            return(
                <tr>
                    <td>{val.id}</td>
                    <td><img src={val.image} alt={val.name} style={{width: "80px"}}/></td>
                    <td>{val.name}</td>
                    <td>
                        <Button disabled={val.qty === 1} onClick={() => this.decreaseQty(i, val.id)}>-</Button>
                        <span className="mx-2">{val.qty}</span>
                        <Button onClick={() => this.increaseQty(i, val.id)}>+</Button>
                        {/* <Button disabled={val.qty === val.stock} onClick={() => this.increaseQty(i, val.id)}>+</Button> */}
                    </td>
                    <td>Rp. {val.price.toLocaleString()}</td>
                    <td><Button onClick={() => this.deleteCart(val.id)}>Delete</Button></td>
                </tr>
            )
        })
    }

    renderTotal = () => {
        const {cartData} = this.props
        let total = 0

        cartData.forEach((val) => {
            return total += (val.price * val.qty)
        })

        return total
    }

    deleteCart = (productID) => {
        Axios.delete(`${api_url}/cart/${productID}`)
            .then((res) => {
                swal("Delete berhasil", "Barang berhasil dihapus dari cart anda", "success")
                this.setState({
                    bool: !this.state.bool
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    checkout = () => {
        const {cartData, userID} = this.props

        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()

        const transactionData = {
            date: `${day} - ${month} - ${year}`,
            items: cartData,
            status: "Belum dibayar",
            total: this.renderTotal(),
            userID
        }

        console.log(transactionData)

        swal({
            title: "Anda yakin?",
            text: "Apakah anda yakin untuk melakukan checkout",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                Axios.post(`${api_url}/transaction-history`, transactionData)
                    .then((res) => {
                        transactionData.items.forEach((val) => {
                            Axios.delete(`${api_url}/cart/${val.id}`)
                                .then((res) => {
                                    swal("Checkout Berhasil", {icon: "success",});
                                    this.setState({
                                        bool: !this.state.bool
                                    })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
          });
    }

    render(){
        const {userID} = this.props
        if(userID === 0){
            return <div>Loading</div>
        }else{
            return(
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Gambar</th>
                            <th>Nama Produk</th>
                            <th>Qty</th>
                            <th>Harga Satuan</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTBody()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Total:</th>
                            <th>Rp. {this.renderTotal().toLocaleString()}</th>
                            <th><Button onClick={this.checkout}>Checkout</Button></th>
                        </tr>
                    </tfoot>
                </Table>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cartData: state.cart.cartData,
        userID: state.user.userID
    }
}

export default connect(mapStateToProps, {getCartData})(CartPage)
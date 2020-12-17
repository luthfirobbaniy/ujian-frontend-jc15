import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {HomePage, LoginPage, ProductDetailPage, CartPage, HistoryTransactionPage} from './pages'
import {NavBar} from './components'
import { connect } from 'react-redux';
import { keepLogin } from './redux/action';

class App extends Component{
  state = {}

  componentDidMount(){
    const id = localStorage.getItem("id")
    // const cart = localStorage.getItem("cart")
    if(id){
      this.props.keepLogin(id)
      // this.props.keepCartData(cart)
    }
  }

  render(){
    return(
      <div>
        <NavBar/>
        <Route path="/" exact component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/product-detail" component={ProductDetailPage}/>
        <Route path="/cart" component={CartPage}/>
        <Route path="/history" component={HistoryTransactionPage}/>
      </div>
    )
  }
}

export default connect(null, {keepLogin})(App);
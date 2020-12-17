import Axios from 'axios'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {Button, Input} from 'reactstrap'
import { api_url } from '../helpers/api_url'
import { login } from '../redux/action'
import swal from 'sweetalert'

class LoginPage extends Component{
    state = {
        inputBox: {
            email: "",
            password: ""
        }
    }
    
    loginInputBox = (e) => {
        this.setState({
            inputBox:{
                ...this.state.inputBox,
                [e.target.id]: e.target.value
            }
        })
    }
    
    clickLogin = () => {
        const {email, password} = this.state.inputBox
        const {login} = this.props

        let passNum = password.match(/[0-9]/g)
        let passLength = password.split("").length

        if(email, password){
            if(passNum !== null && passLength >= 6){
                login(email, password)
            }else{
                swal("Gagal login", "Harap masukkan password dengan kombinasi setidaknya 6 karakter dan 1 angka", "error")
            }
        }else{
            console.log("engga")
        }
    }

    render(){
        const {userID} = this.props
        if(userID !== 0){
            return <Redirect to="/"/>
        }else{
            return(
                <div>
                    <div><h1 style={{display: "flex", justifyContent: "center", margin:"0 0 10px 0"}}>LOGIN</h1></div>
                    <div style={{display: "flex", justifyContent: "center", margin:"0 0 10px 0"}}>
                        <Input type="email" id="email" onChange={this.loginInputBox} style={{width: "300px"}} placeholder="Masukkan Email"/>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", margin:"0 0 10px 0"}}>
                        <Input type="password" id="password" onChange={this.loginInputBox} style={{width: "300px"}} placeholder="Masukkan Password"/>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button color="dark" onClick={this.clickLogin}>Login</Button>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.user.userID
    }
}

export default connect(mapStateToProps, {login})(LoginPage)
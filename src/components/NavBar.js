import React, {Component} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button, 
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../redux/action/userAction';

class NavBar extends Component{
    state = {
        isOpen: false,
        modal: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    clickLogout = () => {
        const {logout} = this.props
        logout()
    }

    navBarYgBerubah = () => {
        const {userID} = this.props
        if(userID === 0){
            return (
                <Nav className="ml-auto" navbar>
                    <Link to="/login">
                        <NavItem>
                            <NavLink className="text-white">Login</NavLink>
                        </NavItem>
                    </Link>
                </Nav>
            )
        }else{
            return (
                <Nav className="ml-auto" navbar>
                    <Link to="/cart">
                        <NavItem onClick={this.cartToggle}>
                            <NavLink className="text-white">Cart</NavLink>
                        </NavItem>
                    </Link>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle caret className="text-white">
                            {this.props.email}
                        </DropdownToggle>  
                        <DropdownMenu right>
                            <Link to="/history">
                                <DropdownItem>
                                    Transaction History
                                </DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <Link onClick={this.clickLogout}>
                                <DropdownItem>
                                    Logout
                                </DropdownItem>
                            </Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )
        }
    }

    render(){
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <Link to="/">
                        <NavbarBrand className="text-white">TokoUjian</NavbarBrand>
                    </Link>
                    <NavbarToggler onClick={this.modalToggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                        </Nav>
                        {this.navBarYgBerubah()}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        userID: state.user.userID,
        email: state.user.email
    }
}

export default connect(mapStateToProps, {logout})(NavBar)
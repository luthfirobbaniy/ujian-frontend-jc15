import { connect } from "react-redux"
import { Table } from "reactstrap"
import React, {Component} from "react"
import Axios from "axios"
import { api_url } from "../helpers/api_url"
import { getHistoryData } from "../redux/action/historyAction"
import { HistoryModal } from "../components"
import { Button } from "reactstrap"

class HistoryTransactionPage extends Component{
    state = {
        bool: true,
        selectedData: 0,
        modalOpen: null
    }

    componentDidMount(){
        const {getHistoryData, userID} = this.props
        getHistoryData(userID)
    }

    componentDidUpdate(prevProps, prevState){
        const {getHistoryData, userID} = this.props
        if(prevProps.userID !== this.props.userID || prevState.bool !== this.state.bool){
            getHistoryData(userID)
        }
    }
    
    pembatalan = (id) => {
        Axios.delete(`${api_url}/transaction-history/${id}`)
            .then((res) => {
                this.setState({
                    bool: !this.state.bool
                })
                console.log("Deleted")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderTBody = () => {
        const {historyData} = this.props
        return historyData.map((val, i) => {
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.date}</td>
                    <td>Rp. {val.total.toLocaleString()}</td>
                    <td>{val.status}</td>
                    <td><Button onClick={() => this.toggle(i)}>Show Item</Button></td>
                    <td><Button onClick={() => this.pembatalan(val.id)} disabled={val.status !== "Belum dibayar"}>Batalkan</Button></td>
                </tr>
            )
        })
    }

    toggle = (i) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            selectedData: i
        })
    }

    render(){
        const {modalOpen, data, selectedData} = this.state
        const {historyData} = this.props
        return(
            <div>
                <Table>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Date</td>
                            <td>Total tagihan</td> 
                            <td>Status</td> 
                            <td colSpan="2">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTBody()}
                    </tbody>
                </Table>
                <HistoryModal modalOpen={modalOpen} toggle={this.toggle} data={historyData[selectedData]}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        historyData: state.history.historyData,
        userID: state.user.userID
    }
}

export default connect(mapStateToProps, {getHistoryData})(HistoryTransactionPage)
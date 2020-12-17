import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class HistoryModal extends Component {

    renderItem = () => {
        const {data} = this.props

        if(data){
            return data.items.map((val, index) => {
                return (
                    <tr>
                        <td>{val.id}</td>
                        <td><img src={val.image} alt={val.name} style={{width: "80px"}}/></td>
                        <td>{val.name}</td>
                        <td>Rp. {val.price.toLocaleString()}</td>
                        <td>{val.qty}</td>
                    </tr>
                )
            })
        }
    }

    render(){
        const {modalOpen, toggle} = this.props;
        return (
            <div>
                <Modal isOpen={modalOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Harga Satuan</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderItem()}
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default HistoryModal;
import React, {Component} from "react";
import {Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalHeader, ModalBody, Input,FormGroup, Col, Row, Label, FormText} from 'reactstrap';

class MuseumLoad extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        })
    }

    render(){
        let museums = this.props.state.museums;
        console.log(museums);
        let optionItems = museums.map ((museum) =>
            <option key ={museum.id} value={museum.id}>{museum.museum}</option>
        );

        return(
            <div>
                <Input type="select" name="select" id="museum" value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <option value="0">Please select museum</option>
                    {optionItems}
                </Input>
            </div>
        )
    }
}

export default MuseumLoad;
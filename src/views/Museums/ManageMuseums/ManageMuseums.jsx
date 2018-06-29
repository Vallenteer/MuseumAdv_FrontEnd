import React, {Component} from "react";
import {Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalHeader, ModalBody, Input,FormGroup, Col, Row, Label, FormText} from 'reactstrap';
import {connect} from "react-redux";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import { BarLoader } from 'react-spinners';
import moment, { now } from 'moment';

import { fetchMuseums } from '../../../actions/museum-actions.jsx';

class ManageMuseums extends Component {
    constructor(props) {
        super(props);
        this.options = {
          sortIndicator: true,
          hideSizePerPage: true,
          paginationSize: 3,
          hidePageListOnlyOnePage: true,
          clearSearch: true,
          alwaysShowAllBtns: true,
          withFirstAndLast: true,
          exportCSVText: 'Export to CSV'
        }
        this.state = {
            modalAdd: false,
            isAdding: false,
          }
          this.toggleAddMuseum = this.toggleAddMuseum.bind(this);
    }
    toggleAddMuseum() {
        this.setState({
          modalAddMuseum: !this.state.modalAddMuseum
        });
    }

    addMuseum(){
        return(
            <div className="container">  
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Museum Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="text" id="museumName" name="text-input" placeholder="Museum Name" disabled={this.state.isAdding}/>
                        <FormText color="muted">Please enter museum name</FormText>
                    </Col>
                </FormGroup>
                {this.state.isAdding ? <center><BarLoader color={'#123abc'} 
                  loading={this.props.isAdding} 
                /> <br /> Saving.... Please wait...</center> : this.showButton()}
            </div>
        )
      }

    showButton() {
        return(
            <div>
            <Button onClick={() => this.handleSubmit()} size="sm" color="primary" disabled={this.state.isAdding}><i className="fa fa-dot-circle-o"></i> Submit</Button>
            <Button type="reset" size="sm" color="danger" disabled={this.state.isAdding}><i className="fa fa-ban"></i> Reset</Button>  
            </div>
        );
    }

    handleSubmit () {
        var museumName = document.querySelector('#museumName').value;
        var loginCreds = JSON.parse(window.atob(sessionStorage.MSMADVlt));
        var auth = window.btoa(loginCreds.email + ":" + loginCreds.cookies.Value);
    
        this.setState({isAdding: true});
        var self = this;

        axios({
            method:'post',
            headers: {
                "Authorization": auth},
            url: 'http://museumadv.azurewebsites.net/museum/add',
            data: {
                museum_name: museumName
            }
        })
        .then(function(response){
          if(response.data.message == true) {
            self.setState({isAdding: false});
            self.toggleAddMuseum();
            
            self.props.fetchMuseums();
            toast.success('Museum successfully added!')
          }
            else if (response.data.message == "Authorization denied."){  
                self.setState({isAdding: false});       
                toast.error("Invalid Request. Please login to the system!");
            } else {
                self.setState({isAdding: false});
                toast.error("Unknown error. Please contact Support Team!");
            }
          })
          .catch(error => console.log(error));
      }

    componentWillMount(){
        this.props.fetchMuseums();
    }

    showDataTable() {
        return (
            <BootstrapTable data={this.props.MuseumsData} version="4" striped hover pagination search edit options={this.options} exportCSV={true} csvFileName={this.fileNameFormat}>
            <TableHeaderColumn dataField="id" isKey width="15%" dataSort csvHeader="ID Museum">ID Museum</TableHeaderColumn>
            <TableHeaderColumn dataField="museum" width="50%" dataSort csvHeader="Museum">Museum</TableHeaderColumn>  
            </BootstrapTable>);
    }

    fileNameFormat() {
        var baseName = "Museums List - ";
        var baseDate = new Date();
        var date = moment(baseDate).format("DD-MMM-YYYY HH:mm");
        var strDate = date.toString();
        return baseName+strDate+".csv";
    }
  
    render(){
        const containerStyle = {
            zIndex: 1999
          };
        return(
            <div className="animated">
                <ToastContainer position="bottom-right" autoClose={5000} style={containerStyle}/>
        
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-menu"></i><strong> Museums List</strong>
              </CardHeader>
                <CardBody>
                  <Row className="pull-right">
                      <Button onClick={this.toggleAddMuseum} size="sm" color="success"  disabled={this.props.inProgress}><i className="fa fa-plus"></i> Add Museum</Button>

                      <Modal isOpen={this.state.modalAddMuseum} toggle={this.toggleAddMuseum} className={this.props.className}>
                          <ModalHeader toggle={this.toggleAddMuseum}>Add Museum</ModalHeader>
                          <ModalBody>
                                  {this.addMuseum()}
                          </ModalBody>
                      </Modal>
                  </Row>
                  <br></br>
                  <hr></hr>
                  {this.props.inProgress ? <center><BarLoader color={'#123abc'} 
                    loading={this.props.inProgress} 
                  /> <br /> Loading.... Please wait...</center> : this.showDataTable()}
                </CardBody>
              </Card>
          </Col>
        </Row>
      </div>
        )
    }
}

function mapStateToProps(state){
    return {
        MuseumsData: state.museumStore.MuseumsData,
        inProgress: state.museumStore.inProgress
    }
  }
  
 export default connect(mapStateToProps, {fetchMuseums})(ManageMuseums);
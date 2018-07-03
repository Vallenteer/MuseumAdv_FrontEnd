import React, {Component} from "react";
import {Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalHeader, ModalBody, Input,FormGroup, Col, Row, Label, FormText} from 'reactstrap';
import {connect} from "react-redux";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import { BarLoader } from 'react-spinners';
import moment, { now } from 'moment';

import { fetchQuizzes } from '../../../actions/quiz-actions.jsx';
import MuseumLoad from './MuseumLoad.jsx';

class ManageQuizzes extends Component {
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
            museums: []
          }
          this.toggleAddQuiz = this.toggleAddQuiz.bind(this);
    }
    toggleAddQuiz() {
        this.setState({
          modalAddQuiz: !this.state.modalAddQuiz
        });
    }

    addQuiz(){
        return(
            <div className="container">
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Museum</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <MuseumLoad state= {this.state}/> 
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Soal</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="text" id="soal" name="text-input" placeholder="Soal" disabled={this.state.isAdding}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Jawaban</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="text" id="jawaban" name="text-input" placeholder="Jawaban" disabled={this.state.isAdding}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Petunjuk</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="text" id="petunjuk" name="text-input" placeholder="Petunjuk" disabled={this.state.isAdding}/>
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
        var selectMuseum = document.querySelector('#museum').value
        var addSoal = document.querySelector('#soal').value;
        var addJawaban = document.querySelector('#jawaban').value;
        var addPetunjuk = document.querySelector('#petunjuk').value;
        var loginCreds = JSON.parse(window.atob(sessionStorage.MSMADVlt));
        var auth = window.btoa(loginCreds.email + ":" + loginCreds.cookies.Value);
    
        this.setState({isAdding: true});
        var self = this;

        axios({
            method:'post',
            headers: {
                "Authorization": auth},
            url: 'http://museumadv.azurewebsites.net/pertanyaan/add',
            data: {
                museum_id: selectMuseum,
                soal: addSoal,
                jawaban: addJawaban,
                petunjuk: addPetunjuk
            }
        })
        .then(function(response){
          if(response.data.message == true) {
            self.setState({isAdding: false});
            self.toggleAddQuiz();
            
            self.props.fetchQuizzes();
            toast.success('Quiz successfully added!')
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
        this.props.fetchQuizzes();
        this.getMuseumList();
    }

    // componentDidMount(){
    //     let initialMuseums = [];
    //     axios.post('http://museumadv.azurewebsites.net/museum/list')
    //     .then(function (response){
    //         if(response.data != "" || response.data != null){
    //             initialMuseums = response.data.map((museum) => {
    //                 return museum
    //             });
    //         }
    //         this.setState({
    //             museums: initialMuseums,
    //         })
    //     })
    // }

    getMuseumList(){
         var defaultMuseumsList = [];
        // var museums;
        var self = this;
        axios.post('http://museumadv.azurewebsites.net/museum/list')
        .then(function(response){
            // console.log(response.data)
            defaultMuseumsList = response.data.map((museum) =>{
                return museum
            });
            console.log(defaultMuseumsList);
            self.setState({
                museums: defaultMuseumsList,
            })
            // self.setState({
            //     defaultMuseumsList: response.data
            // })
            // console.log(defaultMuseumsList)
        })
        // fetch('https://swapi.co/api/planets/')
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => {
        //     initialPlanets = data.results.map((planet) => {
        //         return planet
        //     });
        //     console.log(initialPlanets);
        //     this.setState({
        //         planets: initialPlanets,
        //     });
        // });
        
    }

    showDataTable() {
        return (
            <BootstrapTable data={this.props.QuizzesData} version="4" striped hover pagination search edit options={this.options} exportCSV={true} csvFileName={this.fileNameFormat}>
            <TableHeaderColumn dataField="id" isKey width="15%" dataSort csvHeader="ID Museum">ID Museum</TableHeaderColumn>
            <TableHeaderColumn dataField="museum" width="20%" dataSort csvHeader="Museum">Museum</TableHeaderColumn>
            <TableHeaderColumn dataField="soal" width="30%" dataSort csvHeader="Museum">Soal</TableHeaderColumn>  
            <TableHeaderColumn dataField="jawaban" width="15%" dataSort csvHeader="Museum">Jawaban</TableHeaderColumn>
            <TableHeaderColumn dataField="petunjuk" width="20%" dataSort csvHeader="Museum">Petunjuk</TableHeaderColumn>      
            </BootstrapTable>);
    }

    fileNameFormat() {
        var baseName = "Quizzes List - ";
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
                <i className="icon-menu"></i><strong> Quizzes List</strong>
              </CardHeader>
                <CardBody>
                  <Row className="pull-right">
                      <Button onClick={this.toggleAddQuiz} size="sm" color="success"  disabled={this.props.inProgress}><i className="fa fa-plus"></i> Add Quiz</Button>

                      <Modal isOpen={this.state.modalAddQuiz} toggle={this.toggleAddQuiz} className={this.props.className}>
                          <ModalHeader toggle={this.toggleAddQuiz}>Add Quiz</ModalHeader>
                          <ModalBody>
                                  {this.addQuiz()}
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
        QuizzesData: state.quizStore.QuizzesData,
        inProgress: state.quizStore.inProgress
    }
  }
  
 export default connect(mapStateToProps, { fetchQuizzes })( ManageQuizzes );
import React, { Component } from 'react';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { AvField, AvForm } from "availity-reactstrap-validation";
import { FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Alert } from "reactstrap";
import { DataTable } from './DataTabel';
// This importing Jquery in react.
const $ =require('jquery');

export default class FormUI extends Component {
    state = {
        deleteModel: false,
        updateModel: false,
        id: ''
    }
    // This Method Handel Get Actions for Executing
    componentDidMount = () => {
        this.props.getMethod && this.props.getMethod(this.props.token)
    }
    // This functions checking any Edit and Delete button onclick called or not.
    componentDidUpdate=()=>{
        var _ = this;
        $('.dt-edit').each(function () {
            $(this).on('click', function(evt){ 
                var row = $(this).closest('tr');
                var editData = $('.display').dataTable().fnGetData(row);
                // console.log("Total Data Edit id ",editData[6]);
                _.setUpdateModal(editData[6])
            })
        })
        $('.dt-delete').each(function () {
            $(this).on('click', function(evt){
                var row = $(this).closest('tr');
                var deleteData = $('.display').dataTable().fnGetData(row);
                // console.log("Total Data Delete id ",deleteData[6]);
                _.setDeleteModal(deleteData[6]);
            })
        })
    }

    // This function seting id and value of state variable for opening edit modal
    setUpdateModal=(id)=>{
        this.setState({ updateModel: !this.state.updateModel, id})
    }

    // This function seting id and value of state variable for opening delete modal
    setDeleteModal=(id)=>{
        this.setState({ deleteModel: !this.state.deleteModel, id})
    }
    
    // This Method Handel Post Actions for Executing
    handelPostSubmit = (event, errors, values) => {
        if (errors.length === 0) { 
            this.props.saveMethod(this.props.token, values) 
            this.form && this.form.reset();
        }
    }
    // This Method Handel Put Actions for Executing
    handelPutSubmit = (event, errors, values) => {
        if (errors.length === 0) {
            this.setState({ updateModel: !this.state.updateModel })
            this.props.updateMethod(this.props.token, values)
        }
    }
    // This Method Handel Delete Actions for Executing
    handelDeleteSubmit = (event, errors, values) => {
        if (errors.length === 0) {
            this.setState({ deleteModel: !this.state.deleteModel })
            this.props.deleteMethod(this.props.token, values)
        }
    }

    render() {
        return <Container>
            <h1>{this.props.componentName && this.props.componentName}</h1>
            {this.props.alertColor && <Alert color={this.props.alertColor}>{this.props.alertMessage}</Alert>}
            {this.loadFormUI()} <br/>

            {this.loadFormTabel()}
            {(this.state.updateModel || this.state.deleteModel) && this.loadDelEditModal()}
        </Container>;
    }
    // This Method Load the Adding Food UI
    loadFormUI = () => {
        return <Row className="justify-content-md-left">
            <Col >
                <Card >
                    <Card.Body>
                        <AvForm onSubmit={this.handelPostSubmit}  ref={c => (this.form = c)}>
                            {this.props.fields && this.props.fields.map((field, key) => {
                                return <AvField
                                    key={key}
                                    type={field.type}
                                    name={field.apiKey}
                                    label={field.label && `Enter ${field.label}`}
                                    placeholder={field.placeholder && field.label}
                                    errorMessage={field.errorMessage && field.errorMessage}
                                    required={field.required && field.required}
                                />
                            })}
                            {this.props.fields && <FormGroup> <Button type="submit" variant="outline-success">Save Food Item</Button></FormGroup>}
                        </AvForm>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    }
    // This Method Loading Showing Foods
    loadFormTabel = () => {
        // This fetching columns dynamically
        let coloums= this.props.fields && this.props.fields.map((field, key) => {return {title: field.label} })
        coloums.unshift({title: "Sr No"});  // This pushing first postion column name as Sr No.
        coloums.push({title:''})    // This line pushing empty colunm name for edit button
        coloums.push({title:''})    // This line pushing empty colunm name for delete button
        coloums.push({title:'',visible: false}) // This line pushing api_id colunm name with hide that column
        // This condtion check whether data is there or not according to that DataTabel Loading
        return this.props.stateData && this.props.stateData.length > 0 ? 
                 <DataTable data={this.loadTabelRows(this.props.stateData)} coloums={coloums}></DataTable> 
                 : <DataTable data='' coloums={coloums}></DataTable>
    };
    // This method return the no of Rows in load tbeel form API result
    loadTabelRows = (data) => {
        const {primaryKey, fields }=this.props
        let rows = data.map((singleRow, key) => {
            // This showing Serail No for tabel
            let index=key+1
            // This geting acctual data form api responsed
            let filedData= fields && fields.map((field, key) => {return  singleRow[field.apiKey]})
            // This is initlized the basic array for the last all data push into
            let temp=[];
            // This line insert element first postion in array
            filedData.unshift(index);
            // This pushing Edit button for this row
            filedData.push("<button type='button'  class='btn btn-primary btn-xs dt-edit' style='margin-right:16px;'>Edit</button>")
            // This pushing Delete button for this row
            filedData.push("<button type='button' class='btn btn-danger btn-xs dt-delete' style='margin-right:16px;'>Delete</button>")
            // This pushing actual id came form api for this row
            filedData.push(singleRow[primaryKey]);
            // this created new array and push them all data
            temp.push(filedData);
            return temp;
        });
        return rows.flat();
    }
    // This Method Load the Edit and Update Modal for Item
    loadDelEditModal = () => {
        const { primaryKey, stateData, componentName }=this.props
        const { id, updateModel, deleteModel, }=this.state
        // This line filter data accordign what id have in state variable.
        let data = stateData.filter(data => data[primaryKey] === id);
        // This line Seting header text
        let headername = updateModel ? `Edit ${componentName}` : `Delete ${componentName}`;
        // this is seting value for opening modal
        let openVarible = updateModel ? updateModel : deleteModel;
        // This line seting button text according to state modal variable
        let buttonText = updateModel ? `Edit ${componentName}` : `Delete ${componentName}`;
        // This line seting value of cancle button functions
        let closeStateVariableName = updateModel ? { updateModel: !this.state.updateModel } : { deleteModel: !this.state.deleteModel };
        // This is seting of button color
        let variantColor = updateModel ? "outline-success" : "outline-danger";
        // after successfully click which method need to call this line seting that function
        let handelMethod = updateModel ? this.handelPutSubmit : this.handelDeleteSubmit
        
        return <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered isOpen={openVarible} >
            <AvForm onSubmit={handelMethod}>
                <ModalHeader>
                    <strong id="contained-modal-title-vcenter"> {headername} </strong>
                </ModalHeader>
                <ModalBody>
                <Container  className="justify-content-md-center">
                        <AvField type="hidden" name={primaryKey} value={data[0][primaryKey]} required />
                        {this.props.fields && this.props.fields.map((field, key) => {
                            let fkey = field.apiKey && field.apiKey;
                            return  <Row key={key} xs={5}><AvField
                                type={field.type}
                                name={field.apiKey}
                                value={fkey && data[0][fkey]}
                                label={field.label && `Enter ${field.label}`}
                                placeholder={field.placeholder && field.placeholder}
                                errorMessage={field.errorMessage && field.errorMessage}
                                required={field.required && field.required}
                            /> </Row>
                        })}
                        </Container>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" variant={variantColor}>{buttonText}</Button> &nbsp; &nbsp;
            <Button onClick={() => { this.setState(closeStateVariableName) }}>Close</Button>
                </ModalFooter>
            </AvForm>
        </Modal>
    }
}

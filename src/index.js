import React, { Component } from 'react';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { AvField, AvForm } from "availity-reactstrap-validation";
import { FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Alert } from "reactstrap";
import { DataTable } from './DataTabel';


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
            if(this.props.stateData && this.props.stateData.length > 0) {
                // This fetching columns dynamically
                let coloums= this.props.fields && this.props.fields.map((field, key) => {return {title: field.label} })
                coloums.unshift({title: "Sr No"});
                return  <DataTable data={this.loadTabelRows(this.props.stateData)} coloums={coloums}></DataTable>
            }
    };
    // This method return the no of Rows in load tbeel form API result
    loadTabelRows = (data) => {
        let primaryKey = this.props.primaryKey;
        let rows = data.map((singleRow, key) => {
            // return <tr key={key}>
            //     <td>{key+1}</td>
            //     {this.props.fields && this.props.fields.map((field, key) => {
            //         return <td key={key}>{singleRow[field.apiKey]}</td>
            //     })}
            //     <td><Button onClick={() => this.setState({ updateModel: !this.state.updateModel, id: singleRow[primaryKey] })} >Edit</Button></td>
            //     <td><Button onClick={() => this.setState({ deleteModel: !this.state.deleteModel, id: singleRow[primaryKey] })}>Delete</Button></td>
            // </tr>

            let index=key+1
            let filedData= this.props.fields && this.props.fields.map((field, key) => {return  singleRow[field.apiKey]})
            let temp=[];
            // This line insert element first postion in array
            filedData.unshift(index);
            // this created new array and push them all data
            temp.push(filedData);
            return temp;
            
        });
        return rows.flat();
    }
    // This Method Load the Edit and Update Modal for Item
    loadDelEditModal = () => {
        let primaryKey = this.props.primaryKey
        let data = this.props.stateData.filter(data => data[primaryKey] === this.state.id);
        let headername = this.state.updateModel ? `Edit ${this.props.componentName}` : `Delete ${this.props.componentName}`;
        let openVarible = this.state.updateModel ? this.state.updateModel : this.state.deleteModel;
        let buttonText = this.state.updateModel ? `Edit ${this.props.componentName}` : `Delete ${this.props.componentName}`;
        let closeStateVariableName = this.state.updateModel ? { updateModel: !this.state.updateModel } : { deleteModel: !this.state.deleteModel };
        let variantColor = this.state.updateModel ? "outline-success" : "outline-danger";
        let handelMethod = this.state.updateModel ? this.handelPutSubmit : this.handelDeleteSubmit
        return <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            isOpen={openVarible}
        >
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

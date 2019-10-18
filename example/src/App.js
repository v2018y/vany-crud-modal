import React, { Component } from 'react';
import FormUI from 'vany-crud-modal';
import { Container} from 'react-bootstrap';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      customerData:[],
      color:'',
      message:''
    }
  }
  render () {
    const filed=[
      {apiKey:'cName',label:"Customer Name",type:"text",required:'required',errorMessage:"Enter Customer Name",placeholder:"Ex: vishva"},
      {apiKey:'cSurname',label:"Customer Surname ",type:"text",required:'required',errorMessage:"Enter Customer Surname",placeholder:"Ex: jony"},
      {apiKey:'cEmail',label:"Customer Email",type:"text",required:'required',errorMessage:"Enter Customer Email",placeholder:"Ex: admin@admin.com"}
  ]
  return <Container>
  <FormUI 
  token="khdfjkdhfgjkdf@jksdfjkshkj#213123"
  getMethod={this.getCust}
  saveMethod={this.saveCust}
  updateMethod={this.updateCust}
  deleteMethod={this.deleteCust}
  fields={filed}
  componentName="Customer"
  stateData={this.state.customerData}
  primaryKey="cId"
  alertColor={this.state.color}
  alertMessage={this.state.message}
  /></Container> 
  }

  loadClearMsg=()=>{
    setTimeout(()=>{
      this.setState({ color:'', message:''})
    },500)
  }

  getCust=(token)=>{
    let data=[ {"cId":1,"cName":"shankar","cSurname":"Mksha","cEmail":"v@v.com"},
    {"cId":2,"cName":"mkar","cSurname":"Mksha","cEmail":"v@v.com"},
    {"cId":3,"cName":"snag","cSurname":"Mksha","cEmail":"v@v.com"}]
    this.setState({customerData : data})
  }
  saveCust=(token,values)=>{
    let newId=this.state.customerData[this.state.customerData.length-1].cId+1;
    var joined = this.state.customerData.concat({"cId":newId,...values});
    this.setState({ customerData: joined , color:'success', message:'Data inserted successfully'})
    this.loadClearMsg()
  }
  updateCust=(token,values)=>{
    console.log("Data", values);
  }
  deleteCust=(token,values)=>{
    var filterData= this.state.customerData.filter((x)=> x.cId !== values.cId )
    this.setState({customerData:filterData, color:'success', message:'Data Deleted successfully'});
    this.loadClearMsg()
  }
}

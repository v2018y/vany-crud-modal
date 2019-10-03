import React, { Component } from 'react'

import FormUI from 'vany-crud-component'

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      customerData:[]
    }
  }
 
  render () {
    const filed=[
      {apiKey:'cName',filedName:"Customer Name",type:"text",required:'required',errorMessage:"Enter Customer Name",placeholder:"Ex: vishva"},
      {apiKey:'cSurname',filedName:"cSurname ",type:"text",required:'required',errorMessage:"Enter Customer Surname",placeholder:"Ex: jony"},
      {apiKey:'cEmail',filedName:"Customer Email",type:"text",required:'required',errorMessage:"Enter Customer Email",placeholder:"Ex: admin@admin.com"}
  ]

  return <FormUI 
  token="khdfjkdhfgjkdf@jksdfjkshkj#213123"
  getMethod={this.getCust}
  saveMethod={this.saveCust}
  updateMethod={this.updateCust}
  deleteMethod={this.deleteCust}
  fileds={filed}
  componentName="Customer"
  stateData={this.state.customerData}
  />
  }

  getCust=(event,error,values)=>{

    console.log("Data", values);

  }
  saveCust=(event,error,values)=>{

    console.log("Data", values);

  }
  updateCust=(event,error,values)=>{

    console.log("Data", values);

  }
  deleteCust=(event,error,values)=>{

    console.log("Data", values);

  }

}

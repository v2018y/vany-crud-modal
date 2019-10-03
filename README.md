# vany-crud-modal

> This is crud Modal provide you to create simple Form UI with all crud opertions.

[![NPM](https://img.shields.io/npm/v/vany-crud-modal.svg)](https://www.npmjs.com/package/vany-crud-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save vany-crud-modal
```

## Usage

```jsx
import React, { Component } from 'react'

import FormUI from 'vany-crud-modal'

class Example extends Component {
    state = { DemoData:[]}
    // The fileds you passed will be created automatically.
    const formFields=[
        {
          apiKey:'api response key name',
          label:"label Showing on fields ",
          type:"Field type (ex: text,number,mail...)",
          required:'Field required or not, supply true or false',
          errorMessage:"Error Message to be displayed on empty fields",
          placeholder:"Placeholder message to display on fields"
        },
        ........
    ]
  render () {
    return <FormUI
      token="Pass the token if you have"
      getMethod={this.getDemo}
      saveMethod={this.saveDemo}
      updateMethod={this.updateDemo}
      deleteMethod={this.deleteDemo}
      fields={formFields}
      componentName="The name of your component to be displayed Header"
      stateData={this.state.DemoData}
      primaryKey="the primary key of your API response data"
      />
    
  }
  getDemo=(token,fieldData)=>{
    // Write your Business logic for calling database Record using fieldData
  }
  
  saveDemo=(token,fieldData)=>{
    // Write your Business logic for Saving database Record using fieldData
  }
  
  updateDemo=(token,fieldData)=>{
    // Write your Business logic for Updating database Record using fieldData
  }
  
  deleteDemo=(token,fieldData)=>{
    // Write your Business logic for Deleting database Record using fieldData
  }
}
```

## License

ISC © [v2018y](https://github.com/v2018y)

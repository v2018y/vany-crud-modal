import React, { Component } from 'react'
import './css/jquery.dataTables.min.css'

const $ =require('jquery');
$.DataTable= require('datatables.net');

export class DataTable extends Component{
    // This function first time data showing if have
    componentDidMount(){
        this.$el= $(this.el);
        this.loadDataTable();
    }
    // This fucntions after edit or delete call that each time calling
    componentDidUpdate(){
         this.loadDataTable();
    }

    loadDataTable = ()=>{
        if($.fn.DataTable.isDataTable( this.$el)){
            this.$el.DataTable().clear().destroy();
        }
        this.$el.DataTable({
            retrieve: true,
            data: this.props.data,
            columns: this.props.coloums,
            "deferRender": true,
            "lengthMenu": [ [3, 5, 10, 50, -1], [3, 5, 10, 50, "All"] ],
            "pageLength": 5
        })
    }
    render(){
        return <div> <table className="display" width="100%" ref={el=> this.el=el}>
        </table></div>
    }
}
import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import './styles.css';

class Edit_invoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment()
		};
		this.handleFields = this.handleFields.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInvoiceDateChange = this.handleInvoiceDateChange(this);
	}

	handleInvoiceDateChange(date) {
		this.setState({date: date});
		let id = `Invoice_date`
		this.props.actions.setFieldForInvoice(id, date);
	}

	handleFields(event) {
		this.props.actions.setFieldForInvoice(event.target.id, event.target.value);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.actions.editInvoice(this.props.params.invoiceId, this.props.props.invoices)
	}

	componentDidMount() {
		let { invoiceId } = this.props.params;
		this.props.actions.fetchInvoiceDetails(invoiceId);
	}

	render() {
		let invoiceDate = moment();
		if(this.props.props.invoices.Invoice_date) {
			invoiceDate = this.props.props.invoices.Invoice_date;
		}
		let invoice;
		let invoicer;
		let contact;
		let description;
		let address;
		let components = [];

		if(this.props.props.invoices.invoice) {
			invoice = this.props.props.invoices.invoice
			invoicer = this.props.props.invoices.invoicer
			contact = this.props.props.invoices.contact
			address = this.props.props.invoices.address
			description = this.props.props.invoices.description
			components =this.props.props.invoices.components
		}

		let letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '20px 25px 20px 100px'
		};

		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<div >
				<form onSubmit={ this.handleSubmit }>
					<button className="btn btn-info " >Save</button>
				</form>

				<div>
				<h2 className="center"> Edit Invoice </h2>
				<div style={letterStyle}>
					<div className="clearfix form-group">
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Invoice*</label>
							<input className="textboxSize" type="text" name="Invoice" id="invoice" value={ invoice }  onChange={this.handleFields} placeholder="ex. 12MOUSE1811" />
						</div>
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Invoicer*</label>
							<input className="textboxSize" type="text" name="Invoicer" id="invoicer" value={invoicer} onChange={this.handleFields} placeholder="ex. Jay systems" />
						</div>
					</div>
					<div className="clearfix form-group">
						<div className="col-lg-2 col-lg-offset-2">
							<label >Invoice Date*</label>
							<DatePicker className="textboxSize" dateFormat="YYYY/MM/DD" name="Invoice_date" id="invoice_date" onChange={this.handleInvoiceDateChange} selected= { this.state.date }/>
						</div>
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Contact*</label>
							<input className="textboxSize" type="text" name="Contact" id="contact" value={ contact } onChange={this.handleFields} placeholder="ex. +91 9909970574" />
						</div>
					</div>
					<div className="clearfix form-group">
						<div className="col-lg-2 col-lg-offset-2">
							<label >Description</label>
							<textarea className="textAreaSize" name="Description" id="description" value={ description } onChange={this.handleFields} placeholder="description"/>
						</div>
						<div className="col-lg-2 col-lg-offset-2">
							<label >Address</label>
							<textarea className="textAreaSize" name="Address" id="address" value={ address } onChange={this.handleFields} placeholder="address"/>
						</div>
					</div>
				</div>
			</div>

				<div>
				<div className="center">
					<h3> Component(s) </h3>
				</div>
				<div>
					<BootstrapTable data={components}
													pagination={true}
													striped={true}
													search={true}
													hover={true}>
						<TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField="Id">#</TableHeaderColumn>
						<TableHeaderColumn width="180" dataSort={true} dataField="Serial_no">Serial</TableHeaderColumn>
						<TableHeaderColumn width="150" dataSort={true} dataField="Name">Name</TableHeaderColumn>
						<TableHeaderColumn width="100" dataSort={true} dataField="Active">Active</TableHeaderColumn>
						<TableHeaderColumn width="120" dataField="Warranty_till">Warranty Till</TableHeaderColumn>
						<TableHeaderColumn hidden={true} dataField="invoice_id">Invoice</TableHeaderColumn>
						<TableHeaderColumn width="240" dataSort={true} dataField="Description">Description</TableHeaderColumn>
						<TableHeaderColumn width="150" dataSort={true} dataField="Machine">Machine</TableHeaderColumn>
					</BootstrapTable>
				</div>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'Edit_invoice',// a unique identifier for this form
})(Edit_invoice)

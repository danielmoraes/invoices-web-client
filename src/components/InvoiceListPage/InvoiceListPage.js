import { default as React, Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

// styles
import styles from './InvoiceListPage.css'

class InvoiceListTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: []
    }
    this.toolBar = this.toolBar.bind(this)
    this.onRowSelect = this.onRowSelect.bind(this)
    this.onSelectAll = this.onSelectAll.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
    this.onCheckRow = this.onCheckRow.bind(this)
    this.onUncheckRow = this.onUncheckRow.bind(this)
    this.onDeleteRows = this.onDeleteRows.bind(this)
  }

  toolBar (props) {
    const { onAdd } = this.props
    return (
      <div className={styles.toolBar}>
        <div className={styles.leftButtonGroup}>
          <Button bsStyle='danger' bsSize='small'
            onClick={props.event.dropRow}>
            Delete
          </Button>
        </div>
        <div className={styles.rightButtonGroup}>
          <Button bsStyle='primary' bsSize='small' onClick={onAdd}>
            New Invoice
          </Button>
        </div>
      </div>
    )
  }

  onCheckRow (id) {
    this.setState((prevState) => ({
      selected: [...prevState.selected, id]
    }))
  }

  onUncheckRow (id) {
    this.setState((prevState) => ({
      selected: prevState.selected.filter(it => it !== id)
    }))
  }

  onRowSelect ({ id }, isChecked) {
    if (isChecked) {
      this.onCheckRow(id)
    } else {
      this.onUncheckRow(id)
    }
  }

  onSelectAll (isChecked, rows, event) {
    rows.forEach((row) => this.onRowSelect(row, isChecked))
  }

  onRowClick ({ id }, ...rest) {
    const { onSelect } = this.props
    onSelect(id)
  }

  onDeleteRows (ids) {
    const { onDelete } = this.props
    const rows = ids.map(id => ({ id: id }))
    this.onSelectAll(false, rows)
    onDelete(ids)
  }

  amountFormatter (cell, row) {
    return `US$ ${cell}`
  }

  remote (obj) {
    obj.cellEdit = true
    obj.insertRow = true
    obj.dropRow = true
    return obj
  }

  render () {
    console.log(this.state.selected)

    const { invoices } = this.props

    const selectRowOptions = {
      mode: 'checkbox',
      bgColor: '#F1F1F1',
      onSelect: this.onRowSelect,
      onSelectAll: this.onSelectAll,
      selected: this.state.selected
    }

    const tableOptions = {
      sortName: 'id',
      sortOrder: 'desc',
      onRowClick: this.onRowClick,
      onDeleteRow: this.onDeleteRows,
      toolBar: this.toolBar
    }

    return (
      <BootstrapTable
        data={invoices}
        remote
        selectRow={selectRowOptions}
        bordered={false}
        deleteRow
        hover
        trClassName={styles.row}
        options={tableOptions}>

        <TableHeaderColumn
          dataField='id'
          isKey
          hidden>
          ID
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField='description'>
          Description
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField='date'
          width='120'>
          Date
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField='beneficiary'
          width='200'>
          Beneficiary
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField='amount'
          headerAlign='right'
          dataAlign='right'
          width='80'
          dataFormat={this.amountFormatter}>
          Amount
        </TableHeaderColumn>

      </BootstrapTable>
    )
  }
}

// fake invoice store

const invoicesStore = []

function addInvoices (quantity) {
  const startId = invoicesStore.length
  for (let i = 0; i < quantity; i++) {
    const id = startId + i
    invoicesStore.push({
      id: id,
      description: 'Description of the Invoice #' + id,
      date: '05/07/2017',
      beneficiary: 'Company Name',
      amount: 10 + i
    })
  }
}

addInvoices(10)

class InvoiceListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoices: invoicesStore
    }
    this.onAdd = this.onAdd.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onAdd () {
    console.log('adding new invoice')
    const { history, match } = this.props
    history.push(`${match.url}/new-invoice`)
  }

  onSelect (id) {
    console.log('selecting invoice', id)
    const { history, match } = this.props
    history.push(`${match.url}/invoices/${id}`)
  }

  onDelete (ids) {
    console.log('deleting invoices', ids)
    this.setState((prevState) => ({
      invoices: prevState.invoices.filter(it => ids.indexOf(it.id) === -1)
    }))
  }

  render () {
    const { invoices } = this.state
    return (
      <Panel header='Invoices'>
        <InvoiceListTable
          invoices={invoices}
          onAdd={this.onAdd}
          onSelect={this.onSelect}
          onDelete={this.onDelete} />
      </Panel>
    )
  }
}

export default withRouter(InvoiceListPage)

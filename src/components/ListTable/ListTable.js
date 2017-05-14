import { default as React, Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'

import styles from './ListTable.css'

class ListTable extends Component {
  constructor (props) {
    super(props)
    this.toolBar = this.toolBar.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
  }

  toolBar (props) {
    const { options } = this.props
    return (
      <div className={styles.toolBar}>
        <div className={styles.leftButtonGroup}>
          <Button bsStyle='danger' bsSize='small'
            onClick={props.event.dropRow}>
            { (options && options.deleteLabel) || 'Delete' }
          </Button>
        </div>
      </div>
    )
  }

  onRowClick ({ id }) {
    const { onSelect } = this.props
    onSelect(id)
  }

  remote (obj) {
    obj.insertRow = true
    obj.dropRow = true
    obj.sort = true
    return obj
  }

  render () {
    const { data, columns, options, onDelete } = this.props

    const selectRowOptions = { mode: 'checkbox', bgColor: '#F1F1F1' }

    const tableOptions = {
      onRowClick: this.onRowClick,
      onDeleteRow: onDelete,
      toolBar: this.toolBar,
      ...options
    }

    return (
      <BootstrapTable
        deleteRow hover bordered={false}
        remote={this.remote}
        data={data}
        options={tableOptions}
        selectRow={selectRowOptions}
        trClassName={styles.row}>

        { columns.map(({ dataLabel, ...rest }) => (
          <TableHeaderColumn {...rest}>
            {dataLabel}
          </TableHeaderColumn>
        )) }

      </BootstrapTable>
    )
  }
}

export default ListTable

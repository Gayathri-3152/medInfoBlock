
import React, { Component } from "react";


class ViewMyRecords extends Component {
  constructor(props) {
    super(props);    
     
    this.state = {
    records : this.props.records
    };
    
    console.log(this.props.records)
  }


  render() {
    return (
      <div className="mt-4">

        <table>
          <tr><th>Title</th><th>Description</th><th>Created By</th></tr>
  {this.state.records.map((item =>
  <tr><td key="1">{item.title}</td>
  <td key="2">{item.description}</td>
  <td key="3">{item.createdBy}</td></tr>
  ))}
</table>
      </div>
    );
  }
}

export default ViewMyRecords;

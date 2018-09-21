import React from "react";

import { BASE_URL } from "../api";

//
import { IoMdRefresh } from "react-icons/io";

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      URLValue: "",
      resultsLoaded: false,
      results: {},
      entity: {}
    };

    this.onChangeURLInput = this.onChangeURLInput.bind(this);
    this.makeGetRequest = this.makeGetRequest.bind(this);
  }

  /**
   * Life Cycle
   */

  componentWillMount() {

  }

  makeGetRequest() {
    const {URLValue} = this.state;
    console.log(URLValue, "Here is a Url value")
    fetch(URLValue, {
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        if (response.ok) {
          response.json().then(res => {
            console.log(res, "Response Here");
            const { contents, status, passed } = res;
            const { employee } = contents;
            this.setState({
              entity: employee,
              resultsLoaded: true
            });
          });
        } else {
          throw new Error(response);
        }
      })
      .catch(err => {
        console.log(err, "ERROR IS HERE");
      });
  }

  onChangeURLInput(event) {
    const URLValue = event.target.value;
    this.setState({
      URLValue
    });
  }

  render() {
    const { URLValue, resultsLoaded, entity } = this.state;
    let resultsHtml;
    if (!resultsLoaded) {
      resultsHtml = 
      <IoMdRefresh />;
    } else {
      resultsHtml = <div className="entity-ctn">
      <h3>Results</h3>
      Id: {entity && entity.employeeId} &nbsp;
      First name:{entity && entity.firstName} &nbsp;
      Last name:{entity && entity.lastName}&nbsp;
      
      </div>;
    }

    return (
      <div className="container">
        <div className="url-section">
          <label>Enter URL:</label>
          <input
            type="text"
            onChange={this.onChangeURLInput}
            placeholder={"Enter URL"}
            value={URLValue}
          />
        </div>

        <div className="method-section">
          <h2>Methods</h2>
          <div className="methods">
            <div className="method" onClick={this.makeGetRequest}>
              GET
            </div>
            <div className="method">POST</div>
          </div>
        </div>

        {/* <div className="params-section">
          <div className="method">params</div>
          <div className="method">body</div>
        </div> */}
        <div className="results-section">

        {resultsHtml}
        </div>
      </div>
    );
  }
}

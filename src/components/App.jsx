import React from "react";

import {BASE_URL} from "../api";

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      URLValue: "",
      resultsLoaded: false,
      results: {}
    };

    this.onChangeURLInput = this.onChangeURLInput.bind(this);
  }

  /**
   * Life Cycle
   */

  componentWillMount() {
    console.log("here")
    fetch(BASE_URL,
       {
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
    
    )
      .then(response => {
        if(response.ok){
            response.json().then(r=>{
                console.log(r, "Response Here");
                this.setState({
                    results: r
                })
            })
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
    const { URLValue } = this.state;
    
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
            <div className="method">GET</div>
            <div className="method">POST</div>
          </div>
        </div>

        {/* <div className="params-section">
          <div className="method">params</div>
          <div className="method">body</div>
        </div> */}
      </div>
    );
  }
}

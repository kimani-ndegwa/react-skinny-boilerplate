import React from "react";
import { connect } from "react-redux";

// table/room components
import { Table } from "./Table";

// Components
import { Navigation } from "./Navigation";

export class LobbyComponent extends React.PureComponent {
  render() {
      console.log(this.props, "here we are")
    return (
      <div className="lobby-container">
        <Navigation 
        />
        <div className="table-section">
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth
  };
};

export const Lobby = connect(mapStateToProps)(LobbyComponent);

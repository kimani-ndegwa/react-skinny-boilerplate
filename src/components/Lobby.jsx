import React from "react";
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom';

// table/room components
import { Table } from "./Table";

// Components
import { Navigation } from "./Navigation";

export class LobbyComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tables: [0, 0, 0, 0, 0, 0, 0, 0]
    };
  }
  render() {
    console.log(this.props, "here we are");
    const { tables } = this.state;
    let tablesHtml = tables.map((table, index) => {
      return <NavLink key={index} to={`/lobby/${index}`}><Table roomId={index} /></NavLink>;
    });
    return (
      <div className="lobby-container">
        <Navigation />
        <div className="table-section">{tablesHtml}</div>
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

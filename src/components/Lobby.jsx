import React from 'react';

// table/room components
import {Table} from './Table';

export class Lobby extends React.PureComponent{

    render(){
        return(
            <div className="lobby-container">
            <div className="table-section">
            
            
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
            </div>
            </div>
        );

    }
}
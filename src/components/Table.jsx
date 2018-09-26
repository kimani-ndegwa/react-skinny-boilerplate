import React from 'react';
import TableSVG from "../../assets/table.svg";

import {assignClassName} from '../utils';

export class Table extends React.PureComponent{
    constructor(){
        super();
        this.state = {
            participants: [
                {
                    name: "Kimani",
                    imageUrl: "https://lh4.googleusercontent.com/-pHJxhwGxbOU/AAAAAAAAAAI/AAAAAAAABr0/xyfLSzo3ufk/s96-c/photo.jpg"
                },
                {
                    name: "Kimani",
                    imageUrl: "https://lh4.googleusercontent.com/-pHJxhwGxbOU/AAAAAAAAAAI/AAAAAAAABr0/xyfLSzo3ufk/s96-c/photo.jpg"
                },
                {
                    name: "Kimani",
                    imageUrl: "https://lh4.googleusercontent.com/-pHJxhwGxbOU/AAAAAAAAAAI/AAAAAAAABr0/xyfLSzo3ufk/s96-c/photo.jpg"
                },
                {
                    name: "Kimani",
                    imageUrl: "https://lh4.googleusercontent.com/-pHJxhwGxbOU/AAAAAAAAAAI/AAAAAAAABr0/xyfLSzo3ufk/s96-c/photo.jpg"
                }
            ]
        }
    }
    render(){
        const {participants} = this.state;
        let participantsHtml = "";
        if(participants.length){
            participantsHtml = participants.map((p, index)=>{
                return <span className={assignClassName("participant", index)} key={index}>
                
                <img src={p.imageUrl} alt={`Participant: ${p.name}`} />
                </span>
            })
        }

        return(
            <div className="table-container">
            <div className="participants-ui">
                {participantsHtml}
            </div>
            <TableSVG/>
            </div>
        )
    }
}
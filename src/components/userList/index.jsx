import React from "react";
import "./index.css";

export function UserList(props) {
  return (
    <div className='userList'>
      <div className='userData'>
        <img src={props.userImg} alt={props.name} />
        <div className='userProfile'>
          <strong>Nome do Usuário: {props.name}</strong>
          <strong>
            ID: {props.id} - Username: {props.username}
          </strong>
        </div>
      </div>
      <div>
        <button onClick={props.onClick}>Pagar</button>
      </div>
    </div>
  );
}

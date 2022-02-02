import React, { useState, useEffect } from "react";
import { UserList } from "../../components/userList";

export function Home(props) {
  const [users, setUsers] = useState([]);
  async function Hook() {
    const apiUrl = "https://www.mocky.io/v2/5d531c4f2e0000620081ddce";

    const result = await fetch(apiUrl);
    const userData = await result.json();
    console.log(userData);
    setUsers(userData);
  }
  useEffect(Hook, []);

  return (
    <>
      {users.map((user) => {
        return (
          <UserList
            key={user.id}
            userImg={user.img}
            name={user.name}
            id={user.id}
            username={user.username}
          />
        );
      })}
    </>
  );
}

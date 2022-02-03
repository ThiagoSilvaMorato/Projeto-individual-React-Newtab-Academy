import React, { useState, useEffect } from "react";
import { UserList } from "../../components/userList";
import { ModalPayment } from "../../components/modalLayout";
import { cards } from "../../data/cards";

export function Home(props) {
  //Estados
  const [users, setUsers] = useState([]);
  const [isCardModalOpen, setIsCardsModalOpen] = useState(false);

  //Coletar dados dos usuários da API
  async function getUsers() {
    const apiUrl = "https://www.mocky.io/v2/5d531c4f2e0000620081ddce";

    const result = await fetch(apiUrl);
    const userData = await result.json();
    setUsers(userData);
  }

  //Hook de efeitos colaterais
  useEffect(getUsers, []);

  function handleButtonOnClick() {
    setIsCardsModalOpen(true);
  }

  return (
    <>
      {
        //Modal de pagamento
        isCardModalOpen && (
          <ModalPayment
            firstSpan='Pagamento para'
            secondSpan=' Nome do Usuário'
            closeModal={() => setIsCardsModalOpen(false)}>
            <input type='text' placeholder='R$ 0.00' />
            <select name='cardOptions'>
              {cards.map((card) => {
                console.log(card);
                return <option value='cards'>{card.card_number}</option>;
              })}
            </select>
            <button type='submit' className='modal__payButton'>
              Pagar
            </button>
          </ModalPayment>
        )
      }
      {
        //Lista de usuários
        users.map((user) => {
          return (
            <UserList
              onClick={handleButtonOnClick}
              key={user.id}
              userImg={user.img}
              name={user.name}
              id={user.id}
              username={user.username}
            />
          );
        })
      }
    </>
  );
}

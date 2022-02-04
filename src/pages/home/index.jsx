import React, { useState, useEffect } from "react";
import { UserList } from "../../components/userList";
import { ModalPayment } from "../../components/modalLayout";
import { cards } from "../../data/cards";
import { currencyMask } from "../../utils/currencyMask";

export function Home(props) {
  //Estados
  const [users, setUsers] = useState([]);
  const [isCardModalOpen, setIsCardsModalOpen] = useState(false);
  const [paymentForUser, setPaymentForUser] = useState(null);

  //Coletar dados dos usuários da API
  async function getUsers() {
    const apiUrl = "https://www.mocky.io/v2/5d531c4f2e0000620081ddce";

    const result = await fetch(apiUrl);
    const userData = await result.json();
    setUsers(userData);
  }

  //Hook de efeitos colaterais
  useEffect(getUsers, []);

  function handleButtonOnClick(user) {
    setPaymentForUser(user);
    setIsCardsModalOpen(true);
  }

  //Validação do valor
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const value = formData.get("valueToPay");
    const card = formData.get("cardOptions");

    console.log(value);
    console.log(card);
  };

  return (
    <>
      {
        //Modal de pagamento
        isCardModalOpen && (
          <ModalPayment
            firstSpan='Pagamento para '
            secondSpan={paymentForUser.name}
            closeModal={() => setIsCardsModalOpen(false)}>
            <form onSubmit={handleOnSubmit}>
              <input
                name='valueToPay'
                type='text'
                placeholder='R$ 0.00'
                className='inputValue'
                required
                onKeyUp={currencyMask}
              />
              <select name='cardOptions'>
                {cards.map((card) => {
                  console.log(card);
                  return <option value={card.card_number}>{card.card_number}</option>;
                })}
              </select>
              <button type='submit' className='modal__payButton'>
                Pagar
              </button>
            </form>
          </ModalPayment>
        )
      }
      {
        //Lista de usuários
        users.map((user) => {
          return (
            <UserList
              onClick={() => {
                handleButtonOnClick(user);
              }}
              key={user.id}
              userImg={user.img}
              name={user.name}
              id={user.id}
              username={user.username}
            />
          );
        })
      }
      {
        //Modal de pagamento realizado com sucesso
        false && (
          <ModalPayment
            firstSpan='Recibo de pagamento'
            closeModal={() => setIsCardsModalOpen(false)}>
            <span className='modal__paymentSucced'>O pagamento foi concluido com sucesso!</span>
          </ModalPayment>
        )
      }

      {
        //Modal de pagamento realizado sem sucesso
        false && (
          <ModalPayment
            firstSpan='Recibo de pagamento'
            closeModal={() => setIsCardsModalOpen(false)}>
            <span className='modal__paymentSucced'>
              O pagamento <strong>não</strong> foi concluido com sucesso!
            </span>
          </ModalPayment>
        )
      }
    </>
  );
}

//Função para verificação do pagamento
function paymentVerification() {}

//Função para cerificação de valor do pagamento
function checkValue() {}

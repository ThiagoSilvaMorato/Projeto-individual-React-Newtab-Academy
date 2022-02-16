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
  const [paymentSucced, setPaymentSucced] = useState(false);
  const [paymentUnsucced, setPaymentUnsucced] = useState(false);

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
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const value = formData.get("valueToPay");
    const card = formData.get("cardOptions");
    const selectedCard = cards.find((cardObject) => cardObject.card_number === card);

    //Função para verificação do pagamento
    const result = await (
      await fetch("https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989", {
        method: "POST",
        body: {
          card_number: card,
          cvv: selectedCard.cvv,
          expiry_date: selectedCard.expiry_date,

          destination_user_id: paymentForUser.id,

          value: value,
        },
      })
    ).json();
    if (card === "1111111111111111") {
      setPaymentSucced(true);
    } else {
      setPaymentUnsucced(true);
    }
    setIsCardsModalOpen(false);
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
                  return (
                    <option value={card.card_number}>
                      Cartão com final {card.card_number.substring(12)}
                    </option>
                  );
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
        paymentSucced && (
          <ModalPayment firstSpan='Recibo de pagamento' closeModal={() => setPaymentSucced(false)}>
            <span className='modal__paymentSucced'>O pagamento foi concluido com sucesso!</span>
          </ModalPayment>
        )
      }

      {
        //Modal de pagamento realizado sem sucesso
        paymentUnsucced && (
          <ModalPayment
            firstSpan='Recibo de pagamento'
            closeModal={() => setPaymentUnsucced(false)}>
            <span className='modal__paymentUnsucced'>
              O pagamento <strong>não</strong> foi concluido com sucesso!
            </span>
          </ModalPayment>
        )
      }
    </>
  );
}

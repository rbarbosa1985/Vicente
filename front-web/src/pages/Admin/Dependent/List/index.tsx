import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Guest } from "../../../../types/Guests";
import { makePrivateRequest } from "../../../../utils/request";

import "./styles.scss";

type Props = {
  confirm: number;
  guest?: Guest;
  onCreate: () => void;
  handleRefresh: () => void;
};

export default function DependentList({
  guest,
  onCreate,
  handleRefresh,
  confirm,
}: Props) {
  const history = useHistory();

  function handleRemove(dependentID: number) {
    const confirm = window.confirm("Deseja realmente excluir esse convidado?");
    if (confirm) {
      makePrivateRequest({
        url: `/dependents/${dependentID}`,
        method: "DELETE",
      })
        .then(() => {
          toast.info("Convidado deletado com sucesso!");
        })
        .catch(() => {
          toast.error("Erro ao deletar o convidado!");
        })
        .finally(() => handleRefresh());
    }
  }

  function handleConfirm() {
    if (!guest.status) {
      const confirm = window.confirm(
        "Deseja realmente confirmar sua presença na Festa?"
      );
      if (confirm) {
        const data = {
          name: guest.name,
          email: guest.email,
          invitation: guest.invitation,
          telephone: guest.telephone,
          status: true,
        };
        console.log(data);
        makePrivateRequest({
          method: "PUT",
          url: `/guests/dependent/${guest.id}`,
          data,
        })
          .then(() => {
            toast.info("Presença confirmada com sucesso!");
            handleRefresh();
          })
          .catch(() => {
            toast.error("Erro ao confirmar o convidado!");
          });
      }
    } else {
      const confirm = window.confirm(
        "Deseja realmente cancelar sua presença na Festa?"
      );
      if (confirm) {
        const data = {
          name: guest.name,
          email: guest.email,
          invitation: guest.invitation,
          telephone: guest.telephone,
          status: false,
        };
        console.log(data);
        makePrivateRequest({
          method: "PUT",
          url: `/guests/dependent/${guest.id}`,
          data,
        })
          .then(() => {
            toast.info("Presença cancelada com sucesso!");
            handleRefresh();
          })
          .catch(() => {
            toast.error("Erro ao cancelar o convidado!");
          });
      }
    }
  }

  function handleEdit(dependentId: number) {
    history.push(`/admin/dependents/${dependentId}`);
  }

  return (
    <div className="dependent-content card-base">
      <div className="dependent-title">
        <h2>
          Bem Vindo
          <br />
          {guest?.name}
        </h2>
      </div>
      <div>
        <p>
          Vamos juntos confirmar a sua participação <br />e de seus convidados
          para a festa.
        </p>
      </div>
      {!guest?.status ? (
        <button
          className="btn-outline-success btn btn-lg dependent-new"
          onClick={handleConfirm}
        >
          CONFIRMAR PRESENÇA
        </button>
      ) : (
        <button
          className="btn-danger btn btn-lg dependent-new"
          onClick={handleConfirm}
        >
          CANCELAR PRESENÇA
        </button>
      )}
      <p>
        Convites Restantes:{" "}
        {guest?.invitation - (guest?.dependents.length + confirm)}
      </p>
      <div className="wrapper-list">
        {guest?.dependents.map((dependent) => (
          <div className="dependent-list" key={dependent.id}>
            <h5 className="dependent-name">{dependent.name}</h5>
            <div className="options">
              <button
                className="btn-success btn dependent-option"
                onClick={() => handleEdit(dependent.id)}
              >
                EDITAR
              </button>
              <button
                className="btn-danger btn dependent-option"
                onClick={() => handleRemove(dependent.id)}
              >
                APAGAR
              </button>
            </div>
          </div>
        ))}
      </div>
      {guest?.invitation - (guest?.dependents.length + 1) > 0 && (
        <button
          className="btn-success btn btn-lg dependent-new"
          onClick={onCreate}
        >
          ADICIONAR ACOMPANHANTE
        </button>
      )}
    </div>
  );
}

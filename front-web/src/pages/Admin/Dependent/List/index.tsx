import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Guest } from "../../../../types/Guests";
import { makePrivateRequest } from "../../../../utils/request";

type Props = {
  guest?: Guest;
  onCreate: () => void;
  handleRefresh: () => void;
};

export default function DependentList({ guest, onCreate, handleRefresh }: Props) {

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
        }).finally(() => handleRefresh());
    }
  }

  function handleEdit( dependentId: number ){
    history.push(`/admin/dependents/${dependentId}`)
  }

  return (
    <>
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
      {guest?.invitation - guest?.dependents.length > 0 && (
        <button
          className="btn-success btn btn-lg dependent-new"
          onClick={onCreate}
        >
          ADICIONAR CONVIDADO
        </button>
      )}

      <p>Convites Restantes: {guest?.invitation - guest?.dependents.length}</p>
      {guest?.dependents.map((dependent) => (
        <div className="dependent-list" key={dependent.id}>
          <h5 className="dependent-name">{dependent.name}</h5>
          <div className="options">
            <button className="btn-success btn dependent-option" onClick={() => handleEdit(dependent.id)}>EDITAR</button>
            <button
              className="btn-danger btn dependent-option"
              onClick={() => handleRemove(dependent.id)}
            >
              APAGAR
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

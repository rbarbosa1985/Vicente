import { toast } from "react-toastify";
import { Guest } from "../../../../types/Guests";
import { makePrivateRequest } from "../../../../utils/request";

type Props = {
  guest?: Guest;
  onCreate: () => void;
  // handleChangePage: (page: number) => void;
};

// const onRemove = (dependentID : number) => {
//   const confirm = window.confirm('Deseja realmente excluir esse produto?');
//   if (confirm) {
//       makePrivateRequest({url: `/dependents/${dependentID}`, method: 'DELETE'})
//           .then(() => {
//               toast.info('Produto deletado com sucesso!');
//               // getProducts();
//           })
//           .catch(() => {
//               toast.error('Erro ao deletar o produto!');
//           });
//   }
// }

export default function DependentList({ guest, onCreate }: Props) {
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
            <button className="btn-success btn dependent-option" >EDITAR</button>
            <button className="btn-danger btn dependent-option">APAGAR</button>
          </div>
        </div>
      ))}
    </>
  );
}

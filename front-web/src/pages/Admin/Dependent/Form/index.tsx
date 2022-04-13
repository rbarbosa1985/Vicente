import "./styles.scss";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { makePrivateRequest } from "../../../../utils/request";
import { useEffect } from "react";

type FormState = {
  name: string;
  guest: number;
};

type ParamsType = {
  dependentId: string;
};

type Props = {
  handleRefresh: () => void;
  guest_id?: number;
};

export default function DependentForm({ handleRefresh, guest_id }: Props) {
  const { register, handleSubmit, errors, setValue } = useForm<FormState>();
  const history = useHistory();
  const { dependentId } = useParams<ParamsType>();
  const isEditing = dependentId !== "create";

  const handleCancel = () => {
    handleRefresh();
    history.goBack();
  };

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/dependents/${dependentId}` }).then(
        (response) => {
          setValue("name", response.data.name);
        }
      );
    }
  }, [dependentId, isEditing, setValue]);

  const onSubmit = (nome: FormState) => {
    const data = {
      guest: guest_id,
      name: nome.name,
    };
    console.log(data);
    makePrivateRequest({
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/dependents/${dependentId}` : "/dependents",
      data,
    })
      .then(() => {
        isEditing
          ? toast.info("Convidado editado com sucesso!")
          : toast.info("Convidado cadastrado com sucesso!");
        handleRefresh();
        history.push("/admin/dependents");
      })
      .catch(() => {
        toast.error("Erro ao salvar o convidado!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form-content">
        <h1 className="base-form-title">
          {isEditing ? "editar um convidado" : "cadastrar um convidado"}
        </h1>
        <div className="margin-bottom-30 form-dados">
          <p className="form-name">Digite o Nome do Convidado:</p>
          <input
            type="text"
            name="name"
            ref={register({
              required: "Campo Obrigatório.",
            })}
            placeholder="Nome do Convidado"
            className="form-control input-base form-input"
          />
          {errors.name && (
            <div className="invalid-feedback d-block">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="base-form-action">
          <button className="btn btn-primary border-radius-10 btn-lg mb-2">
            SALVAR
          </button>

          <button
            type="button"
            className="btn btn-outline-danger border-radius-10 btn-lg"
            onClick={handleCancel}
          >
            CANCELAR
          </button>
        </div>
    </form>
  );
}

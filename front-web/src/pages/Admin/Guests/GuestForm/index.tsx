import "./styles.scss";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { makePrivateRequest } from "../../../../utils/request";
import { useEffect } from "react";

type FormState = {
  name: string;
  email: string;
  telephone: string;
  invitation: number;
};

type ParamsType = {
  guestId: string;
};

type Props = {
  handleRefresh: () => void;
};

export default function GuestForm({ handleRefresh }: Props) {
  const { register, handleSubmit, errors, setValue } = useForm<FormState>();
  const history = useHistory();
  const { guestId } = useParams<ParamsType>();
  const isEditing = guestId !== "create";

  const handleCancel = () => {
    handleRefresh();
    history.goBack();
  };

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/guests/${guestId}` }).then((response) => {
        setValue("name", response.data.name);
        setValue("email", response.data.email);
        setValue("telephone", response.data.telephone);
        setValue("invitation", response.data.invitation);
      });
    }
  }, [guestId, isEditing, setValue]);

  const onSubmit = (data: FormState) => {
    console.log("Oi");
    makePrivateRequest({
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/guests/${guestId}` : "/guests",
      data,
    })
      .then(() => {
        isEditing
          ? toast.info("Convidado editado com sucesso!")
          : toast.info("Convidado cadastrado com sucesso!");
        handleRefresh();
        history.push("/admin/guests");
      })
      .catch(() => {
        toast.error("Erro ao salvar o convidado!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form-content">
      <div className="admin-base-form card-base">
        <h1 className="base-form-title">
          {isEditing ? "editar um convidado" : "cadastrar um convidado"}
        </h1>

        <div className="margin-bottom-30">
          <p className="form-names">Nome do Convidado:</p>
          <input
            type="text"
            name="name"
            ref={register({
              required: "Campo Obrigatório.",
            })}
            placeholder="Nome do Convidado"
            className="form-control  input-base"
          />
          {errors.name && (
            <div className="invalid-feedback d-block">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="margin-bottom-30">
          <p className="form-names">Email do Convidado:</p>
          <input
            type="text"
            name="email"
            ref={register({
              required: "Campo Obrigatório.",
            })}
            placeholder="Email do Convidado"
            className="form-control  input-base"
          />
          {errors.email && (
            <div className="invalid-feedback d-block">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="margin-bottom-30">
          <p className="form-names">Telefone do Convidado:</p>
          <input
            type="text"
            name="telephone"
            ref={register({
              required: "Campo Obrigatório.",
            })}
            placeholder="Telefone do Convidado"
            className="form-control  input-base"
          />
          {errors.telephone && (
            <div className="invalid-feedback d-block">
              {errors.telephone.message}
            </div>
          )}
        </div>
        <div className="margin-bottom-30">
          <p className="form-names">Quantidade de Convites:</p>
          <input
            name="invitation"
            type="number"
            ref={register({ required: "Campo Obrigatório." })}
            placeholder="Quantidade de Convites"
            className="form-control  input-base"
          />
          {errors.invitation && (
            <div className="invalid-feedback d-block">
              {errors.invitation.message}
            </div>
          )}
        </div>

        <div className="base-form-action">
          <button className="btn btn-outline-success border-radius-10 mb-3 btn-lg">
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
      </div>
    </form>
  );
}

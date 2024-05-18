import { useForm } from "react-hook-form";
import { createApiSneakers } from "../../../services/apiAuraSneakersService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { UserContext } from "../../../services/UserProvider";
import { useNavigate } from "react-router-dom";

function Signup() {
  const api = createApiSneakers();
  const { onChange } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await api.registerCustomer(data);
      window.sessionStorage.setItem(
        "AURA_SNEAKERS_USER",
        JSON.stringify(response)
      );
      onChange("id", response.id);
      onChange("name", response.name);
      onChange("email", response.email);
      onChange("password", response.password);
      toast.success("Conta criada com sucesso!", {
        position: "top-right",
        onClose: () => navigate("/"),
        autoClose: 300,
      });
    } catch (error) {
      const errorCode = error.response?.data?.errorCode;
      if (errorCode === "USER_ALREADY_EXISTS") {
        toast.warn("Você já possui uma conta. Faça login!", {
          position: "top-right",
        });
        return;
      }
      toast.error("Algo de errado aconteceu! Tente novamente mais tarde.", {
        position: "top-right",
      });
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Criar conta</h3>

        <input
          type="text"
          placeholder="Nome"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name?.type === "required" && (
          <p className="validation-error-message">O nome é obrigatório</p>
        )}

        <input
          type="text"
          placeholder="E-mail"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className="validation-error-message">O e-mail é obrigatório</p>
        )}

        <input
          type="password"
          placeholder="Senha"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p className="validation-error-message">A senha é obrigatória</p>
        )}

        <button type="submit" className="action-button">
          Acessar conta
        </button>
      </form>
    </section>
  );
}

export default Signup;

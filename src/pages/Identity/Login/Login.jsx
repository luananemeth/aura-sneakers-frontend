import { useForm } from "react-hook-form";
import { createApiSneakers } from "../../../services/apiAuraSneakersService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { UserContext } from "../../../services/UserProvider";
import { useNavigate } from "react-router-dom";

function Login() {
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
      const response = await api.loginCustomer(data);
      window.sessionStorage.setItem(
        "AURA_SNEAKERS_USER",
        JSON.stringify(response)
      );
      onChange("id", response.id);
      onChange("name", response.name);
      onChange("email", response.email);
      onChange("password", response.password);
      toast.success("Login realizado com sucesso!", {
        position: "top-right",
        onClose: () => navigate("/"),
        autoClose: 300,
      });
    } catch (error) {
      const errorCode = error.response?.data?.errorCode;
      if (errorCode === "INVALID_CREDENTIALS") {
        toast.warn("E-mail ou senha incorretos.", {
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
        <h3>Já sou cliente</h3>
        <input
          type="text"
          placeholder="E-mail"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className="validation-error-message">O E-mail é obrigatório</p>
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

export default Login;

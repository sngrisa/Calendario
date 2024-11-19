import { Button } from "../../../components/ui/button";
import "./login.scss";
import { IoLogInSharp } from "react-icons/io5";
import { Input } from "../../../components/ui/input";
import { RiLoginCircleFill } from "react-icons/ri";
import { useEffect } from "react";
import { getUsersByEmail, loginUsers } from "../../../services/users.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useUserLoginStore } from "../../../store/userLoginStore";

const Login = ({ toggleNavbarFooter }: { toggleNavbarFooter: any }) => {
  const navigate = useNavigate();

  const { login } = useUserLoginStore();

  useEffect(() => {
    toggleNavbarFooter();
    return () => {
      toggleNavbarFooter();
    };
  }, [toggleNavbarFooter]);

  const loginUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;
      const email = form.email.value;
      const searchId = await getUsersByEmail(email);
      const _id = searchId[0]._id;
      const password = form.password.value;
      const userData = { _id, email, password };

      const response = await loginUsers(userData);

      if (response.ok) {

        localStorage.setItem("tokenUser", response.token);
        console.log(localStorage.getItem('tokenUser'));
        login(response.token, { _id: response._id, name: response.name, email: response.email });

        Swal.fire({
          position: "center",
          icon: "success",
          title: `<b class="text-purple-950 uppercase font-bold">Bienvenido a Calendar </b>`,
          text: `En unos minutos se redirigirá a la sección de su calendario`,
          showConfirmButton: false,
          background: `whitesmoke`,
          timer: 3000,
        });

        navigate("/calendar");
      } else {
        Swal.fire({
          icon: "error",
          title: `<b class="text-red-600 font-bold uppercase">Error en el login </b>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonAriaLabel: "ok",
          color: "black",
          confirmButtonColor: "purple",
          text: `Hubo un error en el login`,
          background: "whitesmoke"
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: `<b class="text-red-600 font-bold uppercase">Cuenta no encontrada </b>`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonAriaLabel: "ok",
        color: "black",
        confirmButtonColor: "purple",
        text: `Verifique su nombre de usuario y contraseña, por favor intente nuevamente`,
        background: "whitesmoke"
      });
    }
  };

  return (
    <>
      <section className="section-login">
        <div className="container-login">
          <header>
            <div className="logo"></div>
          </header>
          <div className="signup-form text-white">
            <form autoComplete="off" autoCapitalize="off" onSubmit={loginUser}>
              <h2 className="text-center font-bold text-2xl flex items-center justify-center">
                <span className="mr-2 text-red-950">
                  <RiLoginCircleFill />
                </span>
                Iniciar Sesión
              </h2>
              <label htmlFor="email" className="text-center font-bold">Email:</label>
              <Input type="email" id="email" placeholder="Ingrese su email" required />
              <label htmlFor="password" className="text-center font-bold">Contraseña:</label>
              <Input type="password" id="password" placeholder="Ingrese la contraseña" required />
              <Button type="submit" style={{ height: "42px" }} className="hover:bg-purple-800">
                <span className="text-3xl mr-2"><IoLogInSharp /></span>Iniciar Sesión
              </Button>
              <hr className="text-white" />
              <p>No tiene cuenta? <a href="/auth/register">Crear una cuenta</a></p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
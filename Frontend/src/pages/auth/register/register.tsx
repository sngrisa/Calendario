import { GiArchiveRegister } from "react-icons/gi";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import "./register.scss";
import { FaUserPlus } from "react-icons/fa";
import { IoChevronBackCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IuserData } from "../../../services/interfaces/userData.interface";
import { postUsers } from "../../../services/users.service";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export interface FormErrors {
    username: string;
    email: string;
    password: string;
}

export interface FormData {
    username: string;
    email: string;
    password: string;
}

const Register = ({ toggleNavbarFooter }: { toggleNavbarFooter: any }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        toggleNavbarFooter();
        return () => {
            toggleNavbarFooter();
        };
    }, [toggleNavbarFooter]);

    const isStrongPassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateField = (name: string, value: string) => {
        const newErrors: FormErrors = { ...errors };


        if (name === 'username') {
            if (value.trim().length < 3) {
                newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
            } else {
                newErrors.username = '';
            }
        }
        if (name === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
                newErrors.email = 'Por favor ingresa un correo electrónico válido';
            } else {
                newErrors.email = '';
            }
        }

        if (name === 'password') {
            if (!isStrongPassword(value)) {
                newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial';
            } else {
                newErrors.password = '';
            }

        }


        setErrors(newErrors);
    };

    let showAlert = () =>{
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha registrado con éxito",
            showConfirmButton: false,
            timer: 2500
          });
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        validateField(name, value);
    };

    const validateForm = (): boolean => {
        let valid = true;
        const newErrors: FormErrors = { username: '', email: '', password: '' };

        if (formData.username.trim().length < 3) {
            newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
            valid = false;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Por favor ingresa un correo electrónico válido';
            valid = false;
        }

        if (!isStrongPassword(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmitFormUsers = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        const form = event.target as HTMLFormElement;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        const userData: IuserData = { username, email, password };

        try {
            await postUsers(userData);
            form.reset();
            setFormData({
                username: '',
                email: '',
                password: '',
            });
            showAlert();
            navigate('/auth/login');
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section id="register-section">
                <div className="container-register">
                    <header></header>
                    <div className="register-form">
                        <form autoCapitalize="off" autoComplete="off" onSubmit={handleSubmitFormUsers}>
                            <h2 className="text-center font-bold text-2xl flex items-center justify-center">
                                <span className="mr-2 text-red-950"><GiArchiveRegister /></span>Registrarse
                            </h2>

                            <label>Username:</label>
                            <Input
                                required
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Ingrese un username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && (
                                <h6 className="bg-red-700 text-white flex items-center justify-center px-4 py-4 errorMessage">
                                    <span className="mr-2 text-3xl"><MdError /></span>{errors.username}</h6>
                            )}

                            <label>Email:</label>
                            <Input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Ingrese su email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <h6 className="bg-red-700 text-white flex items-center justify-center px-4 py-4 errorMessage">
                                    <span className="mr-2 text-3xl"><MdError /></span>{errors.email}</h6>
                            )}

                            <label>Password:</label>
                            <Input
                                required
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Ingrese la contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <h6 className="bg-red-700 text-white flex items-center justify-center px-4 py-4 errorMessage">
                                    <span className="mr-2 text-3xl"><MdError /></span>{errors.password}</h6>
                            )}

                            <hr className="text-white" />
                            <p className="text-sm mb-6 mt-4 text-2x1">
                                Usted al registrarse acepta nuestros <a href="/help/legal" className="text-purple-800 hover:text-purple-950">Términos de uso</a> y
                                <a className="text-purple-800 hover:text-purple-950" href="/help/legal"> Nuestras políticas de privacidad</a>
                            </p>

                            <Button
                                type="submit"
                                className="flex items-center btn-register"
                                style={{ height: "42px" }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    <span className="mr-1 text-2xl"><FaUserPlus /></span>
                                )}
                                {loading ? "Cargando..." : "Registrarse"}
                            </Button>

                            <hr className="text-black mt-4" />
                            <a href="/auth/login">
                                <Button
                                    type="button"
                                    className="flex items-center backbtn"
                                    style={{ height: "42px" }}
                                    variant={"destructive"}
                                >
                                    <span className="mr-1 text-2xl"><IoChevronBackCircle /></span>Ya tengo cuenta
                                </Button>
                            </a>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;

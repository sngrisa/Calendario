import { HiQuestionMarkCircle } from "react-icons/hi";
import Question from "./question/question";
import "./questions.scss";

export interface IQuestion {
    id?: string | number;
    question: string;
    answer: string;
}

let questions: IQuestion[] = [
    {
        question: "¿Por qué necesito registrarme para usar la aplicación de calendario?",
        answer: "El registro te permite personalizar tu experiencia, almacenar tus eventos y acceder a tu calendario desde cualquier dispositivo. Además, asegura que tus datos estén protegidos y sincronizados."
    },
    {
        question: "¿Qué información se requiere para registrarme?",
        answer: "Necesitamos tu nombre, dirección de correo electrónico y una contraseña. También puedes optar por registrarte usando tus cuentas de Google o Facebook para mayor comodidad."
    },
    {
        question: "¿Puedo usar la aplicación sin registrarme?",
        answer: "No, el registro es necesario para garantizar la seguridad de tus datos y permitirte acceder a todas las funciones, como la sincronización de eventos y la creación de recordatorios."
    },
    {
        question: "¿Cómo restablezco mi contraseña si la olvido?",
        answer: "En la pantalla de inicio de sesión, selecciona '¿Olvidaste tu contraseña?' y sigue las instrucciones para restablecerla a través de tu correo electrónico."
    },
    {
        question: "¿Es seguro mi información personal?",
        answer: "Sí, tomamos muy en serio la privacidad de tus datos. Usamos encriptación para proteger tu información y no compartimos tus datos con terceros sin tu consentimiento."
    },
    {
        question: "¿Puedo acceder a mi calendario desde varios dispositivos?",
        answer: "Sí, puedes acceder a tu calendario desde cualquier dispositivo donde hayas iniciado sesión con tu cuenta. Todos tus eventos se sincronizarán automáticamente."
    },
    {
        question: "¿Cómo puedo compartir mi calendario con otras personas?",
        answer: "Puedes compartir tu calendario desde la configuración de la aplicación. Simplemente ingresa las direcciones de correo electrónico de las personas con las que deseas compartirlo y elige los permisos que deseas otorgarles."
    },
    {
        question: "¿Qué hago si no recibo las notificaciones de mis eventos?",
        answer: "Asegúrate de que las notificaciones estén habilitadas en la configuración de la aplicación y en la configuración de tu dispositivo. También verifica que la aplicación tenga permisos para enviar notificaciones."
    },
    {
        question: "¿Puedo integrar mi calendario con otras aplicaciones?",
        answer: "Sí, nuestra aplicación se puede integrar con otras plataformas como Google Calendar y Outlook, lo que te permite centralizar todos tus eventos en un solo lugar."
    },
    {
        question: "¿Qué sucede si quiero eliminar mi cuenta?",
        answer: "Puedes eliminar tu cuenta desde la configuración de la aplicación. Ten en cuenta que esta acción es irreversible y se eliminarán todos tus datos."
    }
];

const Questions = () => {
    return (
        <>
             <section className="bg-slate-700 pt-24">
            <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6">
                <h2 className="mb-6 text-6xl font-extrabold tracking-tight text-center lg:mb-8 lg:text-3xl uppercase text-white flex items-center justify-center">
                    <span className="mr-2 text-7xl text-purple-600"><HiQuestionMarkCircle /></span> Preguntas más frecuentes
                </h2>
                <hr className="mb-12 text-purple-950 font-bold bg-slate-950" />
                <div className="max-w-screen-md mx-auto">
                    {questions.map((question: IQuestion, idx: number) => (
                        <Question key={idx} question={question} />
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}

export default Questions;
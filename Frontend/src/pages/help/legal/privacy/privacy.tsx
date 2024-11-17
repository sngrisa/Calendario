import { FaLock, FaShieldAlt, FaBullseye, FaFileContract, FaGlobe, FaRegFileAlt, FaUserShield } from "react-icons/fa";
import { IDocumentContentLegal } from "../../interfaces/IHelp.intertace";
import { IoDocumentText } from "react-icons/io5";
import DocumentLegal from "../../documentLegal/documentLegal";


const Privacy = () => {

    const content: IDocumentContentLegal = {
        id: 1,
        title: "Políticas de privacidad",
        icon: <IoDocumentText />,
        desc: "Lea a continuación nuestros términos y condiciones de uso",
        steps: [
        {
            id: 1,
            title: "Protección de Datos",
            desc: "Nos comprometemos a proteger tus datos personales y garantizar su privacidad.",
            icon: <FaUserShield />
        },
        {
            id: 2,
            title: "Seguridad",
            desc: "Implementamos medidas de seguridad para proteger tu información.",
            icon: <FaLock />
        },
        {
            id: 3,
            title: "Transparencia",
            desc: "Te informamos sobre cómo recopilamos y usamos tu información.",
            icon: <FaShieldAlt />
        },
        {
            id: 4,
            title: "Consentimiento",
            desc: "Tu consentimiento es esencial para procesar tus datos.",
            icon: <FaFileContract />
        },
        {
            id: 5,
            title: "Cookies",
            desc: "Utilizamos cookies para mejorar tu experiencia en nuestro sitio.",
            icon: <FaGlobe />
        },
        {
            id: 6,
            title: "Acceso a la Información",
            desc: "Tienes derecho a acceder a la información que tenemos sobre ti.",
            icon: <FaRegFileAlt />
        },
        {
            id: 7,
            title: "Cambios en la Política",
            desc: "Cualquier cambio en nuestra política de privacidad será notificado.",
            icon: <FaBullseye />
        }
    ]
}


    return (
        <>
            <div className="container mx-auto bg-slate-50 cursor-pointer">
                <DocumentLegal legalInfo={content} />
            </div>
        </>
    )
}

export default Privacy;
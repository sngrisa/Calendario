import { FaUsers, FaMouse, FaDatabase } from 'react-icons/fa';
import { FaBugSlash } from 'react-icons/fa6';
import { IoMdContact } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import { RiUserSharedFill } from 'react-icons/ri';
import { IDocumentContentLegal } from '../../interfaces/IHelp.intertace';
import { HiMiniDocumentMagnifyingGlass } from 'react-icons/hi2';
import DocumentLegal from '../../documentLegal/documentLegal';

const TermsUse = () => {

    let content: IDocumentContentLegal = {
        id:1,
        title: "Términos y condiciones de uso",
        icon: <HiMiniDocumentMagnifyingGlass />,
        desc: "Lea a continuación nuestros términos y condiciones de uso",
        steps: [
            {
                id: 1,
                title: "Registro de Usuario",
                desc: "Para acceder a las funcionalidades de nuestra aplicación de calendario, es necesario crear una cuenta de usuario. Durante el registro, deberás proporcionar información veraz, precisa y actualizada. Eres responsable de mantener la confidencialidad de tu información de cuenta y de todas las actividades que se realicen bajo tu cuenta. Si sospechas que tu cuenta ha sido comprometida, debes notificarnos de inmediato.",
                icon: <FaUsers />
            },
            {
                id: 2,
                title: "Inicio de Sesión",
                desc: "El inicio de sesión es un requisito para utilizar la aplicación. Al iniciar sesión, asegúrate de utilizar una contraseña segura y de no compartirla con terceros. Cualquier actividad que se realice a través de tu cuenta es tu responsabilidad. Nos reservamos el derecho de bloquear el acceso a cualquier cuenta que consideremos que ha sido utilizada de manera no autorizada.",
                icon: <RiUserSharedFill />
            },
            {
                id: 3,
                title: "Uso del Calendario",
                desc: "Nuestra aplicación de calendario está diseñada para ayudarte a gestionar tus eventos y recordatorios de manera eficiente. Está prohibido utilizar la aplicación para actividades ilegales, malintencionadas o que violen derechos de terceros. Nos reservamos el derecho de suspender o cancelar cuentas que infrinjan estas normas.",
                icon: <FaMouse />
            },
            {
                id: 4,
                title: "Privacidad de los Datos",
                desc: "Valoramos tu privacidad. Tu información personal será tratada de acuerdo con nuestra Política de Privacidad, que detalla cómo recopilamos, utilizamos y protegemos tu información. Nos comprometemos a no compartir tus datos personales con terceros sin tu consentimiento explícito, salvo en los casos que la ley lo requiera.",
                icon: <FaDatabase />
            },
            {
                id: 5,
                title: "Modificaciones a los Términos",
                desc: "Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones se publicarán en la aplicación y entrarán en vigor inmediatamente después de su publicación. Te recomendamos revisar regularmente esta sección para estar al tanto de posibles cambios. El uso continuado de la aplicación después de cualquier cambio constituirá tu aceptación de los nuevos términos.",
                icon: <MdModeEditOutline />
            },
            {
                id: 6,
                title: "Responsabilidad",
                desc: "Nuestra aplicación se proporciona 'tal cual' y 'según disponibilidad'. No garantizamos que el servicio será ininterrumpido o libre de errores. No nos hacemos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que pueda surgir del uso o la imposibilidad de uso de la aplicación, incluso si hemos sido informados de la posibilidad de tales daños.",
                icon: <FaBugSlash />
            },
            {
                id: 7,
                title: "Contacto",
                desc: "Si tienes preguntas o inquietudes sobre estos Términos y Condiciones, por favor contáctanos a través de la sección de ayuda dentro de la aplicación. Nuestro equipo está disponible para asistirte y resolver cualquier duda que puedas tener.",
                icon: <IoMdContact />
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

export default TermsUse;
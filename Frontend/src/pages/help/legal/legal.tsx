import { IDoEvent } from '../interfaces/IHelp.intertace';
import { IoDocumentText } from "react-icons/io5";
import { FaLandmark } from "react-icons/fa";
import { HiMiniDocumentMagnifyingGlass } from "react-icons/hi2";
import PanelOptions from '../panelOptions/panelOptions';
import TermsUse from './termsuse/termsuse';
import Privacy from './privacy/privacy';
import "./legal.scss";

const Legal = () => {

  const doEvents: IDoEvent[] = [
    {
      id: 1,
      title: "Términos y condiciones de uso",
      desc: "Consulte los términos y condiciones de uso",
      icon: <HiMiniDocumentMagnifyingGlass />,
      component: <TermsUse />,
    },
    {
      id: 2,
      title: "Politicas de privacidad",
      desc: "Consulta la politicas de privacidad de Calendar",
      icon: <IoDocumentText />,
      component: <Privacy />,
    },
  ];

  return (
    <>
      <section className='bg-slate-50 h-screen w-full'>
        <div className='legalScreen'>
          <PanelOptions doEvents={doEvents} icon={<FaLandmark />} title="Marco Legal" desc="Aqui encontrara toda la informacion referida nuestro marco legal" />
        </div>
      </section>
    </>
  )
}

export default Legal;
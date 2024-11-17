import "./mainHelp.scss";
import { GiClawHammer } from "react-icons/gi";

const MainHelp = () => {
    return (
        <>
            <section className="backgroundMainHelp">
                <div className="container relative mx-auto">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div className="pr-12">
                                <h1 className="text-white font-bold text-5xl marginMainHelp text-shadow-lg">
                                    <span className="text-9xl text-slate-800 flex justify-center mb-2 text-shadow-lg logoHelp"><GiClawHammer /></span>
                                    Bienvenido a nuestro centro de ayuda
                                </h1>
                                <p className="mt-4 text-lg text-white font-bold text-shadow-lg">
                                    A continuación se muestran las opciones del centro de ayuda, tiene un menu a su izquierda de navegación.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainHelp;
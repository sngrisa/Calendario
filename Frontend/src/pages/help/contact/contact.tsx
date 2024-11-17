import { IoSend } from "react-icons/io5";
import "./contact.scss";
import { FaWpforms } from "react-icons/fa6";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

const Contact = () => {
    return (
        <>
            <section className="sectionContact">
                <div id="containerContact">
                    <div id="formContact" className="formContact">
                        <form autoCapitalize="off" autoComplete="off">
                            <h2 className="text-bold flex justify-center text-2xl items-center font-bold"><span className="mr-2 text-3xl text-purple-950 font-bold"><FaWpforms /></span>Deje su consulta</h2>
                            <label htmlFor="name">Nombre</label>
                            <Input type="text" name="name" id="name" required placeholder="Ingrese su nombre" />
                            <label>Apellido</label>
                            <Input type="text" name="lastname" id="lastname" required placeholder="Ingrese su apellido" />
                            <label htmlFor="email">Email</label>
                            <Input type="email" name="email" id="email" required placeholder="Ingrese su email" />
                            <label htmlFor="consult">Motivo de la consulta</label>
                            <textarea style={{height: "100px"}}></textarea>
                            <Button type="submit" className="mt-4" style={{ height: "42px" }}><span className="mr-2 text-2xl"><IoSend /></span>Enviar consulta</Button>
                        </form>
                    </div>
                </div >
            </section >
        </>
    )
}

export default Contact;
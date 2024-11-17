import { IDocumentContentLegal, IStepLegal } from "../interfaces/IHelp.intertace";
import "./documentLegal.scss";

const DocumentLegal = ({ legalInfo }: { legalInfo: IDocumentContentLegal }) => {
    return (
        <>
            <h2 className="flex items-center justify-center font-bold uppercase text-purple-950 mb-8 pt-12 text-4xl text-shadow">
                <span className="mr-2 text-5xl text-purple-700 font-bold">{legalInfo.icon}</span>
                {legalInfo.title}
            </h2>
            <p className="flex items-center justify-center font-bold text-purple-900 text-shadow">{legalInfo.desc}</p>
            <div className="help-content-container" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {legalInfo.steps.map((step: IStepLegal) => (
                    <section key={step.id} className="text-shadow">
                        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
                            <h6 className="text-center text-purple-950 text-shadow font-bold flex items-center justify-center"><span className="text-purple-600 text-5xl mr-2">{step.icon}</span> {step.title}</h6>
                            <div className="flex justify-center">
                                <p className="text-sm sm:text-base mt-12 font-bold">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                        <div className="w-full rounded-md bg-gray-100 max-[991px]:h-[475px] lg:w-2/5"></div>
                    </section>
                ))}
            </div>
        </>
    )
}

export default DocumentLegal;
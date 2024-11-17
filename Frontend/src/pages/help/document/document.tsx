
import { IDocumentContent, IStep } from "../interfaces/IHelp.intertace";
import "./document.scss";

const DocumentHelp = ({ information }: { information: IDocumentContent }) => {
  return (
    <>
      <h2 className="flex items-center justify-center font-bold uppercase text-purple-950 mb-8 pt-12 text-4xl text-shadow">
        <span className="mr-2 text-5xl text-purple-700 font-bold">{information.icon}</span>
        {information.title}
      </h2>
      <p className="flex items-center justify-center font-bold text-purple-900 text-shadow">{information.desc}</p>
      <div className="help-content-container" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {information.steps.map((step: IStep) => (
          <section key={step.id} className="text-shadow">
            <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
              <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
                <div className="flex flex-col gap-8 lg:w-3/5">
                  <p className="text-sm sm:text-base mt-12 font-bold">
                    {step.step}
                  </p>
                </div>
                <img
                  src={step.img}
                  alt={`Step ${step.id} - ${step.step}`}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-full rounded-md bg-gray-100 max-[991px]:h-[475px] lg:w-2/5"></div>
            </div>
          </section>
        ))}
      </div>
      <h3 className="text-center font-bold text-purple-800 pb-12 text-2xl uppercase text-shadow">{information.finalstatus}</h3>
      <img src={information.imgstatus} alt="Event added status" className="w-full h-auto object-cover" />
    </>
  );
};

export default DocumentHelp;
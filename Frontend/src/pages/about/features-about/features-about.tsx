import { IFeatureAbout } from "../About";
import "./features-about.scss";

const FeaturesAbout = ({ featureAbout }: { featureAbout: IFeatureAbout }) => {
    return (
        <>
            <section className="text-black">
                <div className='container mx-auto pb-12 pt-12'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white card-item mr-6 card-item-card'>
                        <div className='text-container mt-12'>
                            <h3 className="flex text-center font-bold text-3xl md:text-4xl lg:text-4xl text-purple-950">
                                {featureAbout.title}
                            </h3>
                            <p className="font-bold mt-6">
                                {featureAbout.desc}
                            </p>
                        </div>
                        <div className='flex items-center justify-center mb-6 md:mb-0 cursor-pointer'>
                            <img src={featureAbout.img} id="imgFeature" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturesAbout;
import { IFeatures } from '../features';
import "./feature.scss";
import { FaAsterisk } from "react-icons/fa";

const Feature = ({ feature }: { feature: IFeatures }) => {
    return (
        <>
            <div className=" sm:text-lg text-center">
                <span className='iconFeature mb-24 flex justify-center'>{feature.imageUrl}</span>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight ">{feature.title}</h2>
                <p className="mb-8 font-light lg:text-xl">{feature.desc}</p>
                <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                    {
                        feature.items.map((itemFeature: string, idx: string | number) => {
                            return (
                                <li className="flex space-x-3 items-center justify-center" key={idx}>
                                    <span className='text-purple-800'><FaAsterisk /></span>
                                    <span className="text-base font-medium leading-tight ">{itemFeature}</span>
                                </li>)
                        })
                    }
                </ul>
                <p className="font-light lg:text-xl">{feature.footerDesc}</p>
            </div>
        </>
    )
}

export default Feature
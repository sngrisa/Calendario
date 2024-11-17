import React from 'react'
import { IOtherFeatures } from '../otherFeatures';

const OtherFeature = ({ feature }: { feature: IOtherFeatures }) => {
    return (
        <>
            <div>
                <span className={feature.classColour}>{feature.icon}</span>
                <h3 className="mb-2 text-2xl font-bold text-black mt-2">{feature.name}</h3>
                <p className="font-light text-black dark:text-gray-400">{feature.desc}</p>
            </div>
        </>
    )
}

export default OtherFeature;
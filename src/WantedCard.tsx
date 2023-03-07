import { useState } from "react"

export default function WantedCard(wantedInfo: any) {
    const { cauton, description, person_classification, reward, hair, eyes, height_min, height_max, age_range, title, url, image } = wantedInfo
    
    function getHeight(num: number) {
        const feet = Math.floor(num / 12)
        const inches = num % 12
        return `${feet}' ${inches}"`
    }
    
    return (
        <div className='w-full p-10 mb-7 lg:mb-0 shadow-xl rounded-lg'>
            <div className="flex flex-wrap items-center">
                <img className="w-16 h-16 rounded-full ring-4 ring-white m-5 lg:mb-none" src={image} />
                <a href={url} className="text-sky-white hover:underline text-lg">{title}</a>
            </div>
            {person_classification && person_classification !== 'Main' &&
                <p className="text-gray-400 text-sm">{person_classification}</p>
            }
            {description &&
                <p className="text-gray-400 mt-5">{description}</p>
            }
            <ul className="text-sky-400 mt-5 items-center">
                {height_min && height_max &&
                    <li className="text-sm mt-3">{getHeight(height_min) + ' - ' + getHeight(height_max) }</li>
                }
                {age_range &&
                    <>
                        <li className="text-sm mt-3">{age_range}</li>
                    </>
                }
                {hair &&
                    <li className="text-sm mt-3">Hair Color: {hair}</li>
                }
                {eyes &&
                    <>
                        <li className="text-sm mt-3">Eye Color: {eyes}</li>
                    </>
                }
                {cauton && 
                    <p className="text-gray-400 text-sm mt-5">Cauton: {cauton}</p>
                }
                {reward && 
                    <p className="text-gray-400 text-sm mt-5">Reward: {reward}</p>
                } 
            </ul>
        </div>
    )
}
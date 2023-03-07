import { useState } from "react"

export default function WantedCard(wantedInfo: any) {
    const [modalState, setModalState] = useState<string>('hidden')

    const { cauton, description, person_classification, reward, hair, eyes, height_min, height_max, age_range, title, url, image } = wantedInfo
    
    function getHeight(num: number) {
        const feet = Math.floor(num / 12)
        const inches = num % 12
        return `${feet}' ${inches}"`
    }
    
    return (
        <div className='w-full p-10 mb-7 lg:mb-0 shadow-xl rounded-lg'>
            <div className="flex flex-wrap items-center">
                <img onClick={() => setModalState('block')} className="w-16 h-16 rounded-full ring-4 ring-white mr-5 hover:opacity-80 cursor-pointer mb-5 lg:mb-none" src={image} />
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

            <div onClick={() => setModalState('hidden')} className={`${modalState} fixed top-0 left-0 right-0 z-50 w-full p-36 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-cover flex justify-center items-center cursor-pointer`}>
                <div className="absolute top-0 right-0 p-10">
                    <i onClick={() => setModalState('hidden')} className="fa-solid fa-xmark text-2xl cursor-pointer hover:text-gray-400"></i>
                </div>
                <div className="p-24">
                    <img className="rounded-xl cursor-default" src={image}></img>
                </div>
            </div>
        </div>
    )
}
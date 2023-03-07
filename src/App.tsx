import { useState, useEffect } from 'react'
import './App.css'
import fieldOffices from '../data/fieldOffices.json'
import WantedCard from './WantedCard'

export default function App() {
  const [wanted, setWanted] = useState<any>([])
  const [suggestions, setSuggestions] = useState<any>([])
  const [search, setSearch] = useState<string>('')
  const [office, setOffice] = useState<string>('')
  const [officeShowing, setOfficeShowing] = useState<string>('hidden')

  function handleSearch(value: string) {
    setSearch(value)
    if (value.length > 0) {
      const suggestions = fieldOffices.filter((office: any) => {
        return office.toLowerCase().includes(value.toLowerCase())
      })
      setSuggestions(suggestions)
    } else {
      setSuggestions([])
      setOfficeShowing('hidden')
      setWanted([])
    }
  }

  function handleOfficePicked(office: string) {
    setSuggestions([])
    setSearch('')
    getWanted(office)
    setOfficeShowing('block')
    setOffice(office)
  }

  async function getWanted(office: string) {
    office = office.split(" ").join("").toLocaleLowerCase()
    const response = await fetch('https://api.fbi.gov/@wanted?pageSize=20&page=1&sort_on=modified&sort_order=desc&field_offices=' + office)
    const data = await response.json()
    setWanted(data.items)
  }

  return (
    <>
      <div className='text-white p-12 lg:p-28 min-h-screen'>
        <section className='my-10'>
          <h1 className='text-4xl'>FBI Most Wanted Locator</h1>
          <p className='text-gray-400 my-3'>Find the most wanted individuals by your local FBI office</p>
          <a href='https://www.fbi.gov/' className='text-sky-400 hover:text-sky-500 cursor-pointer'>
            <span className='mr-2'>FBI Website</span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </section>
        <section className='my-10'>
          <div className='w-full border border-gray-400 outline-none focus-within:outline focus-within:outline-sky-400 rounded-lg p-4 flex items-center'>
            <i className="fa-solid fa-magnifying-glass mr-2 text-gray-400"></i>
            <input
              type='text'
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className='w-full bg-transparent text-white outline-none focus:outline-none'
              placeholder='Search by field office city'
            >
            </input>
          </div>
          <ul className='bg-gray-900 shadow-2xl text-lg rounded-lg'>
              {
                suggestions.map((office: any) =>{
                  return (
                    <li onClick={() => handleOfficePicked(office)} className='p-5 hover:bg-gray-800 cursor-pointer rounded-lg'>{office}</li>
                  )
                })
              }
            </ul>
          <h1 className={`text-xl mt-12 ${officeShowing}`}>Viewing Results For: {office}</h1>
          <div className='lg:grid lg:grid-cols-2 md:gap-10 my-10'>
            {
              wanted.map((wanted: any) => {
                return (
                  <WantedCard
                    key={wanted.uid}
                    cauton={wanted.cauton}
                    description={wanted.description}
                    aliases={wanted.aliases}
                    reward={wanted.reward_text}
                    hair={wanted.hair}
                    eyes={wanted.eyes}
                    height_min={wanted.height_min}
                    height_max={wanted.height_max}
                    age_range={wanted.age_range}
                    title={wanted.title}
                    url={wanted.url}
                    image={wanted.images[0].original}
                    person_classification={wanted.person_classification}
                  />
                )
              })
            }
          </div>
        </section>

      </div>
      <footer className='p-10 bg-white dark:bg-gray-900'>
            <ul className='flex text-sm my-2'>
                <li className='mx-1'><a className='text-sky-400 hover:text-sky-500' href='https://github.com/ZachMcM'>Github</a></li>
                <li className='mx-1 text-sky-400'>·</li>
                <li className='mx-1'><a className='text-sky-400 hover:text-sky-500' href='https://www.linkedin.com/in/zach-mcmullen-ba3a2621b/'>LinkedIn</a></li>
                <li className='mx-1 text-sky-400'>·</li>
                <li className='mx-1'><a className='text-sky-400 hover:text-sky-500' href='mailto:zachmcmullen04@gmail.com'>Email</a></li>
            </ul>
            <p className='text-gray-400 text-sm ml-1'>Made with <i className="fa-solid fa-heart"></i> by <a className='text-sky-400 hover:text-sky-500 cursor-pointer' href='https://zachmcmullen.com'>Zach McMullen</a></p>
        </footer>
    </>
  )
}


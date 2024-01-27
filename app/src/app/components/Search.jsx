'use client'

import { useState } from 'react'
import Escrow from './Escrow'

export default function Search({ escrows }) {
  const [searchedAddress, setSearchedAddress] = useState('')
  const [searched, setSearched] = useState(null)

  const handleSearch = () => {
    const searchedEscrow = escrows.find(escrow => escrow.address = searchedAddress)
    setSearched(searchedEscrow)
  }

  return (
    <div className='w-full'>
      <div className='p-2 md:p-4 bg-white rounded-xl shadow-lg flex items-baseline gap-2'>
        <input className="input mb-0" placeholder="Enter a 0x address to search for a deployed Escrow" type="text" id="search" value={searchedAddress} onChange={(e) => setSearchedAddress(e.target.value)}/>
        <button className="button" onClick={handleSearch}>Search</button>
      </div>
      {searched && (
        <div className='p-2 mt-2 md:p-4 bg-white rounded-xl shadow-lg gap-2'>
          <h2 className="uppercase border-b border-b-gray-300 text-center text-black mb-2">Searched Escrow</h2>
          <Escrow {...searched}/> 
        </div>
      )}
    </div>
  )
}

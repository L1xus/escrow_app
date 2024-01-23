'use client'

export default function Search() {
  return (
    <div className='w-full p-2 md:p-4 bg-white rounded-xl shadow-lg flex items-baseline gap-2'>
      <input className="input mb-0" placeholder="Enter a 0x address to search for a deployed Escrow" type="text" id="search"/>
      <button className="button">Search</button>
    </div>
  )
}
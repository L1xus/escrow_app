'use client'
import Escrow from './Escrow'

export default function EContracts({ escrows }) {
  return (
    <div className="flex-1 existing-contracts p-2 md:p-4 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="uppercase border-b border-b-gray-300 text-center text-black mb-2 w-full">Existing Contracts</h2>
      <div id="container">
        {escrows.map((escrow) => {
        return <Escrow key={escrow} {...escrow} />;
        })}
        {/* <Escrow/> */}
      </div>
    </div>
  )
}

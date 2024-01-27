'use client'

import dynamic from 'next/dynamic'

export default function Contract({setEscrows}) {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const arbiterAddress = document.getElementById('arbiter').value
    const beneficiaryAddress = document.getElementById('beneficiary').value
    const depositAmount = document.getElementById('wei').value
    let escrowContract
    try {
      const deployModule = await import('../useDeploy')
      const useDeployFunction = deployModule.default

      escrowContract = await useDeployFunction(arbiterAddress, beneficiaryAddress, depositAmount)
      
      const approveModule = await import('../utils/useApprove')
      const approveFunction = approveModule.default 

      const escrow = {
        address: escrowContract,
        arbiter: arbiterAddress,
        beneficiary: beneficiaryAddress,
        value: depositAmount.toString(),
        handleApprove: async () => {
          await approveFunction(arbiterAddress, escrowContract)
          document.getElementById(escrowContract).className = 'complete'
          document.getElementById(escrowContract).innerText = "✓ It's been approved!" 
        }
      }
      setEscrows((escrows) => [...escrows, escrow])

    } catch(error) {
      console.error(error)
    }
  }

  return ( 
    <div className="inline-block border border-gray-200 p-2 md:p-4 bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <h2 className="uppercase border-b border-b-gray-300 text-center text-black mb-2">New Contract</h2>
            <label htmlFor="arbiter">Arbiter Address</label>
            <input className="input" type="text" id="arbiter" />

            <label htmlFor="beneficiary">Beneficiary Address</label>
            <input className="input" type="text" id="beneficiary" />

            <label htmlFor="wei">Deposit Amount</label>
            <input className="input" type="text" id="wei" />

            <button className="button w-full mt-2" type="submit">Deploy</button>
            </div>
        </form>
    </div>
  )
}

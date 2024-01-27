'use client'

import Search from "./Search"
import Contract from "./Contract"
import EContracts from "./EContracts"
import { WagmiConfig } from 'wagmi'
import { useState } from "react"
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { sepolia } from 'viem/chains'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

const metadata = {
  name: 'escrow-app',
}

const chains = [sepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ 
      wagmiConfig,
      projectId,
      chains, 
      themeVariables: {
        '--w3m-accent': '#087EA4',
      }
})

export default function App() {
  const [escrows, setEscrows] = useState([])
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className='flex justify-between max-w-4xl mx-auto p-2'>
        <h1 className='text-2xl font-bold'>Escrow-App</h1>
        <w3m-button />
      </div>
      <div className="flex flex-col items-center gap-2 max-w-4xl mx-auto p-2">
        <Search escrows={escrows}/>      
        <div className="w-full flex space-between gap-2">
          <Contract setEscrows={setEscrows} />
          <EContracts escrows={escrows} />
        </div>
      </div>
    </WagmiConfig>
  )
}

'use client'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { sepolia } from 'viem/chains'

import { useAccount } from 'wagmi'

const projectId = '39fc2b7c598c1acf992776d335c3acb4'

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

function GetAccount() {
  const account = useAccount()

  console.log(account.address);
  return (
    <div>Address: {account.address}</div>
  )
}

export default function Header() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className='flex justify-between max-w-4xl mx-auto p-2'>
        <h1 className='text-2xl font-bold'>Escrow-App</h1>
        <w3m-button />
      </div>
    </WagmiConfig>
  )
}
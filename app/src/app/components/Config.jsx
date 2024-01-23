'use client'

import { useEffect, useState } from "react"
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { sepolia } from 'viem/chains'
//import { useAccount } from 'wagmi'
import { createWalletClient, custom, http } from 'viem'

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

const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: http()
  //custom(window.ethereum)
})



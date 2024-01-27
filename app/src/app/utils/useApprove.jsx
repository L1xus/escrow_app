'use client'

import Escrow from '../artifacts/contracts/Escrow.sol/Escrow'
import { publicClient, walletClient } from './client'

export default async function useApprove(arbiter, address) {
  try{
    const { request } = await publicClient.simulateContract({
      account: arbiter,
      address: address,
      abi: Escrow.abi,
      functionName: 'approve',
    })
    const hash = await walletClient.writeContract(request)
    const transaction = await publicClient.waitForTransactionReceipt({
      hash: hash
    })
 
    return transaction
  } catch(error) {
    console.error('Dang it!!', error)
    throw error
  }
}



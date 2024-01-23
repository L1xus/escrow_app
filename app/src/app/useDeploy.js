'use client'

import Escrow from './artifacts/contracts/Escrow.sol/Escrow'
import { deployContract, parseEther } from 'viem'
import { account, walletClient, publicClient } from './utils/client' 


export default async function useDeploy(arbiter, beneficiary, value) {
  try{
    const hash = await walletClient.deployContract({
      abi: Escrow.abi,
      account: account,
      args: [arbiter, beneficiary],
      value: parseEther(value),
      gas: 500000n,
      bytecode: Escrow.bytecode,
    })

    const transaction = await publicClient.waitForTransactionReceipt({
      hash: hash
    })
    const contractAddress = transaction.contractAddress

    return contractAddress
  } catch (error) {
    console.error('shit!', error)
    throw error
  }
}









/*import { useContractWrite, usePrepareContractWrite } from 'wagmi'

export function useDeploy(arbiter, beneficiary, value) {
  const { config } = usePrepareContractWrite({
    abi: Escrow.abi,
    functionName: 'constructor',
    args: [arbiter, beneficiary],
    value: parseEther(value),
    bytecode: Escrow.bytecode,
  }) 

  const { write } = useContractWrite(config)

  return async () => {
    const deploy = await write()
    console.log('from deploy function: ', deploy)
    return deploy
  }
}
*/

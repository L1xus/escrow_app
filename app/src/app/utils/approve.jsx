import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import Escrow from '../artifacts/contracts/Escrow'


export async function approve(escrowContract) {
  const { config } = usePrepareContractWrite({
    address: escrowContract,
    abi: Escrow.abi,
    functionName: 'approve',
  })

  const { data, write } = useContractWrite(config)

  return { data, write }
}

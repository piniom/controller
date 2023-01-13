import { useStarknetCall } from '@starknet-react/core'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import { number } from 'starknet'
import { ConnectWallet } from '~/components/ConnectWallet'
import { IncrementCounter } from '~/components/IncrementCounter'
import { SignMessage } from '~/components/SignMessage'
import { TransactionList } from '~/components/TransactionList'
import { useCounterContract } from '~/hooks/counter'

const Home: NextPage = () => {
  const { contract: counter } = useCounterContract()

  const { data: counterResult } = useStarknetCall({
    contract: counter,
    method: 'counter',
    args: [],
  })

  const counterValue = useMemo(() => {
    if (counterResult && counterResult.length > 0) {
      const value = number.toBN(counterResult[0])
      return value.toString(10)
    }
  }, [counterResult])

  return (
    <div>
      <h2>Wallet</h2>
      <ConnectWallet />
      <h2>Counter Contract</h2>
      <p>Address: {counter?.address}</p>
      <p>Value: {counterValue}</p>
      <IncrementCounter />
      <h2>Recent Transactions</h2>
      <TransactionList />
      <SignMessage />
    </div>
  )
}

export default Home

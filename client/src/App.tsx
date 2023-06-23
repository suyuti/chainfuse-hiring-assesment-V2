import React, { useState } from 'react';
import './App.css';
import { useWallet } from './hooks/useWallet';
import { useChainfuse } from './hooks/useChainfuse';

function App() {
  const wallet = useWallet()
  const chainfuse = useChainfuse()

  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  return (
    <div className="p-2 flex-column space-y-2">
      <p className='text-xl font-semibold text-center w-1/2'>ChainFuse client</p>
      <div className="p-2 border w-1/2 flex space-x-2 shadow rounded">
        <button className="btn flex flex-1" onClick={() => {
          wallet.connectTo()
            .then(res => {
              setAccount(res.account)
              // TODO async chain call will be refactored later. 
              wallet.getBalance().then(_balance => {
                setBalance(_balance.formatted)
              })
            })
        }}>
          Connect Wallet
        </button>

        <button className="btn flex-1" onClick={() => {
          wallet.disconnectFrom()
            .then(res => {
              setAccount("")
            })
        }}>
          Disconnect Wallet
        </button>
      </div>

      <div className="p-2 border w-1/2 flex space-x-2 shadow rounded">
        <button className="btn flex flex-1" disabled={account == ""} onClick={() => chainfuse.login(account)}>
          Login
        </button>

        <button className="btn flex-1"  disabled={account == ""} onClick={() => chainfuse.signup(account)}>
          Sign up
        </button>
      </div>

      <div className="border w-1/2 p-4 shadow rounded ">
        <div className="flex-row flex justify-between items-center">
          <p className="font-semibold">Account:</p>
          <p className="">{account || "----"}</p>
        </div>
        <div className="flex-row flex justify-between items-center">
          <p className="font-semibold">Balance:</p>
          <p className="">{balance || "0.00"}</p>
        </div>
      </div>

      <div className='divider'></div>
      <div className='justify-end  flex'>
        <a className=' text-slate-500' href='https://www.github.com/suyuti'>suyuti</a>
      </div>
    </div>
  );
}

export default App;

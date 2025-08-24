import React from 'react'

export default function Signup() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
          <h3 className={'text-4xl sm:text-5xl md:text-6xl '+fugaz.className}>{isRegister ? 'Create An Account' : 'Log In'}</h3>
          <p>You&#39;re one step away!</p>
    
          <input className='max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none ' 
            value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" type="text" />
          <input className='max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none ' 
            value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" type="password" />
          
          <div className='max-w-[400px] w-full mx-auto'>
            <Button full clickHandler={handleSubmit} disabled={cantAuth || isAuthenticating} text={isAuthenticating ? 'Submiting...' : 'Submit'}/>
          </div>
          <p className='text-center'>
            {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '} 
            <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600 cursor-pointer '>{isRegister ? 'Log In' : 'Sign Up'}</button>
          </p>
    </div>
  )
}

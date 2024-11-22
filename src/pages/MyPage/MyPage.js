import React from 'react'
import Info from '../../components/MyPage/Info'

function MyPage() {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
        <div className='text-2xl'>
            <Info/>
        </div>
    </div>
  )
}

export default MyPage
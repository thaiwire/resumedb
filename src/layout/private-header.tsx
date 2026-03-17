import { UserState, useUserStore } from '@/store/users-store'
import { Menu } from 'lucide-react'
import React from 'react'


function PrivateHeader() {
   
  const { user } : UserState = useUserStore()
  

  return (
    <div className='px-5 py-5 bg-primary flex justify-between'>
        <h1 className='text-2xl font-bold text-white font-bold'>
            Resume Builder (TWP)
        </h1>
        <div className='flex items-center gap-5'>
            <h1 className='text-sm text-white font-medium'>
                {user?.name} {user?.role === 'admin' ? '(Admin)' : '(User)'}
            </h1>
            <Menu className='text-white text-sm' size={15} />
        </div>
    </div>
  )
}

export default PrivateHeader
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { ModeToggle } from '../theme/mode-toggle'
import  '../../../public/fix-logo.svg'

const AuthHeader = () => {
  return (
    <>
     
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm dark:bg-gray-800">
        <div className="flex items-center">
          <div className="flex items-center space-x-3 ml-3">
            <Link href='/' className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-0.5 ">
              <Image
                src="fix-logo.svg"
                alt="Health Bridge Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full bg-transparent"
              />
            </Link >
          </div>
        </div>
        <ModeToggle />
      </div>
     
    </>
  )
}

export default AuthHeader
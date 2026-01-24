"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function Header() {
  const path = usePathname()

  useEffect(() => {
    console.log(path)
  }, [path])

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <div className="flex items-center gap-2">
        <Image
          src="/l.svg"
          width={40}
          height={40}
          alt="logo"
          className="w-10 h-auto"
        />
        <h2 className="text-3xl font-bold">MOCKMATE</h2>
      </div>

      <ul className="hidden md:flex gap-6 m-2">
        {[
          ['/dashboard', 'Dashboard'],
          ['/dashboard/questions', 'Questions'],
          ['/dashboard/upgrade', 'Upgrade'],
          ['/dashboard/how', 'How it Works'],
        ].map(([route, label]) => (
          <li
            key={route}
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path === route ? 'text-primary font-bold' : ''}`}
          >
            {label}
          </li>
        ))}
      </ul>

      <UserButton />
    </div>
  )
}

export default Header

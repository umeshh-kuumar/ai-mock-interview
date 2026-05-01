"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/theme-toggle'
import { Bot } from 'lucide-react'

function Header() {
  const path = usePathname()
  const { user } = useUser()
  const userImageUrl = user?.imageUrl || null

  const navItems = [
    ['/dashboard', 'Dashboard'],
    ['/dashboard/questions', 'Questions'],
    ['/dashboard/upgrade', 'Upgrade'],
    ['/dashboard/how', 'How it Works'],
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)" }}>
            <Bot size={18} color="#fff" />
          </div>
          <h2 className="font-sora font-bold text-[19px] text-zinc-50 tracking-tight">MOCKMATE</h2>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-6">
            {navItems.map(([route, label]) => (
              <li key={route}>
                <Link
                  href={route}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    path === route
                      ? 'text-zinc-50'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-zinc-900 shadow-xl">
            {userImageUrl ? (
              <Image
                src={userImageUrl}
                alt={user?.fullName || "User profile"}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-zinc-100">
                {user?.firstName?.[0] || "U"}
              </div>
            )}
            <div className="absolute inset-0 opacity-0">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

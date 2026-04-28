"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '/components/theme-toggle'

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
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/l.svg"
            width={40}
            height={40}
            alt="MockMate logo"
            className="h-auto w-9"
          />
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">MOCKMATE</h2>
        </Link>

        <nav className="hidden md:block">
          <ul className="m-2 flex gap-2 rounded-full bg-slate-100/80 p-1 dark:bg-slate-800/60">
            {navItems.map(([route, label]) => (
              <li key={route}>
                <Link
                  href={route}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    path === route
                      ? 'bg-white text-primary shadow-sm dark:bg-slate-900'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/30 bg-muted">
            {userImageUrl ? (
              <Image
                src={userImageUrl}
                alt={user?.fullName || "User profile"}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-foreground">
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

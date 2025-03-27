'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, GraduationCap, Calendar, Settings, LogOut } from 'lucide-react'

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { name: 'Professeurs', href: '/admin/teachers', icon: Users },
  { name: 'Élèves', href: '/admin/students', icon: GraduationCap },
  { name: 'Planning', href: '/admin/schedule', icon: Calendar },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Barre de navigation latérale */}
      <div className="w-64 border-r border-white/10 bg-gray-900/50 backdrop-blur-xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Groove Academy
          </h1>
        </div>
        <nav className="mt-8 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-white/10 text-white shadow-lg shadow-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 transition-colors duration-200",
                  isActive ? "text-blue-400" : "text-white/60"
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-white/10">
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 
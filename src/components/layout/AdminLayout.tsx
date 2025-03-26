import { ReactNode } from 'react'
import Link from 'next/link'
import { 
  HomeIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  CalendarIcon,
  CurrencyEuroIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: HomeIcon },
  { name: 'Professeurs', href: '/admin/teachers', icon: AcademicCapIcon },
  { name: 'Élèves', href: '/admin/students', icon: UserGroupIcon },
  { name: 'Planning', href: '/admin/planning', icon: CalendarIcon },
  { name: 'Paiements', href: '/admin/payments', icon: CurrencyEuroIcon },
]

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-indigo-700">
        <div className="flex h-16 shrink-0 items-center px-6">
          <h1 className="text-2xl font-bold text-white">Groove Academy</h1>
        </div>
        <nav className="mt-6">
          <div className="space-y-1 px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center rounded-lg px-2 py-2 text-base font-medium text-indigo-100 hover:bg-indigo-600 hover:text-white"
              >
                <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <header className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Administration
            </h1>
          </div>
        </header>
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 
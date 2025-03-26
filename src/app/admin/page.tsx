import AdminLayout from '@/components/layout/AdminLayout'
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  CalendarIcon,
  CurrencyEuroIcon 
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Total Élèves', value: '0', icon: UserGroupIcon },
  { name: 'Total Professeurs', value: '0', icon: AcademicCapIcon },
  { name: 'Cours cette semaine', value: '0', icon: CalendarIcon },
  { name: 'Revenus du mois', value: '0 €', icon: CurrencyEuroIcon },
]

const recentActivity = [
  { id: 1, type: 'Inscription', name: 'Marie Dupont', date: '2024-03-25' },
  { id: 2, type: 'Paiement', name: 'Jean Martin', date: '2024-03-24' },
  { id: 3, type: 'Nouveau cours', name: 'Guitare Débutant', date: '2024-03-23' },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                    <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activité récente */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Activité récente
            </h3>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-5">
                    <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                      <h3 className="text-sm font-semibold text-gray-800">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {activity.type} - {activity.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {activity.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 
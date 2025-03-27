const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

interface DashboardStats {
  stats: {
    totalStudents: number
    totalTeachers: number
    weeklyCourses: number
    monthlyRevenue: number
  }
  recentActivity: Array<{
    id: number
    type: string
    createdAt: string
    user: {
      firstName: string
      lastName: string
    }
  }>
}

export const statsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_URL}/api/stats/dashboard`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des statistiques")
    }

    return response.json()
  }
} 
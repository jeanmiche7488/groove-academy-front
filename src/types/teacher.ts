export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  specialty?: string
  hourlyRate?: number
  teacherProfile?: {
    id: string
    instruments: Array<{
      id: string
      instrument: string
      level: string
    }>
    workshops: Array<{
      id: string
      workshopType: string
      description?: string
    }>
    courses: Array<{
      id: string
      name: string
      enrollments: Array<{
        id: string
        studentId: string
      }>
    }>
  }
  stats: {
    totalStudents: number
    totalCourses: number
    monthlyEarnings: number
  }
} 
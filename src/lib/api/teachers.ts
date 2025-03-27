const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

interface Teacher {
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

export const teachersService = {
  async getAllTeachers(): Promise<Teacher[]> {
    const response = await fetch(`${API_URL}/api/teachers`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des professeurs")
    }

    return response.json()
  },

  async getTeacherById(id: string): Promise<Teacher> {
    const response = await fetch(`${API_URL}/api/teachers/${id}`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du professeur")
    }

    return response.json()
  },

  async createTeacher(data: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
    specialty?: string
    hourlyRate?: number
    instruments?: Array<{ instrument: string; level: string }>
    workshops?: Array<{ type: string; description?: string }>
  }): Promise<Teacher> {
    const response = await fetch(`${API_URL}/api/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la création du professeur")
    }

    const teacher = await response.json()

    // Mettre à jour les instruments si fournis
    if (data.instruments && data.instruments.length > 0) {
      await this.updateTeacherInstruments(teacher.id, data.instruments)
    }

    // Mettre à jour les ateliers si fournis
    if (data.workshops && data.workshops.length > 0) {
      await this.updateTeacherWorkshops(teacher.id, data.workshops)
    }

    return this.getTeacherById(teacher.id)
  },

  async updateTeacher(id: string, data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    specialty?: string
    hourlyRate?: number
    instruments?: Array<{ instrument: string; level: string }>
    workshops?: Array<{ type: string; description?: string }>
  }): Promise<Teacher> {
    console.log('Envoi de la mise à jour:', { id, data })
    const response = await fetch(`${API_URL}/api/teachers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      let errorMessage = "Erreur lors de la mise à jour du professeur"
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorMessage
      } catch (e) {
        console.error('Erreur lors de la lecture de la réponse:', e)
      }
      throw new Error(errorMessage)
    }

    try {
      const result = await response.json()
      console.log('Réponse de la mise à jour:', result)
      return result
    } catch (e) {
      console.error('Erreur lors de la lecture de la réponse JSON:', e)
      throw new Error("Erreur lors de la lecture de la réponse du serveur")
    }
  },

  async deleteTeacher(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/teachers/${id}`, {
      method: "DELETE",
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du professeur")
    }
  },

  async updateTeacherInstruments(id: string, instruments: Array<{ instrument: string; level: string }>): Promise<Teacher> {
    const response = await fetch(`${API_URL}/api/teachers/${id}/instruments`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ instruments }),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour des instruments')
    }
    return response.json()
  },

  async updateTeacherWorkshops(id: string, workshops: Array<{ type: string; description?: string }>): Promise<Teacher> {
    const response = await fetch(`${API_URL}/api/teachers/${id}/workshops`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ workshops }),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour des ateliers')
    }
    return response.json()
  },

  async addTeacherAvailabilities(id: string, availabilities: Array<{ dayOfWeek: number; startTime: string; endTime: string }>): Promise<void> {
    const response = await fetch(`${API_URL}/api/teachers/${id}/availabilities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ availabilities }),
    })
    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout des disponibilités')
    }
  }
} 
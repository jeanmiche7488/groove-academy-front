'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Edit, Trash2, User, Music, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react'
import { teachersService } from '@/lib/api/teachers'
import { toast } from 'sonner'
import { TeacherFormModal } from '@/components/teachers/TeacherFormModal'

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

export default function TeachersPage() {
  const router = useRouter()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInstrument, setSelectedInstrument] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const data = await teachersService.getAllTeachers()
      setTeachers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      toast.error('Erreur lors du chargement des professeurs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) return

    try {
      await teachersService.deleteTeacher(id)
      toast.success('Professeur supprimé avec succès')
      fetchTeachers()
    } catch (err) {
      toast.error('Erreur lors de la suppression du professeur')
    }
  }

  const handleCreate = async (data: any) => {
    try {
      await teachersService.createTeacher(data)
      setIsCreateModalOpen(false)
      await fetchTeachers()
      toast.success('Professeur créé avec succès')
    } catch (err) {
      toast.error('Erreur lors de la création du professeur')
      throw err
    }
  }

  const handleEdit = async (data: any) => {
    if (!selectedTeacher) return
    try {
      console.log('Mise à jour du professeur:', selectedTeacher.id, data)
      const updatedTeacher = await teachersService.updateTeacher(selectedTeacher.id, data)
      console.log('Professeur mis à jour:', updatedTeacher)
      await fetchTeachers()
      setIsEditModalOpen(false)
      setSelectedTeacher(null)
      toast.success('Professeur mis à jour avec succès')
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err)
      toast.error('Erreur lors de la mise à jour du professeur')
    }
  }

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesInstrument = selectedInstrument === 'all' || 
                            teacher.teacherProfile?.instruments.some(i => i.instrument === selectedInstrument)
    return matchesSearch && matchesInstrument
  })

  const instruments = Array.from(new Set(
    teachers.flatMap(teacher => 
      teacher.teacherProfile?.instruments.map(i => i.instrument) || []
    )
  )).sort()

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  )
  
  if (error) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-red-400 text-center">
        <p className="text-lg font-semibold">Erreur</p>
        <p className="text-white/60">{error}</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Professeurs</h1>
          <p className="text-white/60 mt-2">Gérez vos professeurs et leurs cours</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau professeur
        </Button>
      </div>

      <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Rechercher un professeur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50"
            />
          </div>
          <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
            <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Filtrer par instrument" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/10">
              <SelectItem value="all">Tous les instruments</SelectItem>
              {instruments.map((instrument) => (
                <SelectItem key={instrument} value={instrument}>
                  {instrument}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <User className="h-6 w-6 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors duration-200">
                    {teacher.firstName} {teacher.lastName}
                  </h3>
                  <p className="text-sm text-white/60">{teacher.email}</p>
                  <div className="flex gap-2">
                    {teacher.teacherProfile?.instruments.map((instrument) => (
                      <Badge 
                        key={instrument.id} 
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/20"
                      >
                        {instrument.instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-white/60">Tarif horaire</p>
                  <p className="font-semibold text-white">{teacher.hourlyRate}€</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/60">Élèves</p>
                  <p className="font-semibold text-white">{teacher.stats?.totalStudents || 0}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedTeacher(teacher)
                      setIsEditModalOpen(true)
                    }}
                    className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(teacher.id)}
                    className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <TeacherFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        mode="create"
      />

      <TeacherFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedTeacher(null)
        }}
        onSubmit={handleEdit}
        initialData={selectedTeacher}
        mode="edit"
      />
    </div>
  )
} 
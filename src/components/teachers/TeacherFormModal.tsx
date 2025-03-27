import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface TeacherFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  initialData?: any
  mode: 'create' | 'edit'
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  specialty: string
  hourlyRate: string
  instruments: Array<{ instrument: string; level: string }>
  workshops: string[]
}

const AVAILABLE_INSTRUMENTS = [
  { value: 'GUITAR', label: 'Guitare' },
  { value: 'BASS', label: 'Basse' },
  { value: 'PIANO', label: 'Piano' },
  { value: 'VOCAL', label: 'Chant' },
  { value: 'DRUMS', label: 'Batterie' }
]

const AVAILABLE_WORKSHOPS = [
  { value: 'JAM_SESSION', label: 'Jam Session' },
  { value: 'COMPOSITION', label: 'Composition' },
  { value: 'IMPROVISATION', label: 'Improvisation' },
  { value: 'CONCERT_PREP', label: 'Préparation aux concerts' }
]

const STUDENT_LEVELS = [
  { value: 'BEGINNER', label: 'Débutant' },
  { value: 'INTERMEDIATE', label: 'Intermédiaire' },
  { value: 'ADVANCED', label: 'Avancé' },
  { value: 'EXPERT', label: 'Expert' }
]

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialty: '',
  hourlyRate: '',
  instruments: [{ instrument: '', level: '' }],
  workshops: []
}

export function TeacherFormModal({ isOpen, onClose, onSubmit, initialData, mode }: TeacherFormModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        specialty: initialData.specialty || '',
        hourlyRate: initialData.hourlyRate || '',
        instruments: initialData.teacherProfile?.instruments.map((i: any) => ({
          instrument: i.instrument,
          level: i.level
        })) || [{ instrument: '', level: '' }],
        workshops: initialData.teacherProfile?.workshops.map((w: any) => w.workshopType) || []
      })
    } else {
      setFormData(initialFormData)
    }
  }, [initialData, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialty: formData.specialty,
        hourlyRate: Number(formData.hourlyRate),
        instruments: formData.instruments
          .filter(i => i.instrument && i.level)
          .map(i => ({
            instrument: i.instrument,
            level: i.level
          })),
        workshops: formData.workshops.map(type => ({
          type,
          description: ''
        }))
      }
      await onSubmit(submitData)
      toast.success(mode === 'create' ? 'Professeur créé avec succès' : 'Professeur mis à jour avec succès')
      setFormData(initialFormData)
      onClose()
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      toast.error('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData(initialFormData)
    onClose()
  }

  const addInstrument = () => {
    setFormData(prev => ({
      ...prev,
      instruments: [...prev.instruments, { instrument: '', level: '' }]
    }))
  }

  const removeInstrument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instruments: prev.instruments.filter((_, i) => i !== index)
    }))
  }

  const toggleWorkshop = (workshopType: string) => {
    setFormData(prev => ({
      ...prev,
      workshops: prev.workshops.includes(workshopType)
        ? prev.workshops.filter(w => w !== workshopType)
        : [...prev.workshops, workshopType]
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === 'create' ? 'Nouveau professeur' : 'Modifier le professeur'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white/80">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white/80">Nom</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/80">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate" className="text-white/80">Tarif horaire (€)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white/80">Instruments</Label>
            {formData.instruments.map((instrument: any, index: number) => (
              <div key={index} className="flex gap-4">
                <Select
                  value={instrument.instrument}
                  onValueChange={(value) => {
                    const newInstruments = [...formData.instruments]
                    newInstruments[index] = { ...instrument, instrument: value }
                    setFormData(prev => ({ ...prev, instruments: newInstruments }))
                  }}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Sélectionner un instrument" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    {AVAILABLE_INSTRUMENTS.map((inst) => (
                      <SelectItem key={inst.value} value={inst.value}>
                        {inst.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={instrument.level}
                  onValueChange={(value) => {
                    const newInstruments = [...formData.instruments]
                    newInstruments[index] = { ...instrument, level: value }
                    setFormData(prev => ({ ...prev, instruments: newInstruments }))
                  }}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    {STUDENT_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInstrument(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addInstrument}
              className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              + Ajouter un instrument
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-white/80">Ateliers</Label>
            <div className="grid grid-cols-2 gap-4">
              {AVAILABLE_WORKSHOPS.map((workshop) => (
                <div key={workshop.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={workshop.value}
                    checked={formData.workshops.includes(workshop.value)}
                    onCheckedChange={() => toggleWorkshop(workshop.value)}
                    className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor={workshop.value} className="text-white/80">
                    {workshop.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty" className="text-white/80">Spécialité</Label>
            <Textarea
              id="specialty"
              value={formData.specialty}
              onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="text-white/60 hover:text-white hover:bg-white/5"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              {loading ? 'Enregistrement...' : mode === 'create' ? 'Créer' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
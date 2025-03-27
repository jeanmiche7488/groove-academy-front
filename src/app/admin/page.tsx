'use client'

import { Card } from '@/components/ui/card'
import { Users, GraduationCap, Music, DollarSign, TrendingUp, Calendar, Clock } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
        <p className="text-white/60 mt-2">Vue d'ensemble de votre école</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-300">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">Total professeurs</p>
              <p className="text-2xl font-bold text-white">12</p>
              <div className="flex items-center mt-1 text-sm text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+2 ce mois</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors duration-300">
              <GraduationCap className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">Total élèves</p>
              <p className="text-2xl font-bold text-white">48</p>
              <div className="flex items-center mt-1 text-sm text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+5 ce mois</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-500/20 rounded-xl group-hover:bg-orange-500/30 transition-colors duration-300">
              <Music className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">Total cours</p>
              <p className="text-2xl font-bold text-white">24</p>
              <div className="flex items-center mt-1 text-sm text-white/60">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Cette semaine</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors duration-300">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">Gains mensuels</p>
              <p className="text-2xl font-bold text-white">4,800€</p>
              <div className="flex items-center mt-1 text-sm text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% vs mois dernier</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">Prochains cours</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Cours de Piano</p>
                    <p className="text-sm text-white/60">avec Marie Dupont</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">14:00</p>
                  <p className="text-sm text-white/60">Salle 2</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">Activité récente</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white">Nouveau professeur ajouté</p>
                  <p className="text-sm text-white/60">Il y a 2 heures</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
} 
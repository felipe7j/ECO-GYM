import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Dumbbell,
  Percent,
  AlertTriangle,
  CalendarCheck,
  TrendingDown,
  MessageSquare,
  Bot,
  Sliders,
  Sparkles,
  CheckCircle2,
  Phone,
  ExternalLink,
  ShieldCheck,
  Send,
  Building2,
  Palette,
  Clock,
  MapPin,
  Check,
  Copy,
} from 'lucide-react';
import { Student, GymTheme, GymPlan, AutomationRule, TrialBooking } from '../../types';
import { COLOR_PRESETS } from '../../data/mockData';
import { soundFx } from '../../utils/audio';

interface AdminPortalProps {
  students: Student[];
  gymTheme: GymTheme;
  onUpdateGymTheme: (newTheme: GymTheme) => void;
  plans: GymPlan[];
  onUpdatePlans: (newPlans: GymPlan[]) => void;
  automations: AutomationRule[];
  onToggleAutomation: (id: string) => void;
  trialBookings?: TrialBooking[];
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  students,
  gymTheme,
  onUpdateGymTheme,
  plans,
  onUpdatePlans,
  automations,
  onToggleAutomation,
  trialBookings = [],
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'retention' | 'automations' | 'whitelabel'>('dashboard');

  // WhatsApp simulation modal
  const [targetStudentForMessage, setTargetStudentForMessage] = useState<Student | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [copiedMessageFeedback, setCopiedMessageFeedback] = useState(false);

  // Local state for white-label customizer
  const [localTheme, setLocalTheme] = useState<GymTheme>({ ...gymTheme });
  const [localPlans, setLocalPlans] = useState<GymPlan[]>([...plans]);
  const [saveThemeFeedback, setSaveThemeFeedback] = useState(false);

  // Identify at-risk students (e.g. >= 5 days inactive or baixa frequência)
  const atRiskStudents = students.filter(
    (s) => s.lastActiveDaysAgo >= 5 || s.frequencyStatus === 'baixa' || s.frequencyStatus === 'risco_evasao'
  );

  const handleOpenMessageModal = (student: Student) => {
    setTargetStudentForMessage(student);
    const template = `Olá, ${student.name.split(' ')[0]}! 👋 Sentimos sua falta na ${gymTheme.name}! Notamos que faz ${student.lastActiveDaysAgo} dias que você não vem treinar. Seu professor tem novos ajustes para seu treino. Como podemos te ajudar a retomar sua rotina hoje?`;
    setCustomMessage(template);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(customMessage);
    setCopiedMessageFeedback(true);
    soundFx.playCheckSound();
    setTimeout(() => setCopiedMessageFeedback(false), 2500);
  };

  const handleSaveWhiteLabel = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGymTheme(localTheme);
    onUpdatePlans(localPlans);
    soundFx.playSuccessFanfare();
    setSaveThemeFeedback(true);
    setTimeout(() => setSaveThemeFeedback(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              Diretoria & Gestão Estratégica
            </span>
            <span className="text-xs text-slate-400">ECO GYM Intelligence v2.6</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-sans">
            Painel da Academia — {gymTheme.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visão gerencial consolidada: retenção de alunos, controle de evasão, automações de crescimento e personalização da sua marca.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('whitelabel')}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-lg shadow-emerald-950/40"
          >
            <Palette className="w-4 h-4" />
            <span>Personalizar Marca da Academia</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD KPIS (Exact values required in prompt item 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* KPI 1: Alunos ativos */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Alunos ativos</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">387</span>
            <span className="block text-[10px] text-emerald-400 font-semibold mt-0.5">Base regular ativa</span>
          </div>
        </div>

        {/* KPI 2: Novos alunos */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Novos alunos</span>
            <UserPlus className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">+24</span>
            <span className="block text-[10px] text-slate-400 mt-0.5">Neste mês</span>
          </div>
        </div>

        {/* KPI 3: Treinos realizados */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Treinos realizados</span>
            <Dumbbell className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">1.284</span>
            <span className="block text-[10px] text-slate-400 mt-0.5">Check-ins no app</span>
          </div>
        </div>

        {/* KPI 4: Frequência média */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Frequência média</span>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">78%</span>
            <span className="block text-[10px] text-emerald-400 font-semibold mt-0.5">Acima da média de mercado</span>
          </div>
        </div>

        {/* KPI 5: Alunos com baixa frequência */}
        <div 
          onClick={() => setActiveTab('retention')}
          className="rounded-2xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-500/60 p-4 flex flex-col justify-between shadow-lg cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-amber-400 text-xs mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Baixa frequência</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">31</span>
            <span className="block text-[10px] text-amber-200 font-bold mt-0.5 underline">
              Ver lista de risco →
            </span>
          </div>
        </div>

        {/* KPI 6: Planos próximos do vencimento */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Vencendo em 5d</span>
            <CalendarCheck className="w-4 h-4 text-slate-300" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">18</span>
            <span className="block text-[10px] text-slate-400 mt-0.5">Lembretes automáticos</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
        {[
          { id: 'dashboard', label: 'Visão Geral & Retenção', icon: TrendingDown },
          { id: 'retention', label: 'Alunos com Baixa Frequência (31)', icon: AlertTriangle },
          { id: 'automations', label: 'Automações Eco Growth', icon: Bot },
          { id: 'whitelabel', label: 'Personalização White-Label da Academia', icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VISÃO GERAL */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Highlight Banner: Aluno não treina há 7 dias (Prompt item 9) */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#161d18] to-emerald-950/30 border border-amber-500/40 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Detecção Automática de Risco de Evasão
                </span>
                <h3 className="text-lg font-bold text-white font-sans mt-0.5">
                  ⚠️ Maria Oliveira está há 7 dias sem registrar atividade
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  O algoritmo de retenção da Eco Growth identificou queda crítica de frequência. 78% dos alunos que atingem 7 dias de inatividade cancelam nos próximos 30 dias se não forem abordados.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const target = students.find((s) => s.id === 'std_maria') || students[1];
                handleOpenMessageModal(target);
              }}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-3 shrink-0 shadow-lg shadow-emerald-950/50 transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar WhatsApp de Reengajamento</span>
            </button>
          </div>

          {/* Quick Tables: At-Risk Students Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alunos em Risco */}
            <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-amber-400" />
                  Alunos que estão diminuindo a frequência
                </h3>
                <button
                  onClick={() => setActiveTab('retention')}
                  className="text-xs text-emerald-400 hover:underline font-semibold"
                >
                  Ver todos (31)
                </button>
              </div>

              <div className="space-y-3">
                {atRiskStudents.slice(0, 3).map((student) => (
                  <div
                    key={student.id}
                    className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatarUrl}
                        alt={student.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">{student.name}</span>
                        <span className="text-[11px] text-amber-400">
                          {student.lastActiveDaysAgo} dias sem treinar • Freq: {student.monthlyAttendanceTotal} treinos/mês
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenMessageModal(student)}
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs transition-colors"
                      title="Contatar via WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Leads Recentes de Aula Experimental */}
            <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  Leads do Site Público (Aula Experimental)
                </h3>
                <span className="text-xs text-slate-400 font-mono">24 novos</span>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Lucas Silveira', modality: 'Musculação Biomecânica', time: 'Há 12 min', phone: '(11) 98711-2233' },
                  { name: 'Camila Ferreira', modality: 'Treinamento Funcional', time: 'Há 45 min', phone: '(11) 97622-4455' },
                  { name: 'Felipe Duarte', modality: 'Cross Training Eco', time: 'Hoje, 10:15', phone: '(11) 99833-6677' },
                ].map((lead, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-3 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{lead.name}</span>
                      <span className="text-[10px] text-slate-400">{lead.modality} • {lead.phone}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {lead.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RETENÇÃO / BAIXA FREQUÊNCIA COMPLETO */}
      {activeTab === 'retention' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-sans">
                  Gestão de Evasão: Alunos com Baixa Frequência
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Módulo de inteligência que detecta padrões de desengajamento antes do cancelamento da matrícula.
                </p>
              </div>

              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
                31 alunos sob monitoramento preventivo
              </span>
            </div>

            <div className="divide-y divide-slate-800/80">
              {students.map((student) => {
                const isUrgent = student.lastActiveDaysAgo >= 7;
                const isWarning = student.lastActiveDaysAgo >= 4;

                return (
                  <div
                    key={student.id}
                    className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={student.avatarUrl}
                        alt={student.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{student.name}</span>
                          {isUrgent && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                              ⚠️ 7+ dias sem atividade
                            </span>
                          )}
                          {!isUrgent && isWarning && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Frequência em queda
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs text-slate-400 mt-1">
                          <span>Plano: <strong className="text-slate-200">{student.planName}</strong></span>
                          <span>Frequência: <strong className="text-slate-200">{student.monthlyAttendanceTotal} treinos/mês</strong> (ant. {student.previousMonthAttendance})</span>
                          <span>Telefone: <strong className="text-slate-300 font-mono">{student.phone}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenMessageModal(student)}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-3.5 py-2 text-xs font-semibold transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Disparar WhatsApp de Reengajamento</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMAÇÕES ECO GROWTH */}
      {activeTab === 'automations' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  Régua de Automações Inteligentes — Eco Growth
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Configure gatilhos automáticos para fidelizar alunos e aumentar o tempo de permanência (LTV).
                </p>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                4 regras ativas
              </span>
            </div>

            <div className="space-y-4">
              {automations.map((rule) => (
                <div
                  key={rule.id}
                  className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{rule.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{rule.triggerDescription}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-[11px] font-mono text-slate-400">
                        {rule.matchedStudentsCount} disparos hoje
                      </span>
                      <button
                        onClick={() => onToggleAutomation(rule.id)}
                        className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                          rule.active ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            rule.active ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Template Preview */}
                  <div className="rounded-lg bg-slate-950 p-3 border border-slate-850 text-xs text-slate-300 font-mono">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      Template de Mensagem:
                    </span>
                    {rule.messageTemplate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WHITE-LABEL & PERSONALIZAÇÃO DA ACADEMIA */}
      {activeTab === 'whitelabel' && (
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 shadow-xl space-y-6">
          <div>
            <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-2">
              Comercial White-Label Multi-Tenant
            </span>
            <h3 className="text-xl font-bold text-white font-sans">
              Personalização da Marca da Academia
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Altere as informações, cores e planos. Todas as mudanças refletem instantaneamente no Site Público e no Portal do Aluno.
            </p>
          </div>

          <form onSubmit={handleSaveWhiteLabel} className="space-y-6">
            {/* 1. Cores & Identidade Visual */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Paleta de Cor da Academia
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = localTheme.primaryColor === preset.primary;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setLocalTheme({
                          ...localTheme,
                          primaryColor: preset.primary,
                          primaryHover: preset.hover,
                          accentColor: preset.accent,
                        });
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-white bg-slate-800/80 shadow-lg'
                          : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/50'
                      }`}
                    >
                      <div
                        className="w-full h-4 rounded-md mb-2 shadow-inner"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span className="block text-[11px] font-bold text-white">{preset.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dados da Academia */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome da Academia
                </label>
                <input
                  type="text"
                  value={localTheme.name}
                  onChange={(e) => setLocalTheme({ ...localTheme, name: e.target.value })}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white font-bold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Slogan / Frase de Impacto
                </label>
                <input
                  type="text"
                  value={localTheme.slogan}
                  onChange={(e) => setLocalTheme({ ...localTheme, slogan: e.target.value })}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp Oficial (com DDD)
                </label>
                <input
                  type="text"
                  value={localTheme.whatsappNumber}
                  onChange={(e) => setLocalTheme({ ...localTheme, whatsappNumber: e.target.value })}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Endereço Completo
                </label>
                <input
                  type="text"
                  value={localTheme.address}
                  onChange={(e) => setLocalTheme({ ...localTheme, address: e.target.value })}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Horário (Segunda a Sexta)
                </label>
                <input
                  type="text"
                  value={localTheme.openingHoursWeekday}
                  onChange={(e) => setLocalTheme({ ...localTheme, openingHoursWeekday: e.target.value })}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Horário (Sábados e Domingos)
                </label>
                <input
                  type="text"
                  value={localTheme.openingHoursWeekend}
                  onChange={(e) => setLocalTheme({ ...localTheme, openingHoursWeekend: e.target.value })}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Valores dos Planos */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Preços dos Planos (Exibidos no Site)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {localPlans.map((plan, idx) => (
                  <div key={plan.id} className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-2">
                    <span className="text-xs font-bold text-white block">{plan.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">R$</span>
                      <input
                        type="number"
                        step="1"
                        value={plan.priceMonth}
                        onChange={(e) => {
                          const updated = [...localPlans];
                          updated[idx] = { ...updated[idx], priceMonth: parseFloat(e.target.value) || 0 };
                          setLocalPlans(updated);
                        }}
                        className="w-full rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs text-white font-mono font-bold focus:border-emerald-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{plan.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 flex items-center justify-between">
              {saveThemeFeedback ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Personalização salva e aplicada com sucesso!</span>
                </div>
              ) : (
                <span className="text-xs text-slate-500">
                  Pronto para demonstrar para a nova academia compradora.
                </span>
              )}

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 transition-all shadow-lg shadow-emerald-950/50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Salvar Personalização White-Label</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Enviar Mensagem de Reengajamento (WhatsApp) */}
      {targetStudentForMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#111815] border border-emerald-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Disparo de Reengajamento WhatsApp
                </span>
                <h3 className="text-lg font-bold text-white">
                  Contatar {targetStudentForMessage.name}
                </h3>
              </div>
              <button
                onClick={() => setTargetStudentForMessage(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-3 text-xs text-emerald-300">
              📱 Telefone do aluno: <strong className="font-mono">{targetStudentForMessage.phone}</strong> • Ausente há {targetStudentForMessage.lastActiveDaysAgo} dias
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Texto formatado para envio:
              </label>
              <textarea
                rows={5}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                {copiedMessageFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Texto Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Texto</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/55${targetStudentForMessage.phone.replace(/\D/g, '')}?text=${encodeURIComponent(customMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-colors shadow-lg shadow-emerald-950/40"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir WhatsApp Web</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

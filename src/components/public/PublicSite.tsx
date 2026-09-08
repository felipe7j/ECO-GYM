import React, { useState } from 'react';
import {
  Dumbbell,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Users,
  Flame,
  Zap,
  Sparkles,
  Award,
  HelpCircle,
  Heart,
  ChevronRight,
  X,
} from 'lucide-react';
import { GymTheme, GymPlan, Modality, Teacher, TrialBooking } from '../../types';
import { INITIAL_FAQ } from '../../data/mockData';
import { soundFx } from '../../utils/audio';

interface PublicSiteProps {
  gymTheme: GymTheme;
  plans: GymPlan[];
  modalities: Modality[];
  teachers: Teacher[];
  onNavigateToStudent: () => void;
  onBookTrial: (booking: TrialBooking) => void;
}

export const PublicSite: React.FC<PublicSiteProps> = ({
  gymTheme,
  plans,
  modalities,
  teachers,
  onNavigateToStudent,
  onBookTrial,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [selectedModalityForTrial, setSelectedModalityForTrial] = useState(modalities[0]?.name || 'Musculação Biomecânica');

  // Trial form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredPeriod, setPreferredPeriod] = useState('Manhã (07:00 às 11:00)');
  const [trialSuccessFeedback, setTrialSuccessFeedback] = useState(false);

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newBooking: TrialBooking = {
      id: `lead_${Date.now()}`,
      fullName,
      phone,
      email,
      preferredModality: selectedModalityForTrial,
      preferredPeriod,
      createdAt: 'Agora mesmo',
      status: 'pendente',
    };

    onBookTrial(newBooking);
    soundFx.playSuccessFanfare();
    setTrialSuccessFeedback(true);
  };

  const closeTrialModal = () => {
    setShowTrialModal(false);
    setTrialSuccessFeedback(false);
    setFullName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#090D0B] text-slate-100 selection:bg-emerald-500 selection:text-black font-sans">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-emerald-950/40 border-b border-emerald-500/20 py-2 px-4 text-center text-xs font-medium text-emerald-300">
        <span>🔥 Condição Especial: Matrícula com 100% de isenção nesta semana • </span>
        <button
          onClick={() => setShowTrialModal(true)}
          className="underline font-bold text-white hover:text-emerald-300 ml-1"
        >
          Experimente sua primeira aula gratuita
        </button>
      </div>

      {/* 2. PUBLIC SITE NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#090D0B]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Gym Brand Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: gymTheme.primaryColor }}
            >
              <Dumbbell className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white font-sans block leading-none">
                {gymTheme.name}
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Unidade {gymTheme.cityState.split(' — ')[0]}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#home" className="hover:text-emerald-400 transition-colors">Home</a>
            <a href="#sobre" className="hover:text-emerald-400 transition-colors">Sobre</a>
            <a href="#modalidades" className="hover:text-emerald-400 transition-colors">Modalidades</a>
            <a href="#planos" className="hover:text-emerald-400 transition-colors">Planos</a>
            <a href="#horarios" className="hover:text-emerald-400 transition-colors">Horários</a>
            <a href="#fotos" className="hover:text-emerald-400 transition-colors">Fotos</a>
            <a href="#localizacao" className="hover:text-emerald-400 transition-colors">Localização</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </nav>

          {/* Actions: Student Area & Strong CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToStudent}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <span>Área do Aluno</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>

            {/* THE VERY STRONG CTA REQUESTED BY USER */}
            <button
              onClick={() => setShowTrialModal(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg shadow-emerald-950/60 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Experimente sua primeira aula</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400">
                <Flame className="w-3.5 h-3.5" />
                <span>Alta Performance • Treinamento Inteligente</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Transforme seu corpo com{' '}
                <span className="text-emerald-400 underline decoration-emerald-500/40">
                  biomecânica avançada
                </span>{' '}
                e tecnologia.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {gymTheme.slogan}. Na {gymTheme.name}, cada série conta com acompanhamento profissional qualificado e aplicativo digital individualizado.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setShowTrialModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-base px-8 py-4 shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 text-black" />
                  <span>Experimente sua primeira aula</span>
                </button>

                <a
                  href={`https://wa.me/${gymTheme.whatsappNumber}?text=Olá! Gostaria de saber mais sobre os planos da ${gymTheme.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-sm px-6 py-4 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">380+</span>
                  <span className="block text-[11px] text-slate-400">Alunos Ativos</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono flex items-center justify-center lg:justify-start gap-1">
                    4.9 <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  </span>
                  <span className="block text-[11px] text-slate-400">Avaliação Média</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">100%</span>
                  <span className="block text-[11px] text-slate-400">Climatizado</span>
                </div>
              </div>
            </div>

            {/* Right Athletic Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-950/60 group">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
                  alt="Instalações modernas da academia"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D0B] via-transparent to-transparent opacity-80" />

                {/* Floating Student App Preview Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#111815]/90 backdrop-blur-md border border-emerald-500/40 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400">App Incluso no Plano</span>
                      <span className="text-xs font-bold text-white block">Treino A • Peito + Tríceps</span>
                    </div>
                  </div>
                  <button
                    onClick={onNavigateToStudent}
                    className="text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Ver App
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOBRE NÓS */}
      <section id="sobre" className="py-20 bg-[#0d130f] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Nossa Estrutura & Filosofia
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-sans">
              Mais que uma academia, um ecossistema de saúde e evolução contínua.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Combinamos maquinário importado com biomecânica de precisão, equipe técnica credenciada e tecnologia digital exclusiva para que cada minuto do seu treino gere o máximo de resultado com segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#111815] border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Equipamentos Biomecânicos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Máquinas articuladas que respeitam a curvatura fisiológica articular, reduzindo sobrecargas nas articulações e isolando os grupos musculares alvo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111815] border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Professores no Salão</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supervisão atenta e contínua. Nossa equipe corrige postura, ajusta alturas de bancos e orienta sobrecarga progressiva em todos os horários.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111815] border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">App ECO GYM Integrado</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sua ficha de treino na palma da mão com cronômetro de descanso, histórico de cargas, pesagens e vídeos demonstrativos em alta definição.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MODALIDADES (Musculação, Funcional, Cross training, Personal trainer) */}
      <section id="modalidades" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Diversidade de Treinos
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-sans mt-1">
                Modalidades para Cada Objetivo
              </h2>
            </div>
            <button
              onClick={() => setShowTrialModal(true)}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
            >
              <span>Agendar aula em qualquer modalidade</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((mod) => (
              <div
                key={mod.id}
                className="rounded-2xl bg-[#111815] border border-slate-800 overflow-hidden hover:border-emerald-500/40 transition-all group shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={mod.imageUrl}
                      alt={mod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      {mod.highlightTag}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {mod.category}
                    </span>
                    <h3 className="text-lg font-bold text-white font-sans">{mod.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {mod.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                      <span>⏱ {mod.duration}</span>
                      <span>•</span>
                      <span>⚡ Intensidade {mod.intensity}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setSelectedModalityForTrial(mod.name);
                      setShowTrialModal(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-800"
                  >
                    <span>Experimentar Esta Aula</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROFESSORES / EQUIPE TÉCNICA */}
      <section className="py-20 bg-[#0d130f] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Corpo Docente Especializado
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-sans mt-1">
              Professores Credenciados & Dedicados
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Todos os nossos treinadores possuem registro ativo no CREF e especializações nas melhores instituições de educação física e biomecânica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="rounded-2xl bg-[#111815] border border-slate-800 p-6 flex flex-col items-center text-center hover:border-emerald-500/30 transition-all"
              >
                <img
                  src={teacher.photoUrl}
                  alt={teacher.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500/40 mb-4 shadow-lg shadow-emerald-950/50"
                />
                <h3 className="text-base font-bold text-white">{teacher.name}</h3>
                <span className="text-xs text-emerald-400 font-medium mt-0.5">{teacher.role}</span>
                <span className="text-[10px] font-mono text-slate-400 mt-1">{teacher.cref}</span>

                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {teacher.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PLANOS E PREÇOS */}
      <section id="planos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Invista na sua Saúde
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-sans mt-1">
              Planos Transparentes Sem Taxas Ocultas
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Escolha a modalidade que melhor se adapta à sua rotina. Cancele quando quiser ou garanta descontos anuais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#16221b] to-[#101914] border-2 border-emerald-500 shadow-2xl shadow-emerald-950/60 lg:-translate-y-2'
                    : 'bg-[#111815] border border-slate-800'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-400 text-black text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
                    Mais Escolhido
                  </span>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-white font-sans">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-sm font-semibold text-slate-400">R$</span>
                      <span className="text-4xl font-black text-white font-mono">
                        {plan.priceMonth.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-bold block mt-1">
                      Matrícula Grátis • Acesso ao App ECO GYM
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-4 border-t border-slate-800/80">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => setShowTrialModal(true)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                    }`}
                  >
                    <span>Escolher Este Plano</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GRADE DE HORÁRIOS */}
      <section id="horarios" className="py-20 bg-[#0d130f] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Ampla Flexibilidade
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-sans">
                Horários que se Adaptam à sua Vida
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aberta de manhã cedinho até a noite, inclusive aos fins de semana e feriados. Sem restrição de horário nos planos livres.
              </p>

              <div className="space-y-3 pt-2">
                <div className="rounded-xl bg-[#111815] border border-slate-800 p-4">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Segunda a Sexta</span>
                  <span className="text-base font-bold text-white font-mono">{gymTheme.openingHoursWeekday}</span>
                </div>
                <div className="rounded-xl bg-[#111815] border border-slate-800 p-4">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Finais de Semana & Feriados</span>
                  <span className="text-base font-bold text-white font-mono">{gymTheme.openingHoursWeekend}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#111815] border border-slate-800 p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Grade de Aulas Coletivas & WODs
                </h3>
                <div className="divide-y divide-slate-800 text-xs">
                  {[
                    { time: '07:00', class: 'Cross Training Eco (WOD Matinal)', coach: 'Prof. Thiago', room: 'Arena Cross' },
                    { time: '09:00', class: 'Treinamento Funcional HIIT', coach: 'Profa. Juliana', room: 'Espaço Funcional' },
                    { time: '12:30', class: 'Express Core & Abdômen', coach: 'Prof. Carlos', room: 'Sala 01' },
                    { time: '18:00', class: 'Cross Training Eco (WOD Noturno)', coach: 'Prof. Thiago', room: 'Arena Cross' },
                    { time: '19:30', class: 'Treinamento Funcional Circuit', coach: 'Profa. Juliana', room: 'Espaço Funcional' },
                  ].map((row, i) => (
                    <div key={i} className="py-3 flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-400 w-16">{row.time}</span>
                      <div className="flex-1 px-4">
                        <span className="font-bold text-white block">{row.class}</span>
                        <span className="text-[10px] text-slate-400">{row.coach} • {row.room}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedModalityForTrial(row.class);
                          setShowTrialModal(true);
                        }}
                        className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1 rounded-lg transition-colors"
                      >
                        Reservar vaga
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. GALERIA DE FOTOS */}
      <section id="fotos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Conheça as Instalações
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-sans mt-1">
              Ambientes Planejados para o seu Bem-Estar
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Área de Musculação', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
              { title: 'Espaço Funcional & Pesos Livres', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80' },
              { title: 'Arena de Cross Training', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
              { title: 'Recepção & Lounge Eco', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80' },
            ].map((pic, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden group h-64 border border-slate-800">
                <img
                  src={pic.img}
                  alt={pic.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-white">{pic.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-20 bg-[#0d130f] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Fácil Acesso
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-sans">
                Venha nos Conhecer Pessoalmente
              </h2>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111815] border border-slate-800">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="block text-white font-semibold">Endereço:</strong>
                    <span>{gymTheme.address}</span>
                    <span className="block text-slate-400">{gymTheme.cityState}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111815] border border-slate-800">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="block text-white font-semibold">Telefone & WhatsApp:</strong>
                    <span>{gymTheme.phoneNumber}</span>
                    <span className="block text-emerald-400 font-mono">WhatsApp: (11) 99876-5432</span>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${gymTheme.whatsappNumber}?text=Olá! Gostaria de agendar uma visita na ${gymTheme.name}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 transition-colors shadow-lg shadow-emerald-950/50"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar com a Recepção no WhatsApp</span>
              </a>
            </div>

            <div className="lg:col-span-7">
              {/* Simulated stylized interactive Google Maps iframe/embed */}
              <div className="rounded-3xl overflow-hidden border border-slate-800 bg-[#111815] p-2 shadow-2xl relative">
                <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-slate-900 via-[#111815] to-emerald-950/30 flex flex-col items-center justify-center text-center p-6 relative">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 shadow-lg">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="text-base font-bold text-white">{gymTheme.name}</h4>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    {gymTheme.address} — Estacionamento conveniado gratuito no local (2 horas).
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700 transition-colors"
                  >
                    Abrir Trajeto no Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-sans mt-1">
              Perguntas e Respostas
            </h2>
          </div>

          <div className="space-y-3">
            {INITIAL_FAQ.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#111815] border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-emerald-400' : 'text-slate-500'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. BOTTOM HERO CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-950/40 via-[#111815] to-emerald-950/40 border-t border-emerald-500/20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-black text-white font-sans">
            Pronto para dar o primeiro passo?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Agende hoje mesmo sua sessão experimental sem compromisso e venha sentir a diferença do treino biomecânico.
          </p>
          <button
            onClick={() => setShowTrialModal(true)}
            className="mt-6 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Experimente sua primeira aula
          </button>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-[#070a08] border-t border-slate-900 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-white font-bold text-sm block">{gymTheme.name}</span>
            <span>{gymTheme.address} • {gymTheme.cityState}</span>
          </div>
          <div className="text-center sm:text-right">
            <span>Powered by <strong>ECO GYM™ Intelligence</strong> • Sistema Digital para Academias</span>
            <span className="block text-[10px] text-slate-600 mt-0.5">© 2026 Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>

      {/* MODAL: EXPERIMENTE SUA PRIMEIRA AULA (STRONG CTA) */}
      {showTrialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#111815] border border-emerald-500/30 p-6 shadow-2xl relative">
            <button
              onClick={closeTrialModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {trialSuccessFeedback ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-sans">
                  Aula Experimental Agendada!
                </h3>
                <p className="text-xs text-slate-300">
                  Parabéns, {fullName.split(' ')[0]}! Recebemos sua solicitação para a modalidade <strong>{selectedModalityForTrial}</strong> no período <strong>{preferredPeriod}</strong>.
                </p>
                <div className="pt-3">
                  <a
                    href={`https://wa.me/${gymTheme.whatsappNumber}?text=Olá! Acabei de agendar minha aula experimental de ${encodeURIComponent(selectedModalityForTrial)} pelo site. Meu nome é ${encodeURIComponent(fullName)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 transition-colors shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirmar Presença no WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTrialSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Primeiro Treino Gratuito
                  </span>
                  <h3 className="text-xl font-bold text-white font-sans mt-0.5">
                    Experimente sua primeira aula
                  </h3>
                  <p className="text-xs text-slate-400">
                    Preencha seus dados para receber o passe VIP na recepção da {gymTheme.name}.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lucas Silveira"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp para Contato
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Modalidade Desejada
                  </label>
                  <select
                    value={selectedModalityForTrial}
                    onChange={(e) => setSelectedModalityForTrial(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {modalities.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Período Preferido
                  </label>
                  <select
                    value={preferredPeriod}
                    onChange={(e) => setPreferredPeriod(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Manhã (07:00 às 11:00)">Manhã (07:00 às 11:00)</option>
                    <option value="Almoço (12:00 às 14:00)">Almoço (12:00 às 14:00)</option>
                    <option value="Tarde (15:00 às 18:00)">Tarde (15:00 às 18:00)</option>
                    <option value="Noite (18:30 às 22:00)">Noite (18:30 às 22:00)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Confirmar Agendamento Gratuito</span>
                  </button>
                  <span className="block text-center text-[10px] text-slate-500 mt-2">
                    🔒 Seus dados são protegidos. Sem spam.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${gymTheme.whatsappNumber}?text=Olá! Acessei o site da ${gymTheme.name} e gostaria de informações sobre matrículas.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all"
        title="Falar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-black text-emerald-500" />
      </a>
    </div>
  );
};

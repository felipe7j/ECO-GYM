export type UserRole = 'public' | 'student' | 'trainer' | 'admin' | 'white_label';

export interface GymTheme {
  primaryColor: string; // hex code
  primaryHover: string;
  accentColor: string;
  name: string;
  shortName: string;
  slogan: string;
  logoText: string;
  logoIcon: string;
  address: string;
  cityState: string;
  whatsappNumber: string;
  phoneNumber: string;
  instagram: string;
  openingHoursWeekday: string;
  openingHoursWeekend: string;
}

export interface GymPlan {
  id: string;
  name: string;
  priceMonth: number;
  period: string;
  popular?: boolean;
  features: string[];
  enrollmentFee: number;
}

export interface Modality {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  intensity: 'Leve' | 'Moderada' | 'Intensa' | 'Alta';
  instructor: string;
  highlightTag: string;
  imageUrl: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  cref: string;
  specialties: string[];
  photoUrl: string;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  loadKg: number;
  restSeconds: number;
  notes?: string;
  demoTips: string[];
  completedSets: boolean[];
}

export interface Workout {
  id: string;
  studentId: string;
  letter: 'A' | 'B' | 'C' | 'D';
  title: string;
  focus: string;
  lastUpdated: string;
  exercises: Exercise[];
  observations?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  planName: string;
  planStatus: 'ativo' | 'vencendo' | 'atrasado';
  joinDate: string;
  goal: string;
  currentWorkoutLetter: 'A' | 'B' | 'C';
  weightKg: number;
  heightCm: number;
  lastActiveDaysAgo: number;
  weeklyTargetDays: number;
  attendedThisWeek: number;
  streakDays: number;
  monthlyAttendanceTotal: number;
  previousMonthAttendance: number;
  frequencyStatus: 'otima' | 'regular' | 'baixa' | 'risco_evasao';
  notes: string;
}

export interface WeightRecord {
  id: string;
  date: string;
  weightKg: number;
  notes?: string;
}

export interface LoadRecord {
  id: string;
  exerciseName: string;
  date: string;
  loadKg: number;
}

export interface ScheduleDay {
  dayOfWeek: string;
  dayShort: string;
  dateLabel: string;
  time: string;
  workoutName: string;
  status: 'completed' | 'scheduled' | 'rest' | 'missed';
}

export interface AutomationRule {
  id: string;
  title: string;
  triggerDescription: string;
  channel: 'WhatsApp' | 'Push' | 'Email';
  active: boolean;
  messageTemplate: string;
  matchedStudentsCount: number;
  lastRunTime: string;
}

export interface TrialBooking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  preferredModality: string;
  preferredPeriod: string;
  createdAt: string;
  status: 'pendente' | 'contatado' | 'convertido';
}

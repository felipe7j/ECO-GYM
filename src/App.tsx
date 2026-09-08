import React, { useState, useEffect } from 'react';
import { UserRole, GymTheme, GymPlan, Student, Workout, AutomationRule, TrialBooking } from './types';
import {
  INITIAL_GYM_THEME,
  INITIAL_PLANS,
  INITIAL_MODALITIES,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_WORKOUTS,
  INITIAL_AUTOMATIONS,
} from './data/mockData';
import { Header } from './components/common/Header';
import { PublicSite } from './components/public/PublicSite';
import { StudentPortal } from './components/student/StudentPortal';
import { TrainerPortal } from './components/trainer/TrainerPortal';
import { AdminPortal } from './components/admin/AdminPortal';

export default function App() {
  // Navigation Role State: default to 'public' or 'student'
  const [currentRole, setCurrentRole] = useState<UserRole>('public');

  // Gym White-label Theme State
  const [gymTheme, setGymTheme] = useState<GymTheme>(() => {
    try {
      const saved = localStorage.getItem('ecogym_theme');
      return saved ? JSON.parse(saved) : INITIAL_GYM_THEME;
    } catch {
      return INITIAL_GYM_THEME;
    }
  });

  // Plans State
  const [plans, setPlans] = useState<GymPlan[]>(() => {
    try {
      const saved = localStorage.getItem('ecogym_plans');
      return saved ? JSON.parse(saved) : INITIAL_PLANS;
    } catch {
      return INITIAL_PLANS;
    }
  });

  // Students State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std_joao');

  // Workouts State (persisted so trainer edits are reflected in real time for student)
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      const saved = localStorage.getItem('ecogym_workouts');
      return saved ? JSON.parse(saved) : INITIAL_WORKOUTS;
    } catch {
      return INITIAL_WORKOUTS;
    }
  });

  // Automations State
  const [automations, setAutomations] = useState<AutomationRule[]>(INITIAL_AUTOMATIONS);

  // Trial Bookings Leads from public site
  const [trialBookings, setTrialBookings] = useState<TrialBooking[]>([]);

  // Persist theme changes
  useEffect(() => {
    try {
      localStorage.setItem('ecogym_theme', JSON.stringify(gymTheme));
      // Update primary color in document CSS variable or title
      document.title = `${gymTheme.name} — ECO GYM`;
    } catch {
      // Safe fallback
    }
  }, [gymTheme]);

  // Persist workouts
  useEffect(() => {
    try {
      localStorage.setItem('ecogym_workouts', JSON.stringify(workouts));
    } catch {
      // Safe fallback
    }
  }, [workouts]);

  // Persist plans
  useEffect(() => {
    try {
      localStorage.setItem('ecogym_plans', JSON.stringify(plans));
    } catch {
      // Safe fallback
    }
  }, [plans]);

  // Handler for Trainer publishing a new or edited workout
  const handleUpdateWorkout = (updatedWorkout: Workout) => {
    setWorkouts((prev) => {
      const index = prev.findIndex(
        (w) => w.studentId === updatedWorkout.studentId && w.letter === updatedWorkout.letter
      );
      if (index >= 0) {
        const next = [...prev];
        next[index] = updatedWorkout;
        return next;
      }
      return [...prev, updatedWorkout];
    });

    // Also update student's last updated note
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedWorkout.studentId ? { ...s, lastActiveDaysAgo: 0 } : s))
    );
  };

  // Handler for public visitor booking a trial class
  const handleBookTrial = (booking: TrialBooking) => {
    setTrialBookings((prev) => [booking, ...prev]);
  };

  // Handler to toggle an automation rule
  const handleToggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  // Current active student for student portal
  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  return (
    <div className="min-h-screen bg-[#090D0B] text-slate-100 flex flex-col font-sans">
      {/* Top Header with Eco Gym Logo, Demo Badge and View Switcher */}
      <Header
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        gymTheme={gymTheme}
      />

      {/* Main Role Views */}
      <main className="flex-1">
        {/* 1. PUBLIC GYM SITE */}
        {currentRole === 'public' && (
          <PublicSite
            gymTheme={gymTheme}
            plans={plans}
            modalities={INITIAL_MODALITIES}
            teachers={INITIAL_TEACHERS}
            onNavigateToStudent={() => setCurrentRole('student')}
            onBookTrial={handleBookTrial}
          />
        )}

        {/* 2. STUDENT PORTAL */}
        {currentRole === 'student' && (
          <StudentPortal
            currentStudent={currentStudent}
            workouts={workouts.filter((w) => w.studentId === currentStudent.id || !w.studentId)}
            studentsList={students}
            onSelectStudent={(student) => setSelectedStudentId(student.id)}
          />
        )}

        {/* 3. TRAINER PORTAL */}
        {currentRole === 'trainer' && (
          <TrainerPortal
            students={students}
            workouts={workouts}
            onUpdateWorkout={handleUpdateWorkout}
          />
        )}

        {/* 4. ADMIN & GESTÃO DA ACADEMIA */}
        {(currentRole === 'admin' || currentRole === 'white_label') && (
          <AdminPortal
            students={students}
            gymTheme={gymTheme}
            onUpdateGymTheme={setGymTheme}
            plans={plans}
            onUpdatePlans={setPlans}
            automations={automations}
            onToggleAutomation={handleToggleAutomation}
            trialBookings={trialBookings}
          />
        )}
      </main>
    </div>
  );
}

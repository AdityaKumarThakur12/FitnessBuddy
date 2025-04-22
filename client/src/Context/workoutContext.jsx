import { createContext, useContext, useState, useEffect } from 'react'

// Create the workout context
const WorkoutContext = createContext()

// Custom hook for easy workout context access
export const useWorkout = () => {
  return useContext(WorkoutContext)
}

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([])
  const [userProgress, setUserProgress] = useState({
    completedWorkouts: 0,
    totalMinutes: 0,
    streakDays: 0,
    lastWorkout: null
  })
  const [loading, setLoading] = useState(true)

  // Load workouts and progress from localStorage on initial mount
  useEffect(() => {
    const storedWorkouts = localStorage.getItem('fitpulse_workouts')
    const storedProgress = localStorage.getItem('fitpulse_progress')
    
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts))
    } else {
      // Set default workouts if none exist
      setWorkouts(defaultWorkouts)
      localStorage.setItem('fitpulse_workouts', JSON.stringify(defaultWorkouts))
    }
    
    if (storedProgress) {
      setUserProgress(JSON.parse(storedProgress))
    }
    
    setLoading(false)
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('fitpulse_progress', JSON.stringify(userProgress))
    }
  }, [userProgress, loading])

  // Complete a workout and update progress
  const completeWorkout = (workoutId, duration) => {
    // Update the workout history
    const workout = workouts.find(w => w.id === workoutId)
    if (!workout) return false
    
    // Update user progress
    const now = new Date()
    const lastWorkoutDate = userProgress.lastWorkout 
      ? new Date(userProgress.lastWorkout) 
      : null
    
    // Calculate streak (if workout was done yesterday, maintain streak, otherwise reset)
    let newStreak = userProgress.streakDays
    if (lastWorkoutDate) {
      const oneDayInMs = 24 * 60 * 60 * 1000
      const dayDifference = Math.floor((now - lastWorkoutDate) / oneDayInMs)
      
      if (dayDifference === 1) {
        // Consecutive day, increase streak
        newStreak += 1
      } else if (dayDifference > 1) {
        // Streak broken
        newStreak = 1
      }
    } else {
      // First workout
      newStreak = 1
    }
    
    setUserProgress(prev => ({
      completedWorkouts: prev.completedWorkouts + 1,
      totalMinutes: prev.totalMinutes + (duration || workout.estimatedDuration),
      streakDays: newStreak,
      lastWorkout: now.toISOString()
    }))
    
    return true
  }

  // Add a custom workout
  const addWorkout = (workout) => {
    const newWorkout = {
      id: 'workout-' + Date.now(),
      ...workout,
      createdAt: new Date().toISOString()
    }
    
    setWorkouts(prev => {
      const updated = [...prev, newWorkout]
      localStorage.setItem('fitpulse_workouts', JSON.stringify(updated))
      return updated
    })
    
    return newWorkout
  }

  const value = {
    workouts,
    userProgress,
    completeWorkout,
    addWorkout,
    loading
  }

  return (
    <WorkoutContext.Provider value={value}>
      {!loading && children}
    </WorkoutContext.Provider>
  )
}

// Default workout data
const defaultWorkouts = [
  {
    id: 'workout-1',
    name: 'Full Body Burn',
    type: 'Strength',
    level: 'Beginner',
    estimatedDuration: 30,
    description: 'A complete full-body workout targeting all major muscle groups.',
    exercises: [
      { 
        id: 'ex-1', 
        name: 'Push-ups', 
        sets: 3, 
        reps: 10, 
        restTime: 60,
        instructions: 'Start in a plank position with hands slightly wider than shoulders. Lower your body until chest nearly touches the floor, then push back up.',
        muscleGroup: 'Chest',
        videoUrl: 'https://example.com/pushup-video'
      },
      { 
        id: 'ex-2', 
        name: 'Squats', 
        sets: 3, 
        reps: 15, 
        restTime: 60,
        instructions: 'Stand with feet shoulder-width apart. Lower your body by bending knees and pushing hips back as if sitting in a chair.',
        muscleGroup: 'Legs',
        videoUrl: 'https://example.com/squat-video'
      },
      { 
        id: 'ex-3', 
        name: 'Plank', 
        sets: 3, 
        duration: 30, 
        restTime: 45,
        instructions: 'Start in a push-up position but with forearms on the ground. Hold the position keeping your body in a straight line.',
        muscleGroup: 'Core',
        videoUrl: 'https://example.com/plank-video'
      },
      { 
        id: 'ex-4', 
        name: 'Lunges', 
        sets: 3, 
        reps: 10, 
        restTime: 60,
        instructions: 'Step forward with one leg and lower your body until both knees are bent at 90 degrees. Return and repeat with the other leg.',
        muscleGroup: 'Legs',
        videoUrl: 'https://example.com/lunge-video'
      },
      { 
        id: 'ex-5', 
        name: 'Dumbbell Rows', 
        sets: 3, 
        reps: 12, 
        restTime: 60,
        instructions: 'Bend at hips with back flat, holding a dumbbell in one hand. Pull the weight up to your rib cage, then lower it back down.',
        muscleGroup: 'Back',
        videoUrl: 'https://example.com/row-video'
      }
    ]
  },
  {
    id: 'workout-2',
    name: 'HIIT Cardio Challenge',
    type: 'Cardio',
    level: 'Intermediate',
    estimatedDuration: 20,
    description: 'High-intensity interval training to boost your cardio and burn calories fast.',
    exercises: [
      { 
        id: 'ex-6', 
        name: 'Jumping Jacks', 
        duration: 40, 
        restTime: 20,
        instructions: 'Start standing with legs together and arms at sides. Jump to a position with legs apart and arms overhead, then return to starting position.',
        muscleGroup: 'Full Body',
        videoUrl: 'https://example.com/jumpingjacks-video'
      },
      { 
        id: 'ex-7', 
        name: 'Mountain Climbers', 
        duration: 40, 
        restTime: 20,
        instructions: 'Start in a plank position. Alternate bringing each knee toward your chest in a running motion.',
        muscleGroup: 'Core',
        videoUrl: 'https://example.com/mountainclimbers-video'
      },
      { 
        id: 'ex-8', 
        name: 'Burpees', 
        duration: 40, 
        restTime: 20,
        instructions: 'Start standing, drop to a squat position, kick feet back to a plank, return to squat, then jump up reaching overhead.',
        muscleGroup: 'Full Body',
        videoUrl: 'https://example.com/burpees-video'
      },
      { 
        id: 'ex-9', 
        name: 'High Knees', 
        duration: 40, 
        restTime: 20,
        instructions: 'Run in place, bringing knees up to hip level with each step. Keep a quick pace.',
        muscleGroup: 'Legs',
        videoUrl: 'https://example.com/highknees-video'
      }
    ]
  },
  {
    id: 'workout-3',
    name: 'Core Crusher',
    type: 'Core',
    level: 'Beginner',
    estimatedDuration: 15,
    description: 'Focus on strengthening your core with this targeted ab workout.',
    exercises: [
      { 
        id: 'ex-10', 
        name: 'Crunches', 
        sets: 3, 
        reps: 15, 
        restTime: 45,
        instructions: 'Lie on your back with knees bent and feet flat. Place hands behind head and lift shoulders off the ground using your abs.',
        muscleGroup: 'Abs',
        videoUrl: 'https://example.com/crunches-video'
      },
      { 
        id: 'ex-11', 
        name: 'Russian Twists', 
        sets: 3, 
        reps: 20, 
        restTime: 45,
        instructions: 'Sit with knees bent and feet elevated. Lean back slightly and twist torso from side to side.',
        muscleGroup: 'Obliques',
        videoUrl: 'https://example.com/russiantwist-video'
      },
      { 
        id: 'ex-12', 
        name: 'Leg Raises', 
        sets: 3, 
        reps: 12, 
        restTime: 45,
        instructions: 'Lie on your back with legs straight. Raise legs up to 90 degrees, then lower them without touching the floor.',
        muscleGroup: 'Lower Abs',
        videoUrl: 'https://example.com/legraises-video'
      }
    ]
  }
]
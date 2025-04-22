import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiActivity } from 'react-icons/fi'

const WorkoutCard = ({ workout }) => {
  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-success-100 text-success-800',
      'Intermediate': 'bg-warning-100 text-warning-800',
      'Advanced': 'bg-error-100 text-error-800'
    }
    return colors[level] || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Strength':
        return <FiActivity className="mr-1" />
      case 'Cardio':
        return <FiActivity className="mr-1" />
      case 'Core':
        return <FiActivity className="mr-1" />
      default:
        return <FiActivity className="mr-1" />
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{workout.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{workout.description}</p>
        
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs bg-sky-100 px-2 py-1 rounded-full flex items-center ${getLevelColor(workout.level)}`}>
            {workout.level}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center">
            {getTypeIcon(workout.type)}
            {workout.type}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center">
            <FiClock className="mr-1" />
            {workout.estimatedDuration} min
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {workout.exercises.length} exercises
          </span>
          <Link 
            to={`/workouts/${workout.id}`}
            className="text-sky-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
          >
            Start Workout →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default WorkoutCard
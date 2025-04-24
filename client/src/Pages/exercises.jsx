import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import axios from "axios"
import { FiSearch, FiFilter, FiInfo, FiX } from 'react-icons/fi'

const Exercises = () => {
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('')
    const [exercises, setExercises] = useState([]) // ← dynamic data from backend
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/exercise/') // 🔥 replace with your actual backend URL
                setExercises(response.data)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setError('Failed to load exercises')
                setLoading(false)
            }
        }

        fetchExercises()
    }, [])

    const muscleGroups = [
        'All',
        'Chest',
        'Back',
        'Legs',
        'Shoulders',
        'Arms',
        'Core',
        'Full Body'
    ]

    const filteredExercises = exercises.filter(exercise => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = filter === '' || filter === 'All' || exercise.muscleGroup === filter

        return matchesSearch && matchesFilter
    })

    return (
        <div className='px-24 py-5 dark:bg-gray-900' >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Exercise Guide</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
                Learn proper form and technique for various exercises
            </p>

            {/* Search and filter */}
            <div className="flex flex-col text-white sm:flex-row gap-4 mb-8 w-full">
                {/* Search Input */}
                <div className="relative w-full sm:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                        placeholder="Search exercises..."
                    />
                    {searchTerm && (
                        <button
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setSearchTerm('')}
                        >
                            <FiX className="text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Muscle Group Filters */}
                <div className="w-full sm:w-1/2 flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-x-auto py-2 px-3 space-x-2 shadow-sm">
                    <FiFilter className="text-gray-400 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                        {muscleGroups.map(group => (
                            <button
                                key={group}
                                onClick={() => setFilter(group === 'All' ? '' : group)}
                                className={`px-3 py-1 text-sm rounded-full transition whitespace-nowrap ${(group === 'All' && filter === '') || filter === group
                                        ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {group}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* Exercise grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((exercise, index) => (
                    <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 h-full"
                        onClick={() => setSelectedExercise(exercise)}
                    >
                        <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                            <img
                                src={exercise.image}
                                alt={exercise.name}
                                className="w-full h-full object-cover items-center"
                            />
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{exercise.name}</h3>
                                    <span className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300 px-2 py-0.5 rounded-full">
                                        {exercise.muscleGroup}
                                    </span>
                                </div>
                                <button className="p-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    <FiInfo />
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {exercise.description}
                            </p>
                        </div>
                    </motion.div>

                ))}

                {filteredExercises.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No exercises found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter</p>
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setFilter('')
                            }}
                            className="btn-primary"
                        >
                            Clear search and filters
                        </button>
                    </div>
                )}
            </div>

            {/* Exercise detail modal */}
            {selectedExercise && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="relative">
                            <div className="aspect-w-16 h-68 aspect-h-9 bg-gray-100 dark:bg-gray-700">
                                <img
                                    src={selectedExercise.image}
                                    alt={selectedExercise.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <button
                                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                                onClick={() => setSelectedExercise(null)}
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedExercise.name}</h3>
                                <span className="text-sm bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300 px-3 py-1 rounded-full">
                                    {selectedExercise.muscleGroup}
                                </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                {selectedExercise.description}
                            </p>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How to Perform</h4>
                                <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    {selectedExercise.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Muscles Worked</h5>
                                    <p className="text-gray-900 dark:text-white">{selectedExercise.musclesWorked}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Equipment</h5>
                                    <p className="text-gray-900 dark:text-white">{selectedExercise.equipment}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tips</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    {selectedExercise.tips.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedExercise(null)}
                                    className="btn-secondary"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Exercises
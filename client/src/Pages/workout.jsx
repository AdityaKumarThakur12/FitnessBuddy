import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiActivity, FiFilter } from 'react-icons/fi';
import axios from 'axios';

// WorkoutCard Component
const WorkoutCard = ({ workout }) => {
    const getLevelColor = (level) => {
        const colors = {
            'Beginner': 'bg-green-100 text-green-800',
            'Intermediate': 'bg-yellow-100 text-yellow-800',
            'Advanced': 'bg-red-100 text-red-800'
        }
        return colors[level] || 'bg-gray-100 text-gray-800';
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Strength':
            case 'Cardio':
            case 'Core':
                return <FiActivity className="mr-1" />;
            default:
                return <FiActivity className="mr-1" />;
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
        >
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{workout.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{workout.description}</p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getLevelColor(workout.level)}`}>
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
                        to={`/workouts/${workout._id}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                        Start Workout →
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

// WorkoutsList Component to Fetch and Display Data with Filters
const WorkoutsList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        level: '',
        type: '',
        duration: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Fetch workouts data from the backend
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/workouts');
                setWorkouts(response.data);  // Set the fetched data
            } catch (error) {
                console.error('Error fetching workouts:', error);
            } finally {
                setLoading(false);  // Stop loading when the request is done
            }
        };

        fetchWorkouts();
    }, []);

    // Filter workouts based on selected filters and search
    const filteredWorkouts = workouts.filter((workout) => {
        const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = filters.level ? workout.level === filters.level : true;
        const matchesType = filters.type ? workout.type === filters.type : true;
        const matchesDuration = filters.duration ? workout.estimatedDuration <= filters.duration : true;
        return matchesSearch && matchesLevel && matchesType && matchesDuration;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-gray-900'>
            <div className='p-15 mx-26 '>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Workouts</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Find the perfect workout routine for your fitness goals.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-5 rounded-lg flex items-center justify-center gap-2">
                    {/* Search bar */}
                    <div className="w-5/5">
                        <input
                            type="text"
                            className="w-full p-2 rounded-xl border border-white text-white bg-gray-800"
                            placeholder="Search Workouts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter toggle */}
                    <div
                        className='flex bg-gray-700 text-white items-center gap-2 p-2.5 rounded-xl cursor-pointer'
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FiFilter className="cursor-pointer text-xl text-white" />
                        <h2>Filter</h2>
                    </div>
                </div>

                {/* Additional filters */}
                {showFilters && (
                    <div className="p-5 w-full mb-5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <h1 className="text-white mb-2">Filters</h1>
                        <div className="flex w-full gap-2">
                            <select
                                className="flex-1 p-2 rounded-lg border bg-black text-white"
                                value={filters.level}
                                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                            >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>

                            <select
                                className="flex-1 p-2 rounded-lg border bg-black text-white"
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            >
                                <option value="">Select Type</option>
                                <option value="Strength">Strength</option>
                                <option value="Cardio">Cardio</option>
                                <option value="Core">Core</option>
                            </select>

                            <input
                                type="number"
                                className="flex-1 p-2 rounded-lg border bg-black text-white"
                                value={filters.duration}
                                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                                placeholder="Max Duration"
                            />
                        </div>
                    </div>
                )}

                {/* Workout cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutsList;

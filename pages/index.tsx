import React, { useState, useEffect } from 'react';
import { Plus, Save, FileSpreadsheet, Settings, User, Calendar, Target, Dumbbell, BarChart3, Brain, Apple, Moon, Sun, Play, TrendingUp, Award, HelpCircle, Info } from 'lucide-react';

const WorkoutProgramDemo = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [currentStep, setCurrentStep] = useState('program-info');
  const [programInfo, setProgramInfo] = useState({
    clientName: '',
    startDate: '',
    fitnessGoal: '',
    weeklyWorkouts: 3
  });
  
  const [splits, setSplits] = useState([]);
  const [currentSplit, setCurrentSplit] = useState(0);
  
  // Sample data for dropdowns - Yes Drop downs :)  Y
  const [categories] = useState([
    { acronym: 'UB', name: 'Upper Body' },
    { acronym: 'LB', name: 'Lower Body' },
    { acronym: 'FB', name: 'Full Body' },
    { acronym: 'CD', name: 'Cardio' },
    { acronym: 'CR', name: 'Core' }
  ]);
  
  const [exercises] = useState([
    'Push-ups', 'Squats', 'Deadlifts', 'Bench Press', 'Pull-ups', 'Lunges', 
    'Bicep Curls', 'Tricep Dips', 'Planks', 'Burpees', 'Mountain Climbers'
  ]);
  
  const [techniques] = useState([
    'Standard', 'Drop Set', 'Super Set', 'Circuit', 'HIIT', 'Pyramid', 'Myo-Reps'
  ]);

  // AI Suggestions (Advanced Mode)
  const [aiSuggestions] = useState([
    { exercise: 'Squats', reason: 'Great for lower body strength building', confidence: 95 },
    { exercise: 'Push-ups', reason: 'Perfect for upper body endurance', confidence: 88 },
    { exercise: 'Planks', reason: 'Essential for core stability', confidence: 92 }
  ]);

  // Progress Data (Advanced Mode)
  const [progressData] = useState([
    { week: 1, strength: 75, endurance: 60, weight: 180 },
    { week: 2, strength: 78, endurance: 65, weight: 178 },
    { week: 3, strength: 82, endurance: 70, weight: 176 },
    { week: 4, strength: 85, endurance: 75, weight: 175 }
  ]);

  // Initialize splits when weekly workouts change
  useEffect(() => {
    const newSplits = Array(programInfo.weeklyWorkouts).fill(null).map((_, index) => ({
      name: `Split ${index + 1}`,
      exercises: []
    }));
    setSplits(newSplits);
  }, [programInfo.weeklyWorkouts]);

  const addExercise = () => {
    const newExercise = {
      category: '',
      exerciseName: '',
      technique: '',
      sets: '',
      reps: '',
      restTime: '',
      ...(isAdvancedMode && { videoUrl: '', notes: '' })
    };
    
    const updatedSplits = [...splits];
    updatedSplits[currentSplit].exercises.push(newExercise);
    setSplits(updatedSplits);
  };

  const updateExercise = (exerciseIndex, field, value) => {
    const updatedSplits = [...splits];
    updatedSplits[currentSplit].exercises[exerciseIndex][field] = value;
    setSplits(updatedSplits);
  };

  const removeExercise = (exerciseIndex) => {
    const updatedSplits = [...splits];
    updatedSplits[currentSplit].exercises.splice(exerciseIndex, 1);
    setSplits(updatedSplits);
  };

  const exportToGoogleSheets = () => {
    alert('Demo: Program would be exported to Google Sheets with professional formatting');
  };

  const applyAISuggestion = (exercise) => {
    alert(`Demo: AI suggests adding "${exercise}" to your current split`);
  };

  const themeClasses = isDarkTheme 
    ? 'from-slate-900/95 via-gray-900/90 to-black/95'
    : 'from-blue-50/80 via-white/60 to-blue-50/80';
  
  const panelClasses = isDarkTheme 
    ? 'bg-white/5 backdrop-blur-xl border-white/20 text-white'
    : 'bg-white/80 backdrop-blur-xl border-gray-300/20 text-gray-800';

  const buttonClasses = isDarkTheme
    ? 'text-white'
    : 'text-gray-800';

  // Navigation items for different modes
  const getNavigationItems = () => {
    const basicItems = [
      { key: 'program-info', label: 'Program Info', icon: User },
      { key: 'create-splits', label: 'Create Splits', icon: Dumbbell },
      { key: 'manage-data', label: 'Manage Data', icon: Settings },
      { key: 'help', label: 'Help', icon: HelpCircle },
      { key: 'info', label: 'Info', icon: Info }
    ];

    const advancedItems = [
      { key: 'program-info', label: 'Program Info', icon: User },
      { key: 'create-splits', label: 'Create Splits', icon: Dumbbell },
      { key: 'manage-data', label: 'Manage Data', icon: Settings },
      { key: 'ai-suggestions', label: 'AI Suggestions', icon: Brain },
      { key: 'nutrition', label: 'Nutrition Plan', icon: Apple },
      { key: 'analytics', label: 'Analytics', icon: BarChart3 },
      { key: 'progress', label: 'Progress Tracking', icon: TrendingUp },
      { key: 'help', label: 'Help', icon: HelpCircle },
      { key: 'info', label: 'Info', icon: Info }
    ];

    return isAdvancedMode ? advancedItems : basicItems;
  };

  const renderProgramInfo = () => (
    <div className={`max-w-2xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-500/80 rounded-full mr-4">
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${buttonClasses}`}>Program Information</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-blue-100' : 'text-gray-700'}`}>
            Client Full Name
          </label>
          <input
            type="text"
            value={programInfo.clientName}
            onChange={(e) => setProgramInfo({...programInfo, clientName: e.target.value})}
            className={`w-full px-4 py-3 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white placeholder-white/60' : 'bg-white/50 border-gray-300/30 text-gray-800 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
            placeholder="Enter client's full name"
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-blue-100' : 'text-gray-700'}`}>
            Program Start Date
          </label>
          <input
            type="date"
            value={programInfo.startDate}
            onChange={(e) => setProgramInfo({...programInfo, startDate: e.target.value})}
            className={`w-full px-4 py-3 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white' : 'bg-white/50 border-gray-300/30 text-gray-800'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-blue-100' : 'text-gray-700'}`}>
            Main Fitness Goal
          </label>
          <input
            type="text"
            value={programInfo.fitnessGoal}
            onChange={(e) => setProgramInfo({...programInfo, fitnessGoal: e.target.value})}
            className={`w-full px-4 py-3 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white placeholder-white/60' : 'bg-white/50 border-gray-300/30 text-gray-800 placeholder-gray-500'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
            placeholder="e.g., Weight Loss, Muscle Gain, Strength"
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-blue-100' : 'text-gray-700'}`}>
            Weekly Workouts
          </label>
          <select
            value={programInfo.weeklyWorkouts}
            onChange={(e) => setProgramInfo({...programInfo, weeklyWorkouts: parseInt(e.target.value)})}
            className={`w-full px-4 py-3 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white' : 'bg-white/50 border-gray-300/30 text-gray-800'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
          >
            {[1,2,3,4,5,6,7].map(num => (
              <option key={num} value={num} className={`${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>{num} workouts per week</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={() => setCurrentStep('create-splits')}
          disabled={!programInfo.clientName || !programInfo.startDate || !programInfo.fitnessGoal}
          className="w-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white py-4 px-6 rounded-lg hover:from-blue-600/90 hover:to-purple-700/90 disabled:from-gray-500/50 disabled:to-gray-600/50 disabled:cursor-not-allowed font-medium text-lg shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-md"
        >
          Create Workout Splits 🏋️‍♀️
        </button>
      </div>
    </div>
  );

  const renderSplitCreation = () => {
    const gridCols = isAdvancedMode ? 'grid-cols-8' : 'grid-cols-6';
    
    return (
      <div className={`max-w-7xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/80 rounded-full mr-4">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${buttonClasses}`}>Create Workout Splits</h2>
          </div>
          <div className={`text-sm px-4 py-2 rounded-lg backdrop-blur-md ${isDarkTheme ? 'bg-white/10 text-blue-100' : 'bg-gray-100/10 text-gray-600'}`}>
            6-week program for <span className="font-semibold">{programInfo.clientName}</span>
          </div>
        </div>

        {/* Split Navigation */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {splits.map((split, index) => (
            <button
              key={index}
              onClick={() => setCurrentSplit(index)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all duration-300 backdrop-blur-md ${
                currentSplit === index 
                  ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white shadow-lg transform scale-105' 
                  : `${isDarkTheme ? 'bg-white/10 text-white hover:bg-white/20 border border-white/30' : 'bg-white/50 text-gray-800 hover:bg-white/70 border border-gray-300/30'}`
              }`}
            >
              {split.name} 💪
            </button>
          ))}
        </div>

        {/* Exercise Grid */}
        <div className="mb-6">
          <div className={`grid ${gridCols} gap-3 mb-4 ${isDarkTheme ? 'bg-white/10' : 'bg-gray-100/10'} backdrop-blur-md p-4 rounded-xl`}>
            <div className={`font-medium ${buttonClasses}`}>Category</div>
            <div className={`font-medium ${buttonClasses}`}>Exercise Name</div>
            <div className={`font-medium ${buttonClasses}`}>Technique</div>
            <div className={`font-medium ${buttonClasses}`}>Sets</div>
            <div className={`font-medium ${buttonClasses}`}>Reps</div>
            <div className={`font-medium ${buttonClasses}`}>Rest Time</div>
            {isAdvancedMode && <div className={`font-medium ${buttonClasses}`}>Video URL</div>}
            {isAdvancedMode && <div className={`font-medium ${buttonClasses}`}>Actions</div>}
          </div>

          {splits[currentSplit]?.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className={`grid ${gridCols} gap-3 mb-3 p-4 ${isDarkTheme ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-white/30 border-gray-300/20 hover:bg-white/50'} backdrop-blur-md border rounded-xl transition-all duration-300`}>
              <select
                value={exercise.category}
                onChange={(e) => updateExercise(exerciseIndex, 'category', e.target.value)}
                className={`px-3 py-2 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white' : 'bg-white/50 border-gray-300/30 text-gray-800'} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
              >
                <option value="" className={`${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>Select...</option>
                {categories.map(cat => (
                  <option key={cat.acronym} value={cat.acronym} className={`${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>{cat.acronym} - {cat.name}</option>
                ))}
              </select>
              
              <select
                value={exercise.exerciseName}
                onChange={(e) => updateExercise(exerciseIndex, 'exerciseName', e.target.value)}
                className={`px-3 py-2 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white' : 'bg-white/50 border-gray-300/30 text-gray-800'} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
              >
                <option value="" className={`${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>Select...</option>
                {exercises.map(ex => (
                  <option key={ex} value={ex} className={`${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>{ex}</option>
                ))}
              </select>
              
              <select
                value={exercise.technique}
                onChange={(e) => updateExercise(exerciseIndex, 'technique', e.target.value)}
                className={`px-3 py-2 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white' : 'bg-white/50 border-gray-300/30 text-gray-800'} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
              >
                <option value="" className={`${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>Select...</option>
                {techniques.map(tech => (
                  <option key={tech} value={tech} className={`${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>{tech}</option>
                ))}
              </select>
              
              <input
                type="text"
                value={exercise.sets}
                onChange={(e) => updateExercise(exerciseIndex, 'sets', e.target.value)}
                placeholder="e.g., 3-4"
                className={`px-3 py-2 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white placeholder-white/60' : 'bg-white/50 border-gray-300/30 text-gray-800 placeholder-gray-500'} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
              />
              
              <input
                type="text"
                value={exercise.reps}
                onChange={(e) => updateExercise(exerciseIndex, 'reps', e.target.value)}
                placeholder="e.g., 8-10"
                className={`px-3 py-2 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white placeholder-white/60' : 'bg-white/50 border-gray-300/30 text-gray-800 placeholder-gray-500'} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
              />
              
              <input
                type="text"
                value={exercise.restTime}
                onChange={(e) => updateExercise(exerciseIndex, 'restTime', e.target.value)}
                placeholder="e.g., 60s"
                className={`px-3 py-2 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white placeholder-white/60' : 'bg-white/50 border-gray-300/30 text-gray-800 placeholder-gray-500'} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md`}
              />
              
              {isAdvancedMode && (
                <div className="flex items-center">
                  <input
                    type="url"
                    value={exercise.videoUrl || ''}
                    onChange={(e) => updateExercise(exerciseIndex, 'videoUrl', e.target.value)}
                    placeholder="YouTube/Vimeo URL"
                    className={`px-3 py-2 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white placeholder-white/60' : 'bg-white/50 border-gray-300/30 text-gray-800 placeholder-gray-500'} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md flex-1`}
                  />
                  {exercise.videoUrl && (
                    <button className="ml-2 p-2 bg-green-500/80 text-white rounded-lg hover:bg-green-600/90 transition-colors duration-300">
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
              
              <div className="flex">
                <button
                  onClick={() => removeExercise(exerciseIndex)}
                  className="px-3 py-2 bg-red-500/80 text-white rounded-lg text-sm hover:bg-red-600/90 transition-colors duration-300 transform hover:scale-105 backdrop-blur-md"
                >
                  {isAdvancedMode ? 'Remove' : '×'}
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addExercise}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500/80 to-emerald-600/80 text-white rounded-lg hover:from-green-600/90 hover:to-emerald-700/90 shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Exercise
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep('program-info')}
            className={`px-6 py-3 ${isDarkTheme ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100/10 text-gray-800 hover:bg-gray-200/20'} rounded-lg backdrop-blur-md transition-all duration-300`}
          >
            ← Back to Program Info
          </button>
          
          <div className="space-x-3">
            <button
              onClick={() => setCurrentStep('manage-data')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500/80 to-pink-600/80 text-white rounded-lg hover:from-purple-600/90 hover:to-pink-700/90 shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-md"
            >
              ⚙️ Manage Exercises
            </button>
            
            <button
              onClick={exportToGoogleSheets}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-lg hover:from-blue-600/90 hover:to-purple-700/90 shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-md"
            >
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              📊 Export to Google Sheets
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDataManagement = () => (
    <div className={`max-w-4xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
      <div className="flex items-center mb-6">
        <div className="p-3 bg-purple-500/80 rounded-full mr-4">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${buttonClasses}`}>Manage Exercise Database</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Categories */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-white/30 border-gray-300/20 hover:bg-white/50'} backdrop-blur-md border rounded-xl p-6 transition-all duration-300`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            🏷️ Categories
          </h3>
          <div className="space-y-3 mb-4">
            {categories.map(cat => (
              <div key={cat.acronym} className={`flex justify-between items-center p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-md rounded-lg`}>
                <span className={`font-mono text-sm font-bold ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>{cat.acronym}</span>
                <span className={`text-sm ${buttonClasses}`}>{cat.name}</span>
              </div>
            ))}
          </div>
          <button className="w-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white py-3 rounded-lg hover:from-blue-600/90 hover:to-purple-700/90 text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
            ➕ Add Category
          </button>
        </div>

        {/* Exercises */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-white/30 border-gray-300/20 hover:bg-white/50'} backdrop-blur-md border rounded-xl p-6 transition-all duration-300`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            💪 Exercises
          </h3>
          <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
            {exercises.slice(0, 5).map((exercise, index) => (
              <div key={exercise} className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-md rounded-lg text-sm flex items-center ${buttonClasses}`}>
                <span className="mr-2">🏋️</span>
                {exercise}
              </div>
            ))}
            <div className={`text-xs text-center ${isDarkTheme ? 'text-blue-200' : 'text-gray-600'}`}>+{exercises.length - 5} more exercises...</div>
          </div>
          <button className="w-full bg-gradient-to-r from-green-500/80 to-emerald-600/80 text-white py-3 rounded-lg hover:from-green-600/90 hover:to-emerald-700/90 text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
            ➕ Add Exercise
          </button>
        </div>

        {/* Techniques */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-white/30 border-gray-300/20 hover:bg-white/50'} backdrop-blur-md border rounded-xl p-6 transition-all duration-300`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            ⚡ Techniques
          </h3>
          <div className="space-y-3 mb-4">
            {techniques.slice(0, 4).map((technique, index) => (
              <div key={technique} className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} backdrop-blur-md rounded-lg text-sm flex items-center ${buttonClasses}`}>
                <span className="mr-2">🎯</span>
                {technique}
              </div>
            ))}
            <div className={`text-xs text-center ${isDarkTheme ? 'text-blue-200' : 'text-gray-600'}`}>+{techniques.length - 4} more techniques...</div>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-500/80 to-pink-600/80 text-white py-3 rounded-lg hover:from-purple-600/90 hover:to-pink-700/90 text-sm font-medium shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
            ➕ Add Technique
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setCurrentStep('create-splits')}
          className={`px-8 py-3 ${isDarkTheme ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100/10 text-gray-800 hover:bg-gray-200/20'} rounded-lg backdrop-blur-md transition-all duration-300`}
        >
          ← Back to Splits
        </button>
      </div>
    </div>
  );

  // Advanced Mode Features
  const renderAISuggestions = () => (
    <div className={`max-w-4xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-500/80 rounded-full mr-4">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${buttonClasses}`}>AI Exercise Suggestions</h2>
      </div>

      <div className="space-y-4 mb-6">
        {aiSuggestions.map((suggestion, index) => (
          <div key={index} className={`p-4 ${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className={`font-semibold ${buttonClasses} mb-2`}>🤖 {suggestion.exercise}</h3>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{suggestion.reason}</p>
                <div className="flex items-center">
                  <span className={`text-xs ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                    Confidence: {suggestion.confidence}%
                  </span>
                  <div className={`ml-2 w-16 h-2 ${isDarkTheme ? 'bg-white/20' : 'bg-gray-300'} rounded-full overflow-hidden`}>
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{width: `${suggestion.confidence}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => applyAISuggestion(suggestion.exercise)}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-lg hover:from-blue-600/90 hover:to-purple-700/90 transition-all duration-300 transform hover:scale-105"
              >
                Add to Split
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => alert('Demo: AI analyzing your current program for new suggestions...')}
          className="px-6 py-3 bg-gradient-to-r from-green-500/80 to-emerald-600/80 text-white rounded-lg hover:from-green-600/90 hover:to-emerald-700/90 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          🔄 Get New Suggestions
        </button>
      </div>
    </div>
  );

  const renderNutritionPlan = () => (
    <div className={`max-w-6xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-500/80 rounded-full mr-4">
          <Apple className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${buttonClasses}`}>Nutrition Planning</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Meal Plan */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            🍽️ Daily Meal Plan
          </h3>
          <div className="space-y-3">
            {['Breakfast', 'Mid-Morning', 'Lunch', 'Pre-Workout', 'Post-Workout', 'Dinner'].map((meal, index) => (
              <div key={meal} className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${buttonClasses}`}>{meal}</span>
                  <span className={`text-sm ${isDarkTheme ? 'text-green-200' : 'text-green-600'}`}>
                    {300 + (index * 50)} cal
                  </span>
                </div>
                <p className={`text-sm mt-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {meal === 'Breakfast' && 'Oatmeal with berries and protein powder'}
                  {meal === 'Mid-Morning' && 'Greek yogurt with nuts'}
                  {meal === 'Lunch' && 'Grilled chicken salad with quinoa'}
                  {meal === 'Pre-Workout' && 'Banana with almond butter'}
                  {meal === 'Post-Workout' && 'Protein shake with fruits'}
                  {meal === 'Dinner' && 'Salmon with vegetables and sweet potato'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Goals */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            🎯 Daily Nutrition Goals
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Calories', current: 1847, target: 2000, unit: 'kcal', color: 'blue' },
              { label: 'Protein', current: 145, target: 160, unit: 'g', color: 'green' },
              { label: 'Carbs', current: 230, target: 250, unit: 'g', color: 'yellow' },
              { label: 'Fat', current: 67, target: 78, unit: 'g', color: 'purple' }
            ].map((macro) => (
              <div key={macro.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${buttonClasses}`}>{macro.label}</span>
                  <span className={`text-sm ${buttonClasses}`}>
                    {macro.current}/{macro.target} {macro.unit}
                  </span>
                </div>
                <div className={`w-full h-3 ${isDarkTheme ? 'bg-white/20' : 'bg-gray-300'} rounded-full overflow-hidden`}>
                  <div 
                    className={`h-full bg-${macro.color}-500 rounded-full transition-all duration-300`}
                    style={{width: `${(macro.current / macro.target) * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => alert('Demo: Generating personalized meal plan based on workout schedule...')}
          className="px-6 py-3 bg-gradient-to-r from-green-500/80 to-emerald-600/80 text-white rounded-lg hover:from-green-600/90 hover:to-emerald-700/90 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          🥗 Generate Meal Plan
        </button>
        
        <button
          onClick={() => alert('Demo: Exporting nutrition plan to PDF...')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-lg hover:from-blue-600/90 hover:to-purple-700/90 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          📄 Export Nutrition Plan
        </button>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className={`max-w-6xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
      <div className="flex items-center mb-6">
        <div className="p-3 bg-purple-500/80 rounded-full mr-4">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${buttonClasses}`}>Analytics Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Programs', value: '127', change: '+12%', color: 'blue' },
          { label: 'Active Clients', value: '89', change: '+8%', color: 'green' },
          { label: 'Completion Rate', value: '94%', change: '+3%', color: 'purple' },
          { label: 'Avg. Results', value: '85%', change: '+15%', color: 'yellow' }
        ].map((stat) => (
          <div key={stat.label} className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6 text-center`}>
            <h3 className={`text-3xl font-bold mb-2 ${buttonClasses}`}>{stat.value}</h3>
            <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{stat.label}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${isDarkTheme ? 'bg-green-500/20 text-green-200' : 'bg-green-100 text-green-800'}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Most Popular Exercises */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            🔥 Most Popular Exercises
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Squats', usage: 87 },
              { name: 'Push-ups', usage: 76 },
              { name: 'Deadlifts', usage: 68 },
              { name: 'Planks', usage: 59 },
              { name: 'Lunges', usage: 54 }
            ].map((exercise) => (
              <div key={exercise.name} className="flex items-center justify-between">
                <span className={`text-sm ${buttonClasses}`}>{exercise.name}</span>
                <div className="flex items-center">
                  <div className={`w-24 h-2 ${isDarkTheme ? 'bg-white/20' : 'bg-gray-300'} rounded-full overflow-hidden mr-2`}>
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{width: `${exercise.usage}%`}}
                    ></div>
                  </div>
                  <span className={`text-xs ${buttonClasses}`}>{exercise.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Success Rate */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            📈 Client Goal Achievement
          </h3>
          <div className="space-y-3">
            {[
              { goal: 'Weight Loss', success: 92 },
              { goal: 'Muscle Gain', success: 88 },
              { goal: 'Strength', success: 95 },
              { goal: 'Endurance', success: 83 },
              { goal: 'General Fitness', success: 91 }
            ].map((goal) => (
              <div key={goal.goal} className="flex items-center justify-between">
                <span className={`text-sm ${buttonClasses}`}>{goal.goal}</span>
                <div className="flex items-center">
                  <div className={`w-24 h-2 ${isDarkTheme ? 'bg-white/20' : 'bg-gray-300'} rounded-full overflow-hidden mr-2`}>
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{width: `${goal.success}%`}}
                    ></div>
                  </div>
                  <span className={`text-xs ${buttonClasses}`}>{goal.success}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressTracking = () => (
    <div className={`max-w-6xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-orange-500/80 rounded-full mr-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className={`text-2xl font-bold ${buttonClasses}`}>Progress Tracking</h2>
        </div>
        <div className="flex items-center space-x-2">
          <select className={`px-3 py-2 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white' : 'bg-white/50 border-gray-300/30 text-gray-800'} border rounded-lg text-sm backdrop-blur-md`}>
            <option>{programInfo.clientName || 'Select Client'}</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Progress Metrics */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            📊 Key Metrics
          </h3>
          <div className="space-y-4">
            {progressData.map((week) => (
              <div key={week.week} className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-medium ${buttonClasses}`}>Week {week.week}</span>
                  <span className={`text-sm ${buttonClasses}`}>{week.weight} lbs</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Strength</span>
                    <span className={`text-xs ${buttonClasses}`}>{week.strength}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Endurance</span>
                    <span className={`text-xs ${buttonClasses}`}>{week.endurance}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Photos */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            📸 Progress Photos
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week) => (
              <div key={week} className={`${isDarkTheme ? 'bg-white/10' : 'bg-white/50'} rounded-lg p-4 text-center`}>
                <div className={`w-full h-20 ${isDarkTheme ? 'bg-white/20' : 'bg-gray-300'} rounded-lg mb-2 flex items-center justify-center`}>
                  <span className={`text-xs ${buttonClasses}`}>📷</span>
                </div>
                <span className={`text-xs ${buttonClasses}`}>{week}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-lg hover:from-blue-600/90 hover:to-purple-700/90 transition-all duration-300">
            📱 Upload Photo
          </button>
        </div>

        {/* Achievements */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            🏆 Achievements
          </h3>
          <div className="space-y-3">
            {[
              { title: 'First Week Completed', icon: '🎯', date: 'Jan 15' },
              { title: 'Weight Goal Reached', icon: '⚖️', date: 'Jan 22' },
              { title: 'Strength Improved 20%', icon: '💪', date: 'Jan 28' },
              { title: 'Perfect Attendance', icon: '⭐', date: 'Feb 5' }
            ].map((achievement) => (
              <div key={achievement.title} className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{achievement.icon}</span>
                  <div>
                    <p className={`text-sm font-medium ${buttonClasses}`}>{achievement.title}</p>
                    <p className={`text-xs ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{achievement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => alert('Demo: Generating detailed progress report...')}
          className="px-6 py-3 bg-gradient-to-r from-orange-500/80 to-red-600/80 text-white rounded-lg hover:from-orange-600/90 hover:to-red-700/90 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          📋 Generate Report
        </button>
        
        <button
          onClick={() => alert('Demo: Setting up progress reminder notifications...')}
          className="px-6 py-3 bg-gradient-to-r from-purple-500/80 to-pink-600/80 text-white rounded-lg hover:from-purple-600/90 hover:to-pink-700/90 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          🔔 Set Reminders
        </button>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className={`max-w-6xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-500/80 rounded-full mr-4">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${buttonClasses}`}>User Manual & Help</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Getting Started */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            🚀 Getting Started
          </h3>
          <div className="space-y-3 text-sm">
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>📝 1. Program Information</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Start by entering client details, start date, fitness goal, and weekly workout frequency.
              </p>
            </div>
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>💪 2. Create Splits</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Design individual workout sessions with exercises, sets, reps, and rest times.
              </p>
            </div>
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>📊 3. Export to Sheets</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Generate professional Google Sheets with formatted workout programs.
              </p>
            </div>
          </div>
        </div>

        {/* Features Guide */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            ⚡ Features Guide
          </h3>
          <div className="space-y-3 text-sm">
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>🎛️ Basic vs Pro Mode</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Toggle between basic workout creation and advanced features like AI suggestions.
              </p>
            </div>
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>🌙 Theme Toggle</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Switch between dark and light themes using the sun/moon icon.
              </p>
            </div>
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>⚙️ Exercise Management</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Add custom exercises, categories, and techniques to personalize programs.
              </p>
            </div>
          </div>
        </div>

        {/* Pro Features */}
        {isAdvancedMode && (
          <>
            <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
              <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
                🤖 AI Features
              </h3>
              <div className="space-y-3 text-sm">
                <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
                  <p className={`font-medium ${buttonClasses} mb-1`}>🧠 AI Suggestions</p>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Get intelligent exercise recommendations based on fitness goals.
                  </p>
                </div>
                <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
                  <p className={`font-medium ${buttonClasses} mb-1`}>🍎 Nutrition Planning</p>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Create meal plans with macro tracking aligned to workout goals.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
              <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
                📈 Analytics & Tracking
              </h3>
              <div className="space-y-3 text-sm">
                <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
                  <p className={`font-medium ${buttonClasses} mb-1`}>📊 Analytics Dashboard</p>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Track program effectiveness and client success rates.
                  </p>
                </div>
                <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
                  <p className={`font-medium ${buttonClasses} mb-1`}>📱 Progress Tracking</p>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Monitor client progress with photos, metrics, and achievements.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tips & Tricks */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6 ${isAdvancedMode ? 'md:col-span-2' : ''}`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            💡 Tips & Tricks
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>⌨️ Quick Navigation</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Click any tab to quickly jump between sections.
              </p>
            </div>
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>💾 Auto-Save</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Your progress is automatically saved as you work.
              </p>
            </div>
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>🎥 Video Links</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                {isAdvancedMode ? 'Add YouTube/Vimeo links in Pro mode.' : 'Available in Pro mode for exercise demonstrations.'}
              </p>
            </div>
            <div className={`p-3 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <p className={`font-medium ${buttonClasses} mb-1`}>📋 Flexible Input</p>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Sets/reps accept any format: "3x8", "8-10", "Myo-Reps", etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInfo = () => (
    <div className={`max-w-4xl mx-auto ${panelClasses} rounded-2xl shadow-2xl border p-8`}>
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-500/80 rounded-full mr-4">
          <Info className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${buttonClasses}`}>About & Developer Info</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Developer Info */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            👨‍💻 Developer Information
          </h3>
          <div className="space-y-4">
            <div className={`p-4 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg text-center`}>
              <div className="text-4xl mb-3">🧑‍💼</div>
              <h4 className={`font-bold text-lg ${buttonClasses} mb-2`}>Darshana Fernando</h4>
              <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                Full-Stack Developer & Software Solutions Expert
              </p>
              <a 
                href="https://www.fiverr.com/sellers/xlsolutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/80 to-emerald-600/80 text-white rounded-lg hover:from-green-600/90 hover:to-emerald-700/90 transition-all duration-300 transform hover:scale-105"
              >
                🌟 View Fiverr Profile
              </a>
            </div>
            
            <div className={`p-4 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <h5 className={`font-semibold ${buttonClasses} mb-2`}>🛠️ Specializations</h5>
              <div className="flex flex-wrap gap-2">
                {['React', 'Python', 'VBA', 'JavaScript', 'Web Apps', 'Automation'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 text-xs rounded-full ${isDarkTheme ? 'bg-blue-500/20 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className={`${isDarkTheme ? 'bg-white/5 border-white/20' : 'bg-white/30 border-gray-300/20'} backdrop-blur-md border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center ${buttonClasses}`}>
            📋 Project Information
          </h3>
          <div className="space-y-4">
            <div className={`p-4 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <h5 className={`font-semibold ${buttonClasses} mb-2`}>🎯 Sample Created For</h5>
              <p className={`text-lg font-bold ${isDarkTheme ? 'text-green-200' : 'text-green-600'}`}>alefaber</p>
              <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                This demo showcases the workout program creator's capabilities
              </p>
            </div>

            <div className={`p-4 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <h5 className={`font-semibold ${buttonClasses} mb-2`}>⚡ Key Features</h5>
              <ul className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• 6-week workout program creation</li>
                <li>• Google Sheets export with formatting</li>
                <li>• Exercise database management</li>
                {isAdvancedMode && (
                  <>
                    <li>• AI exercise suggestions</li>
                    <li>• Nutrition planning integration</li>
                    <li>• Progress tracking & analytics</li>
                  </>
                )}
              </ul>
            </div>

            <div className={`p-4 ${isDarkTheme ? 'bg-white/5' : 'bg-white/50'} rounded-lg`}>
              <h5 className={`font-semibold ${buttonClasses} mb-2`}>🚀 Version</h5>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                {isAdvancedMode ? 'Pro Demo v2.0' : 'Basic Demo v1.0'}
              </p>
              <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className={`mt-8 ${isDarkTheme ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'} border rounded-xl p-6 text-center`}>
        <h3 className={`font-semibold mb-3 ${buttonClasses}`}>
          💬 Need Custom Development?
        </h3>
        <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          Looking for custom web applications, automation solutions, or software development? 
          Let's bring your ideas to life!
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://www.fiverr.com/sellers/xlsolutions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-lg hover:from-blue-600/90 hover:to-purple-700/90 shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            🤝 Hire on Fiverr
          </a>
          <button 
            onClick={() => alert('Demo: Contact form would open in real implementation')}
            className={`px-6 py-3 ${isDarkTheme ? 'bg-white/10 border-white/30 text-white hover:bg-white/20' : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'} border rounded-lg transition-all duration-300`}
          >
            📧 Get Quote
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(${themeClasses}), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23334155"/><stop offset="50%" stop-color="%23475569"/><stop offset="100%" stop-color="%23334155"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23bg)"/><g opacity="0.1"><circle cx="200" cy="150" r="100" fill="%23ffffff"/><circle cx="800" cy="300" r="150" fill="%23ffffff"/><circle cx="400" cy="600" r="120" fill="%23ffffff"/><circle cx="1000" cy="200" r="80" fill="%23ffffff"/></g></svg>')`
        }}
      >
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 py-8">
        {/* Header with Mode Toggle */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 space-x-4">
              <h1 className={`text-4xl font-bold mb-4 ${buttonClasses}`}>Workout Program Creator</h1>
              
              {/* Mode Toggle */}
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${buttonClasses}`}>Basic</span>
                <button
                  onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAdvancedMode ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAdvancedMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm ${buttonClasses}`}>Pro</span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`p-2 rounded-lg backdrop-blur-md transition-all duration-300 ${
                  isDarkTheme ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200/10 hover:bg-gray-200/20'
                }`}
              >
                {isDarkTheme ? (
                  <Sun className={`w-5 h-5 ${buttonClasses}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${buttonClasses}`} />
                )}
              </button>
            </div>
            
            <p className={`text-lg ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
              {isAdvancedMode 
                ? 'Advanced workout program creator with AI, nutrition planning, and analytics' 
                : 'Create personalized 6-week workout programs and export to Google Sheets'
              }
            </p>
            
            {isAdvancedMode && (
              <div className="mt-2 flex justify-center space-x-4 text-sm">
                <span className={`px-3 py-1 rounded-full ${isDarkTheme ? 'bg-blue-500/20 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                  🤖 AI Powered
                </span>
                <span className={`px-3 py-1 rounded-full ${isDarkTheme ? 'bg-green-500/20 text-green-200' : 'bg-green-100 text-green-800'}`}>
                  🍎 Nutrition Planning
                </span>
                <span className={`px-3 py-1 rounded-full ${isDarkTheme ? 'bg-purple-500/20 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                  📊 Analytics Dashboard
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Indicator */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
            {getNavigationItems().map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentStep(key)}
                className={`flex items-center px-4 py-3 rounded-lg shadow-lg backdrop-blur-md transition-all duration-300 whitespace-nowrap ${
                  currentStep === key 
                    ? `${isDarkTheme ? 'bg-blue-500/80 text-white' : 'bg-blue-500 text-white'} shadow-blue-500/50` 
                    : `${isDarkTheme ? 'bg-white/10 text-white hover:bg-white/20 border border-white/30' : 'bg-white/70 text-gray-800 hover:bg-white/90 border border-gray-300/30'}`
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {currentStep === 'program-info' && renderProgramInfo()}
          {currentStep === 'create-splits' && renderSplitCreation()}
          {currentStep === 'manage-data' && renderDataManagement()}
          {isAdvancedMode && currentStep === 'ai-suggestions' && renderAISuggestions()}
          {isAdvancedMode && currentStep === 'nutrition' && renderNutritionPlan()}
          {isAdvancedMode && currentStep === 'analytics' && renderAnalytics()}
          {isAdvancedMode && currentStep === 'progress' && renderProgressTracking()}
          {currentStep === 'help' && renderHelp()}
          {currentStep === 'info' && renderInfo()}
        </div>
      </div>
    </div>
  );
};

export default WorkoutProgramDemo;

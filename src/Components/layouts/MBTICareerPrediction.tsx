'use client'

import { useState } from 'react'
import axios from 'axios'

export default function MBTICareerPrediction() {
  const [mbtiType, setMbtiType] = useState('')
  const [predictedCareers, setPredictedCareers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setPredictedCareers([])

    try {
      const response = await axios.post('http://localhost:8000/predict_career', {
        mbti_type: mbtiType
      })
      setPredictedCareers(response.data.predicted_careers)
    } catch (error) {
      setError('An error occurred while predicting careers. Please try again.')
      console.error('Error predicting careers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">MBTI Career Predictor</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="mbtiType" className="block text-sm font-medium text-gray-700">
            MBTI Type
          </label>
          <input
            type="text"
            id="mbtiType"
            value={mbtiType}
            onChange={(e) => setMbtiType(e.target.value.toUpperCase())}
            placeholder="Enter MBTI Type (e.g., INTJ)"
            maxLength={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? 'Predicting...' : 'Predict Careers'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {predictedCareers.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Predicted Careers:</h2>
          <ul className="list-disc pl-5">
            {predictedCareers.map((career, index) => (
              <li key={index} className="mb-1">{career}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
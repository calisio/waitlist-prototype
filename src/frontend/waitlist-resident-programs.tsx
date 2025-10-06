import React, { useState } from 'react';
import { CheckCircle, Clock, Send } from 'lucide-react';

// Mock data for programs and resident's current status
const mockPrograms = [
    {
        id: 1,
        name: 'GED Program',
        description:
            'Prepare for and earn your General Educational Development certificate',
        capacity: 30,
        enrolled: 15,
        residentStatus: null, // null, 'enrolled', 'pending', or 'waitlisted'
        waitlistPosition: null
    },
    {
        id: 2,
        name: 'College Math 101',
        description: 'Introduction to college-level mathematics',
        capacity: 25,
        enrolled: 20,
        residentStatus: 'enrolled',
        waitlistPosition: null
    },
    {
        id: 3,
        name: 'Career Readiness Workshop',
        description:
            'Build job search skills, resume writing, and interview techniques',
        capacity: 40,
        enrolled: 35,
        residentStatus: 'pending',
        waitlistPosition: null
    },
    {
        id: 4,
        name: 'Computer Literacy',
        description: 'Learn basic computer skills and software applications',
        capacity: 30,
        enrolled: 18,
        residentStatus: 'waitlisted',
        waitlistPosition: 12
    },
    {
        id: 5,
        name: 'Carpentry Training',
        description: 'Hands-on training in basic carpentry and woodworking',
        capacity: 15,
        enrolled: 12,
        residentStatus: 'waitlisted',
        waitlistPosition: 5
    },
    {
        id: 6,
        name: 'Business English',
        description:
            'Professional communication and writing skills for the workplace',
        capacity: 35,
        enrolled: 28,
        residentStatus: null,
        waitlistPosition: null
    }
];

const mockResident = {
    name: 'Alex Martinez',
    id: 'R-3005'
};

function ResidentProgramList() {
    const [programs, setPrograms] = useState(mockPrograms);
    const [showKiteModal, setShowKiteModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [kiteNote, setKiteNote] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSendKite = (program) => {
        setSelectedProgram(program);
        setShowKiteModal(true);
    };

    const handleSubmitKite = () => {
        // Update program status to pending
        setPrograms((prev) =>
            prev.map((p) =>
                p.id === selectedProgram.id
                    ? { ...p, residentStatus: 'pending' }
                    : p
            )
        );

        // Close modal and show confirmation
        setShowKiteModal(false);
        setShowConfirmation(true);
        setKiteNote('');

        // Hide confirmation after 3 seconds
        setTimeout(() => {
            setShowConfirmation(false);
        }, 3000);
    };

    const handleCancelKite = () => {
        setShowKiteModal(false);
        setSelectedProgram(null);
        setKiteNote('');
    };

    const getStatusButton = (program) => {
        switch (program.residentStatus) {
            case 'enrolled':
                return (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                        <CheckCircle className="w-5 h-5" />
                        Enrolled
                    </div>
                );
            case 'pending':
                return (
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium">
                        <Clock className="w-5 h-5" />
                        Pending
                    </div>
                );
            case 'waitlisted':
                return (
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                            <Clock className="w-5 h-5" />
                            Waitlisted
                        </div>
                        {program.waitlistPosition && (
                            <div className="text-sm font-semibold text-blue-700">
                                Position #{program.waitlistPosition}
                            </div>
                        )}
                    </div>
                );
            default:
                return (
                    <button
                        onClick={() => handleSendKite(program)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                        Send Kite
                    </button>
                );
        }
    };

    return (
        <div className="w-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Available Programs
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Browse and request to join educational programs
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Resident</p>
                            <p className="font-semibold text-gray-900">
                                {mockResident.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {mockResident.id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Toast */}
            {showConfirmation && (
                <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                        <p className="font-semibold">Kite sent successfully!</p>
                        <p className="text-sm text-green-100">
                            An administrator will review your request
                        </p>
                    </div>
                </div>
            )}

            {/* Programs List */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-4">
                    {programs.map((program) => (
                        <div
                            key={program.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {program.name}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {program.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>
                                            Capacity:{' '}
                                            <span className="font-medium text-gray-700">
                                                {program.enrolled}/
                                                {program.capacity}
                                            </span>
                                        </span>
                                        <span className="text-gray-300">•</span>
                                        <span>
                                            {program.capacity -
                                                program.enrolled >
                                            0
                                                ? `${
                                                      program.capacity -
                                                      program.enrolled
                                                  } spots available`
                                                : 'Currently full'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    {getStatusButton(program)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kite Modal */}
            {showKiteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Send Kite Request
                        </h2>
                        <div className="mb-6">
                            <p className="text-gray-700 mb-2">
                                You are requesting to join:
                            </p>
                            <p className="font-semibold text-lg text-gray-900">
                                {selectedProgram?.name}
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Note (Optional)
                            </label>
                            <textarea
                                value={kiteNote}
                                onChange={(e) => setKiteNote(e.target.value)}
                                placeholder="Include any relevant information (prerequisites completed, expected release date, etc.)"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                This note will help administrators review your
                                request
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelKite}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitKite}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Send Kite
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResidentProgramList;

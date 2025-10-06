import React, { useState } from 'react';
import { ChevronRight, Users, Clock, AlertCircle } from 'lucide-react';

// Mock data for all programs
const mockPrograms = [
    {
        id: 1,
        name: 'GED Program',
        description:
            'Prepare for and earn your General Educational Development certificate',
        capacity: 30,
        enrolled: 15,
        waitlistCount: 4,
        pendingKites: 3
    },
    {
        id: 2,
        name: 'College Math 101',
        description: 'Introduction to college-level mathematics',
        capacity: 25,
        enrolled: 20,
        waitlistCount: 8,
        pendingKites: 2
    },
    {
        id: 3,
        name: 'Career Readiness Workshop',
        description:
            'Build job search skills, resume writing, and interview techniques',
        capacity: 40,
        enrolled: 35,
        waitlistCount: 12,
        pendingKites: 5
    },
    {
        id: 4,
        name: 'Computer Literacy',
        description: 'Learn basic computer skills and software applications',
        capacity: 30,
        enrolled: 18,
        waitlistCount: 6,
        pendingKites: 1
    },
    {
        id: 5,
        name: 'Carpentry Training',
        description: 'Hands-on training in basic carpentry and woodworking',
        capacity: 15,
        enrolled: 15,
        waitlistCount: 20,
        pendingKites: 7
    },
    {
        id: 6,
        name: 'Business English',
        description:
            'Professional communication and writing skills for the workplace',
        capacity: 35,
        enrolled: 28,
        waitlistCount: 5,
        pendingKites: 0
    },
    {
        id: 7,
        name: 'Culinary Arts',
        description: 'Professional cooking techniques and kitchen safety',
        capacity: 20,
        enrolled: 12,
        waitlistCount: 3,
        pendingKites: 4
    },
    {
        id: 8,
        name: 'Welding Certification',
        description: 'Professional welding skills and safety certification',
        capacity: 12,
        enrolled: 12,
        waitlistCount: 15,
        pendingKites: 6
    }
];

function AdminProgramList() {
    const [programs] = useState(mockPrograms);

    const totalEnrolled = programs.reduce((sum, p) => sum + p.enrolled, 0);
    const totalWaitlisted = programs.reduce(
        (sum, p) => sum + p.waitlistCount,
        0
    );
    const totalPendingKites = programs.reduce(
        (sum, p) => sum + p.pendingKites,
        0
    );

    const handleProgramClick = (programId) => {
        // In a real app, this would navigate to the program detail page
        console.log(`Navigate to program ${programId}`);
    };

    return (
        <div>
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Program Management
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage enrollments, waitlists, and kite requests
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">
                                    Total Enrolled
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {totalEnrolled}
                                </p>
                            </div>
                            <Users className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">
                                    On Waitlists
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {totalWaitlisted}
                                </p>
                            </div>
                            <Clock className="w-12 h-12 text-amber-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">
                                    Pending Kites
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {totalPendingKites}
                                </p>
                            </div>
                            <AlertCircle className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Programs List */}
            <div className="px-4 sm:px-6 lg:px-8 pb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-900">
                            All Programs
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {programs.length} active programs
                        </p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {programs.map((program) => {
                            const isFull = program.enrolled >= program.capacity;
                            const spotsRemaining =
                                program.capacity - program.enrolled;
                            const hasPendingKites = program.pendingKites > 0;

                            return (
                                <button
                                    key={program.id}
                                    onClick={() =>
                                        handleProgramClick(program.id)
                                    }
                                    className="w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {program.name}
                                                </h3>
                                                {hasPendingKites && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {program.pendingKites}{' '}
                                                        pending
                                                    </span>
                                                )}
                                                {isFull && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        Full
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">
                                                {program.description}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-600">
                                                        Enrolled:{' '}
                                                        <span className="font-medium text-gray-900">
                                                            {program.enrolled}/
                                                            {program.capacity}
                                                        </span>
                                                    </span>
                                                    {!isFull && (
                                                        <span className="text-green-600 font-medium">
                                                            ({spotsRemaining}{' '}
                                                            available)
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-600">
                                                        Waitlist:{' '}
                                                        <span className="font-medium text-gray-900">
                                                            {
                                                                program.waitlistCount
                                                            }
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProgramList;

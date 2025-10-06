import React, { useState } from 'react';
import {
    ArrowLeft,
    Trash2,
    ArrowUp,
    ArrowDown,
    X,
    AlertCircle,
    UserPlus,
    FileText
} from 'lucide-react';

// Mock data
const mockProgram = {
    id: 1,
    name: 'GED Program',
    capacity: 30,
    enrolled: [
        {
            id: 1001,
            name: 'John Smith',
            residentId: 'R-1001',
            enrolledDate: '2024-09-15'
        },
        {
            id: 1002,
            name: 'Maria Garcia',
            residentId: 'R-1002',
            enrolledDate: '2024-09-18'
        },
        {
            id: 1003,
            name: 'David Lee',
            residentId: 'R-1003',
            enrolledDate: '2024-09-22'
        },
        {
            id: 1004,
            name: 'Sarah Johnson',
            residentId: 'R-1004',
            enrolledDate: '2024-10-01'
        },
        {
            id: 1005,
            name: 'Michael Brown',
            residentId: 'R-1005',
            enrolledDate: '2024-10-02'
        }
    ],
    waitlist: [
        {
            id: 2001,
            name: 'James Wilson',
            residentId: 'R-2001',
            requestedDate: '2024-09-25',
            notes: 'Completed prerequisite math course'
        },
        {
            id: 2002,
            name: 'Linda Martinez',
            residentId: 'R-2002',
            requestedDate: '2024-09-28',
            notes: ''
        },
        {
            id: 2003,
            name: 'Robert Taylor',
            residentId: 'R-2003',
            requestedDate: '2024-10-01',
            notes: 'Release date in 8 months'
        },
        {
            id: 2004,
            name: 'Patricia Anderson',
            residentId: 'R-2004',
            requestedDate: '2024-10-02',
            notes: ''
        }
    ],
    kites: [
        {
            id: 3001,
            name: 'Jennifer White',
            residentId: 'R-3001',
            timestamp: '2024-10-03T09:15:00',
            notes: 'I have completed the literacy assessment and would like to enroll.',
            status: 'pending'
        },
        {
            id: 3002,
            name: 'Christopher Davis',
            residentId: 'R-3002',
            timestamp: '2024-10-02T14:30:00',
            notes: '',
            status: 'confirmed'
        },
        {
            id: 3003,
            name: 'Amanda Rodriguez',
            residentId: 'R-3003',
            timestamp: '2024-09-25T11:20:00',
            notes: 'Release date: March 2026. Completed high school algebra.',
            status: 'pending'
        }
    ],
    auditLog: [
        {
            id: 1,
            action: 'enrolled',
            residentName: 'Michael Brown',
            residentId: 'R-1005',
            admin: 'Admin User',
            timestamp: '2024-10-02T14:30:00',
            details: 'Enrolled from waitlist position #2'
        },
        {
            id: 2,
            action: 'enrolled',
            residentName: 'Sarah Johnson',
            residentId: 'R-1004',
            admin: 'Admin User',
            timestamp: '2024-10-01T11:15:00',
            details: 'Enrolled from waitlist position #1'
        },
        {
            id: 3,
            action: 'waitlist_reordered',
            residentName: 'James Wilson',
            residentId: 'R-2001',
            admin: 'Admin User',
            timestamp: '2024-09-30T16:20:00',
            details: 'Position changed from #3 to #1'
        },
        {
            id: 4,
            action: 'removed_from_waitlist',
            residentName: 'Thomas Green',
            residentId: 'R-2005',
            admin: 'Admin User',
            timestamp: '2024-09-29T10:45:00',
            details: 'Removed from waitlist position #5'
        },
        {
            id: 5,
            action: 'added_to_waitlist',
            residentName: 'Patricia Anderson',
            residentId: 'R-2004',
            admin: 'Admin User',
            timestamp: '2024-09-28T14:00:00',
            details: 'Added to waitlist position #4'
        },
        {
            id: 6,
            action: 'kite_approved',
            residentName: 'Patricia Anderson',
            residentId: 'R-2004',
            admin: 'Admin User',
            timestamp: '2024-09-28T13:58:00',
            details: 'Kite approved and added to waitlist'
        },
        {
            id: 7,
            action: 'kite_confirmed',
            residentName: 'Patricia Anderson',
            residentId: 'R-2004',
            admin: 'Admin User',
            timestamp: '2024-09-28T09:30:00',
            details: 'Kite receipt confirmed'
        },
        {
            id: 8,
            action: 'removed_from_enrolled',
            residentName: 'Elizabeth White',
            residentId: 'R-1006',
            admin: 'Admin User',
            timestamp: '2024-09-27T15:00:00',
            details: 'Removed from program (graduated)'
        }
    ]
};

function ProgramDetailPage() {
    const [program, setProgram] = useState(mockProgram);
    const [dismissedAlerts, setDismissedAlerts] = useState([]);
    const [showAuditLog, setShowAuditLog] = useState(false);

    const enrollmentCount = program.enrolled.length;
    const capacity = program.capacity;
    const spotsAvailable = capacity - enrollmentCount;
    const hasWaitlist = program.waitlist.length > 0;
    const shouldShowAlert =
        spotsAvailable > 0 &&
        hasWaitlist &&
        !dismissedAlerts.includes('spot_available');

    // Calculate days since kite was submitted
    const getDaysOld = (timestamp) => {
        const kiteDate = new Date(timestamp);
        const today = new Date();
        const diffTime = Math.abs(today - kiteDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Handle confirm viewed action
    const handleConfirmViewed = (kiteId) => {
        setProgram((prev) => ({
            ...prev,
            kites: prev.kites.map((kite) =>
                kite.id === kiteId ? { ...kite, status: 'confirmed' } : kite
            )
        }));
    };

    // Handle add to waitlist action
    const handleAddToWaitlist = (kite) => {
        // Remove from kites
        const updatedKites = program.kites.filter((k) => k.id !== kite.id);

        // Add to waitlist
        const newWaitlistEntry = {
            id: kite.id,
            name: kite.name,
            residentId: kite.residentId,
            requestedDate: kite.timestamp.split('T')[0],
            notes: kite.notes
        };

        setProgram((prev) => ({
            ...prev,
            kites: updatedKites,
            waitlist: [...prev.waitlist, newWaitlistEntry]
        }));
    };

    // Handle remove from waitlist action
    const handleRemoveFromWaitlist = (residentId) => {
        setProgram((prev) => ({
            ...prev,
            waitlist: prev.waitlist.filter(
                (resident) => resident.id !== residentId
            )
        }));
    };

    // Handle move up in waitlist
    const handleMoveUp = (index) => {
        if (index === 0) return; // Already at top

        setProgram((prev) => {
            const newWaitlist = [...prev.waitlist];
            [newWaitlist[index - 1], newWaitlist[index]] = [
                newWaitlist[index],
                newWaitlist[index - 1]
            ];
            return { ...prev, waitlist: newWaitlist };
        });
    };

    // Handle move down in waitlist
    const handleMoveDown = (index) => {
        if (index === program.waitlist.length - 1) return; // Already at bottom

        setProgram((prev) => {
            const newWaitlist = [...prev.waitlist];
            [newWaitlist[index], newWaitlist[index + 1]] = [
                newWaitlist[index + 1],
                newWaitlist[index]
            ];
            return { ...prev, waitlist: newWaitlist };
        });
    };

    // Handle remove from enrolled list (graduate/complete/drop)
    const handleRemoveFromEnrolled = (studentId) => {
        setProgram((prev) => ({
            ...prev,
            enrolled: prev.enrolled.filter(
                (student) => student.id !== studentId
            )
        }));
    };

    // Handle dismiss alert
    const handleDismissAlert = () => {
        setDismissedAlerts((prev) => [...prev, 'spot_available']);
    };

    // Handle enroll from waitlist
    const handleEnrollFromWaitlist = (resident) => {
        // Remove from waitlist
        const updatedWaitlist = program.waitlist.filter(
            (r) => r.id !== resident.id
        );

        // Add to enrolled
        const newEnrollment = {
            id: resident.id,
            name: resident.name,
            residentId: resident.residentId,
            enrolledDate: new Date().toISOString().split('T')[0] // Today's date
        };

        setProgram((prev) => ({
            ...prev,
            waitlist: updatedWaitlist,
            enrolled: [...prev.enrolled, newEnrollment]
        }));

        // Reset dismissed alerts when enrolling (in case they need to see alert again)
        setDismissedAlerts([]);
    };

    const getActionLabel = (action) => {
        const labels = {
            enrolled: 'Enrolled',
            removed_from_enrolled: 'Removed from Program',
            added_to_waitlist: 'Added to Waitlist',
            removed_from_waitlist: 'Removed from Waitlist',
            waitlist_reordered: 'Waitlist Reordered',
            kite_confirmed: 'Kite Confirmed',
            kite_approved: 'Kite Approved'
        };
        return labels[action] || action;
    };

    const getActionColor = (action) => {
        const colors = {
            enrolled: 'text-green-700 bg-green-50',
            removed_from_enrolled: 'text-gray-700 bg-gray-50',
            added_to_waitlist: 'text-blue-700 bg-blue-50',
            removed_from_waitlist: 'text-red-700 bg-red-50',
            waitlist_reordered: 'text-purple-700 bg-purple-50',
            kite_confirmed: 'text-blue-700 bg-blue-50',
            kite_approved: 'text-green-700 bg-green-50'
        };
        return colors[action] || 'text-gray-700 bg-gray-50';
    };

    return (
        <div>
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="    px-4 sm:px-6 lg:px-8 py-4">
                    <button className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Programs
                    </button>
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {program.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="text-lg font-semibold text-gray-700">
                                Capacity:{' '}
                                <span className="text-blue-600">
                                    {enrollmentCount}/{capacity}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowAuditLog(!showAuditLog)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <FileText className="w-5 h-5" />
                                {showAuditLog ? 'Hide' : 'View'} Audit Log
                            </button>
                        </div>
                    </div>
                </div>

                {/* Audit Log Section */}
                {showAuditLog && (
                    <div className="bg-white rounded-lg shadow border border-gray-200 mt-8">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Audit Log
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Complete history of all actions for this program
                            </p>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {program.auditLog.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="px-6 py-4 hover:bg-gray-50"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(
                                                        entry.action
                                                    )}`}
                                                >
                                                    {getActionLabel(
                                                        entry.action
                                                    )}
                                                </span>
                                                <span className="text-sm text-gray-900 font-medium">
                                                    {entry.residentName}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({entry.residentId})
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-2">
                                                {entry.details}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span>
                                                    {new Date(
                                                        entry.timestamp
                                                    ).toLocaleString()}
                                                </span>
                                                <span className="text-gray-300">
                                                    •
                                                </span>
                                                <span>By: {entry.admin}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="    px-4 sm:px-6 lg:px-8 py-8">
                {/* Alert for available spot */}
                {shouldShowAlert && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-green-900">
                                    Spot Available
                                </h3>
                                <p className="text-sm text-green-800 mt-1">
                                    There {spotsAvailable === 1 ? 'is' : 'are'}{' '}
                                    {spotsAvailable} open{' '}
                                    {spotsAvailable === 1 ? 'spot' : 'spots'} in
                                    this program with {program.waitlist.length}{' '}
                                    {program.waitlist.length === 1
                                        ? 'person'
                                        : 'people'}{' '}
                                    on the waitlist.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismissAlert}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Dismiss alert"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Enrollment & Waitlist */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Currently Enrolled Section */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Currently Enrolled
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {enrollmentCount} students
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Resident ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Enrollment Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {program.enrolled.map((student) => (
                                            <tr
                                                key={student.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {student.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.residentId}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(
                                                        student.enrolledDate
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveFromEnrolled(
                                                                student.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                                                        title="Remove from program (graduate/complete/drop)"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Waitlist Section */}
                        <div className="bg-white rounded-lg shadow border-l-4 border-l-amber-500">
                            <div className="px-6 py-4 border-b border-gray-200 bg-amber-50">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Waitlist
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {program.waitlist.length} residents waiting
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Position
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Resident ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date Requested
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Notes
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {program.waitlist.map(
                                            (resident, index) => (
                                                <tr
                                                    key={resident.id}
                                                    className="hover:bg-amber-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                        #{index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {resident.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {resident.residentId}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            resident.requestedDate
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {resident.notes || (
                                                            <span className="text-gray-400 italic">
                                                                No notes
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleEnrollFromWaitlist(
                                                                        resident
                                                                    )
                                                                }
                                                                disabled={
                                                                    enrollmentCount >=
                                                                    capacity
                                                                }
                                                                className={`flex items-center gap-1 px-3 py-1.5 rounded font-medium transition-colors ${
                                                                    enrollmentCount >=
                                                                    capacity
                                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                        : 'bg-green-600 text-white hover:bg-green-700'
                                                                }`}
                                                                title={
                                                                    enrollmentCount >=
                                                                    capacity
                                                                        ? 'Program is at capacity'
                                                                        : 'Enroll in program'
                                                                }
                                                            >
                                                                <UserPlus className="w-4 h-4" />
                                                                Enroll
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleMoveUp(
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    index === 0
                                                                }
                                                                className={`p-2 rounded transition-colors ${
                                                                    index === 0
                                                                        ? 'text-gray-300 cursor-not-allowed'
                                                                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                                                                }`}
                                                                title="Move up"
                                                            >
                                                                <ArrowUp className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleMoveDown(
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    index ===
                                                                    program
                                                                        .waitlist
                                                                        .length -
                                                                        1
                                                                }
                                                                className={`p-2 rounded transition-colors ${
                                                                    index ===
                                                                    program
                                                                        .waitlist
                                                                        .length -
                                                                        1
                                                                        ? 'text-gray-300 cursor-not-allowed'
                                                                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                                                                }`}
                                                                title="Move down"
                                                            >
                                                                <ArrowDown className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleRemoveFromWaitlist(
                                                                        resident.id
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                                                                title="Remove from waitlist"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Pending Kites */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow sticky top-8">
                            <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Pending Kites
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {program.kites.length} requests awaiting
                                    review
                                </p>
                            </div>
                            <div className="divide-y divide-gray-200 overflow-y-auto">
                                {program.kites.length === 0 ? (
                                    <div className="px-6 py-8 text-center text-gray-500">
                                        <p className="text-sm italic">
                                            No pending kites
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Kites will appear here when
                                            residents submit requests
                                        </p>
                                    </div>
                                ) : (
                                    program.kites.map((kite) => {
                                        const daysOld = getDaysOld(
                                            kite.timestamp
                                        );
                                        const isOld = daysOld >= 7;

                                        return (
                                            <div
                                                key={kite.id}
                                                className="px-6 py-4 hover:bg-gray-50"
                                            >
                                                {/* Status and Age Badges */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            kite.status ===
                                                            'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-green-100 text-green-800'
                                                        }`}
                                                    >
                                                        {kite.status ===
                                                        'pending'
                                                            ? 'Pending'
                                                            : 'Confirmed'}
                                                    </span>
                                                    {isOld && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            ⚠️ {daysOld} days
                                                            old
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Resident Info */}
                                                <div className="mb-3">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {kite.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        ID: {kite.residentId}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Submitted:{' '}
                                                        {new Date(
                                                            kite.timestamp
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>

                                                {/* Optional Note */}
                                                {kite.notes && (
                                                    <div className="mb-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
                                                        <p className="font-medium text-xs text-gray-500 mb-1">
                                                            Note from resident:
                                                        </p>
                                                        <p>{kite.notes}</p>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="space-y-2">
                                                    {kite.status ===
                                                        'pending' && (
                                                        <button
                                                            onClick={() =>
                                                                handleConfirmViewed(
                                                                    kite.id
                                                                )
                                                            }
                                                            className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                                                        >
                                                            Confirm Viewed
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            handleAddToWaitlist(
                                                                kite
                                                            )
                                                        }
                                                        className={`w-full px-4 py-2 text-sm font-medium rounded transition-colors ${
                                                            kite.status ===
                                                            'confirmed'
                                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        }`}
                                                    >
                                                        Add to Waitlist
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgramDetailPage;

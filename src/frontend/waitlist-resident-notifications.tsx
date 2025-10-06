import React, { useState } from 'react';
import {
    Bell,
    CheckCircle,
    Clock,
    Award,
    ArrowUp,
    ArrowDown
} from 'lucide-react';

// Mock notifications data
const mockNotifications = [
    {
        id: 1,
        type: 'position_update',
        programName: 'GED Program',
        oldPosition: 7,
        newPosition: 5,
        timestamp: '2024-10-03T14:20:00',
        message:
            'Your position for GED Program has changed. You are now #5 on the waitlist.'
    },
    {
        id: 2,
        type: 'waitlist_added',
        programName: 'GED Program',
        position: 7,
        timestamp: '2024-10-03T10:30:00',
        message:
            'You have been added to the waitlist for GED Program. You are #7 on the waitlist.'
    },
    {
        id: 3,
        type: 'kite_confirmed',
        programName: 'Career Readiness Workshop',
        timestamp: '2024-10-02T15:45:00',
        message:
            'Your kite for Career Readiness Workshop has been acknowledged by an administrator.'
    },
    {
        id: 4,
        type: 'position_update',
        programName: 'Computer Literacy',
        oldPosition: 15,
        newPosition: 12,
        timestamp: '2024-10-02T11:30:00',
        message:
            'Your position for Computer Literacy has changed. You are now #12 on the waitlist.'
    },
    {
        id: 5,
        type: 'waitlist_added',
        programName: 'Computer Literacy',
        position: 15,
        timestamp: '2024-10-01T09:15:00',
        message:
            'You have been added to the waitlist for Computer Literacy. You are #15 on the waitlist.'
    },
    {
        id: 6,
        type: 'kite_confirmed',
        programName: 'Computer Literacy',
        timestamp: '2024-10-01T09:00:00',
        message:
            'Your kite for Computer Literacy has been acknowledged by an administrator.'
    },
    {
        id: 7,
        type: 'enrolled',
        programName: 'College Math 101',
        timestamp: '2024-09-28T14:20:00',
        message: 'You have been admitted to College Math 101.'
    },
    {
        id: 8,
        type: 'position_update',
        programName: 'College Math 101',
        oldPosition: 3,
        newPosition: 1,
        timestamp: '2024-09-27T16:45:00',
        message:
            'Your position for College Math 101 has changed. You are now #1 on the waitlist.'
    },
    {
        id: 9,
        type: 'waitlist_added',
        programName: 'College Math 101',
        position: 3,
        timestamp: '2024-09-25T11:30:00',
        message:
            'You have been added to the waitlist for College Math 101. You are #3 on the waitlist.'
    },
    {
        id: 10,
        type: 'kite_confirmed',
        programName: 'College Math 101',
        timestamp: '2024-09-25T10:15:00',
        message:
            'Your kite for College Math 101has been acknowledged by an administrator.'
    }
];

const mockResident = {
    name: 'Alex Martinez',
    id: 'R-3005'
};

function ResidentNotifications() {
    const [notifications] = useState(mockNotifications);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'kite_confirmed':
                return <CheckCircle className="w-6 h-6 text-blue-600" />;
            case 'waitlist_added':
                return <Clock className="w-6 h-6 text-amber-600" />;
            case 'enrolled':
                return <Award className="w-6 h-6 text-green-600" />;
            case 'position_update':
                return <ArrowUp className="w-6 h-6 text-purple-600" />;
            default:
                return <Bell className="w-6 h-6 text-gray-600" />;
        }
    };

    const getNotificationStyle = (type) => {
        switch (type) {
            case 'kite_confirmed':
                return 'border-l-4 border-l-blue-500 bg-blue-50';
            case 'waitlist_added':
                return 'border-l-4 border-l-amber-500 bg-amber-50';
            case 'enrolled':
                return 'border-l-4 border-l-green-500 bg-green-50';
            case 'position_update':
                return 'border-l-4 border-l-purple-500 bg-purple-50';
            default:
                return 'border-l-4 border-l-gray-300 bg-white';
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return `Today at ${date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            })}`;
        } else if (diffDays === 1) {
            return `Yesterday at ${date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            })}`;
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
    };

    return (
        <div className="w-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bell className="w-8 h-8 text-blue-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Notifications
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Updates about your program requests
                                </p>
                            </div>
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

            {/* Notifications List */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                {notifications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <Bell className="w-16 h-16 text-gray-300   mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            No notifications yet
                        </h2>
                        <p className="text-gray-600">
                            You'll see updates here when administrators review
                            your kite requests
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-white rounded-lg shadow-sm ${getNotificationStyle(
                                    notification.type
                                )} p-5 hover:shadow-md transition-shadow`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 leading-relaxed">
                                            {notification.message}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            {formatTimestamp(
                                                notification.timestamp
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Empty state helper text */}
            {notifications.length > 0 && (
                <div className="px-4 sm:px-6 lg:px-8 pb-8">
                    <p className="text-center text-sm text-gray-500">
                        Showing {notifications.length} notification
                        {notifications.length !== 1 ? 's' : ''}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ResidentNotifications;

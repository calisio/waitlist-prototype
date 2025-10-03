import React, { useState } from 'react';
import { Users, Bell } from 'lucide-react';

// Import all your components
import AdminProgramList from './frontend/waitlist-admin-program-list';
import AdminProgramDetail from './frontend/waitlist-admin-program-detail';
import ResidentPrograms from './frontend/waitlist-resident-programs';
import ResidentNotifications from './frontend/waitlist-resident-notifications';

type View = 'admin' | 'resident';
type AdminPage = 'list' | 'detail';
type ResidentPage = 'programs' | 'notifications';

function App() {
    const [currentView, setCurrentView] = useState<View>('admin');
    const [adminPage, setAdminPage] = useState<AdminPage>('list');
    const [residentPage, setResidentPage] = useState<ResidentPage>('programs');

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation Tabs */}
            <div className="bg-white border-b border-gray-300 shadow-sm">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setCurrentView('admin')}
                            className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                                currentView === 'admin'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Users className="w-5 h-5" />
                            Admin View
                        </button>
                        <button
                            onClick={() => setCurrentView('resident')}
                            className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                                currentView === 'resident'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <Bell className="w-5 h-5" />
                            Resident View
                        </button>
                    </div>
                </div>
            </div>

            {/* Admin View */}
            {currentView === 'admin' && (
                <div>
                    {/* Admin Sub-Navigation */}
                    <div className="bg-gray-50 border-b border-gray-200">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex gap-4 py-3">
                                <button
                                    onClick={() => setAdminPage('list')}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                        adminPage === 'list'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Program List
                                </button>
                                <button
                                    onClick={() => setAdminPage('detail')}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                        adminPage === 'detail'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Program Detail
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Admin Content */}
                    {adminPage === 'list' && <AdminProgramList />}
                    {adminPage === 'detail' && <AdminProgramDetail />}
                </div>
            )}

            {/* Resident View */}
            {currentView === 'resident' && (
                <div>
                    {/* Resident Sub-Navigation */}
                    <div className="bg-gray-50 border-b border-gray-200">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex gap-4 py-3">
                                <button
                                    onClick={() => setResidentPage('programs')}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                        residentPage === 'programs'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Programs
                                </button>
                                <button
                                    onClick={() =>
                                        setResidentPage('notifications')
                                    }
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                        residentPage === 'notifications'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Notifications
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Resident Content */}
                    {residentPage === 'programs' && <ResidentPrograms />}
                    {residentPage === 'notifications' && (
                        <ResidentNotifications />
                    )}
                </div>
            )}
        </div>
    );
}

export default App;

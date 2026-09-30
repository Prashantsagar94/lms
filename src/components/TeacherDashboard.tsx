import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Video,
  Plus,
  BookOpen,
  Users,
  Save,
  Check,
  Search,
  Sparkles,
  LogOut,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Course } from '../types';

export const TeacherDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    registeredUsers,
    attendance,
    teacherMarkAttendance,
    adminAddLesson,
    adminAddNewCourse,
    logoutUser
  } = useLMS();

  const [activeTab, setActiveTab] = useState<'attendance' | 'courses' | 'add_lesson'>('attendance');

  // Attendance states
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    currentUser.assignedCourseId || courses[0]?.id || 'silai-machine-operator'
  );
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [attendanceStatusMap, setAttendanceStatusMap] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>({});
  const [attendanceSavedMessage, setAttendanceSavedMessage] = useState<string>('');

  // Course & Lesson creation states
  const [targetCourseId, setTargetCourseId] = useState<string>(courses[0]?.id || '');
  const [targetModuleId, setTargetModuleId] = useState<string>(courses[0]?.modules[0]?.id || '');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDuration, setLessonDuration] = useState('15');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonKeyNotes, setLessonKeyNotes] = useState('');
  const [lessonSuccessMsg, setLessonSuccessMsg] = useState('');

  // New Course creation states
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseHindiTitle, setNewCourseHindiTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState<'Garment Making' | 'Embroidery' | 'Mehndi Art' | 'Beauty & Wellness'>('Garment Making');
  const [newCourseDuration, setNewCourseDuration] = useState('30');
  const [newCourseFee, setNewCourseFee] = useState('1799');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [courseSuccessMsg, setCourseSuccessMsg] = useState('');

  // Students enrolled in the selected course (from registeredUsers)
  const enrolledStudents = registeredUsers.filter(
    u => u.role === 'student' && (!u.assignedCourseId || u.assignedCourseId === selectedCourseId)
  );

  // Initialize today's status map from existing attendance records if present
  React.useEffect(() => {
    const existingForDate = attendance.filter(
      a => a.date === attendanceDate && a.courseId === selectedCourseId
    );

    const initialMap: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    enrolledStudents.forEach(stu => {
      const found = existingForDate.find(a => a.studentId === stu.id);
      initialMap[stu.id] = found ? found.status : 'PRESENT';
    });
    setAttendanceStatusMap(initialMap);
    setAttendanceSavedMessage('');
  }, [selectedCourseId, attendanceDate, registeredUsers.length]);

  const handleSaveAttendance = () => {
    const recordsToSave = enrolledStudents.map(stu => ({
      studentId: stu.id,
      studentName: stu.name,
      courseId: selectedCourseId,
      status: attendanceStatusMap[stu.id] || 'PRESENT',
      notes: `Classroom attendance verified by ${currentUser.name}`
    }));

    teacherMarkAttendance(attendanceDate, recordsToSave);
    setAttendanceSavedMessage(`Attendance saved for ${enrolledStudents.length} students on ${attendanceDate}!`);
    setTimeout(() => setAttendanceSavedMessage(''), 4000);
  };

  const handleAddLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCourseId || !targetModuleId || !lessonTitle || !lessonVideoUrl) return;

    const notesArray = lessonKeyNotes
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    adminAddLesson(targetCourseId, targetModuleId, {
      title: lessonTitle,
      durationMinutes: Number(lessonDuration) || 15,
      videoUrl: lessonVideoUrl,
      keyNotes: notesArray.length > 0 ? notesArray : ['Practical demonstration video']
    });

    setLessonSuccessMsg(`Video lesson "${lessonTitle}" added successfully!`);
    setLessonTitle('');
    setLessonVideoUrl('');
    setLessonKeyNotes('');
    setTimeout(() => setLessonSuccessMsg(''), 4000);
  };

  const handleAddNewCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle) return;

    const courseId = newCourseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCourseObj: Course = {
      id: courseId,
      title: newCourseTitle,
      hindiTitle: newCourseHindiTitle || newCourseTitle,
      category: newCourseCategory,
      durationDays: Number(newCourseDuration) || 30,
      fee: Number(newCourseFee) || 1799,
      originalFee: (Number(newCourseFee) || 1799) * 2,
      level: 'Beginner to Pro',
      rating: 4.9,
      reviewsCount: 1,
      enrolledStudentsCount: 0,
      shortDescription: newCourseDesc || `Professional practical training in ${newCourseTitle}`,
      fullDescription: newCourseDesc || `Comprehensive vocational course created by ${currentUser.name} under Director Prashant Sagar.`,
      learningOutcomes: [
        'Hands-on machinery operation',
        'Industry grading and precision',
        'Final practical exam & certification'
      ],
      prerequisites: ['No prior experience needed'],
      trainer: {
        name: currentUser.name,
        designation: 'Master Vocational Trainer',
        experience: '8+ Years',
        specialization: currentUser.assignedTrade || newCourseCategory
      },
      modules: [
        {
          id: `mod_${courseId}_1`,
          title: 'Module 1: Orientation & Fundamentals',
          lessons: []
        }
      ]
    };

    adminAddNewCourse(newCourseObj);
    setCourseSuccessMsg(`Course "${newCourseTitle}" created! You can now add video lessons to it.`);
    setNewCourseTitle('');
    setNewCourseHindiTitle('');
    setNewCourseDesc('');
    setTimeout(() => setCourseSuccessMsg(''), 4000);
  };

  const selectedCourseObj = courses.find(c => c.id === targetCourseId);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-slate-100">
      {/* Teacher Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#131B2E] to-amber-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
              Instructor Portal
            </span>
            <span aria-hidden="true">·</span>
            <span>Teacher ID: {currentUser.id}</span>
            <span aria-hidden="true">·</span>
            <span>Trade: {currentUser.assignedTrade || 'Vocational Craftsmanship'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Namaste, {currentUser.name}!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Welcome to your teaching station. You have authorized instructor permissions to take student daily attendance, upload new video lessons, and manage curriculum modules under Director Prashant Sagar.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={logoutUser}
            className="px-4 py-2.5 rounded-xl bg-slate-950/80 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-800 hover:border-red-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Teacher Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'attendance'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Take Student Attendance</span>
        </button>

        <button
          onClick={() => setActiveTab('add_lesson')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'add_lesson'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Add Video Lessons</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* TAB 1: ATTENDANCE MANAGER */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold font-display text-white">
                  Student Attendance Roster
                </h3>
                <p className="text-xs text-slate-400">
                  Select your course and date to record daily presence for each enrolled learner.
                </p>
              </div>

              {attendanceSavedMessage && (
                <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{attendanceSavedMessage}</span>
                </div>
              )}
            </div>

            {/* Controls: Course & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Vocational Trade / Course
                </label>
                <select
                  value={selectedCourseId}
                  onChange={e => setSelectedCourseId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.durationDays} Days)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Attendance Date
                </label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={e => setAttendanceDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="py-3 px-3">Student ID</th>
                    <th className="py-3 px-3">Student Name</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {enrolledStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No students enrolled in this trade yet. Admin can enroll students from the Admin Panel.
                      </td>
                    </tr>
                  ) : (
                    enrolledStudents.map(stu => {
                      const currentStatus = attendanceStatusMap[stu.id] || 'PRESENT';

                      return (
                        <tr key={stu.id} className="hover:bg-slate-800/30">
                          <td className="py-3 px-3 font-mono text-amber-300 font-bold">
                            {stu.id}
                          </td>
                          <td className="py-3 px-3 font-medium text-white">
                            {stu.name}
                          </td>
                          <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                            {stu.phone}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                currentStatus === 'PRESENT'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : currentStatus === 'LATE'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}
                            >
                              {currentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() =>
                                  setAttendanceStatusMap(prev => ({ ...prev, [stu.id]: 'PRESENT' }))
                                }
                                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                  currentStatus === 'PRESENT'
                                    ? 'bg-emerald-500 text-slate-950 font-bold'
                                    : 'bg-slate-800 text-slate-400 hover:text-emerald-400'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() =>
                                  setAttendanceStatusMap(prev => ({ ...prev, [stu.id]: 'ABSENT' }))
                                }
                                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                  currentStatus === 'ABSENT'
                                    ? 'bg-red-500 text-white font-bold'
                                    : 'bg-slate-800 text-slate-400 hover:text-red-400'
                                }`}
                              >
                                Absent
                              </button>
                              <button
                                onClick={() =>
                                  setAttendanceStatusMap(prev => ({ ...prev, [stu.id]: 'LATE' }))
                                }
                                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                  currentStatus === 'LATE'
                                    ? 'bg-amber-500 text-slate-950 font-bold'
                                    : 'bg-slate-800 text-slate-400 hover:text-amber-400'
                                }`}
                              >
                                Late
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {enrolledStudents.length > 0 && (
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Total {enrolledStudents.length} students in this batch
                </span>

                <button
                  onClick={handleSaveAttendance}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Batch Attendance ({attendanceDate})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ADD VIDEO LESSONS */}
      {activeTab === 'add_lesson' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-display text-white">
              Add New Video Lesson
            </h3>
            <p className="text-xs text-slate-400">
              Teachers can upload or link practical lesson videos (YouTube embed, MP4, or cloud video) to any module.
            </p>
          </div>

          {lessonSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{lessonSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleAddLessonSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Course *
                </label>
                <select
                  value={targetCourseId}
                  onChange={e => {
                    setTargetCourseId(e.target.value);
                    const selected = courses.find(c => c.id === e.target.value);
                    if (selected && selected.modules.length > 0) {
                      setTargetModuleId(selected.modules[0].id);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Module *
                </label>
                <select
                  value={targetModuleId}
                  onChange={e => setTargetModuleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {selectedCourseObj?.modules.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={e => setLessonTitle(e.target.value)}
                  placeholder="e.g. Masterclass on Concealed Zipper & Armhole Piping"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  min="2"
                  max="180"
                  value={lessonDuration}
                  onChange={e => setLessonDuration(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Video URL (YouTube embed, direct MP4, or stream URL) *
              </label>
              <input
                type="url"
                required
                value={lessonVideoUrl}
                onChange={e => setLessonVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/... or direct MP4 link"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Videos are streamed through HunarSetu DRM protection with dynamic student watermarking.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Key Learning Notes & Steps (one per line)
              </label>
              <textarea
                rows={3}
                value={lessonKeyNotes}
                onChange={e => setLessonKeyNotes(e.target.value)}
                placeholder="Check needle size 16&#10;Keep thread tension loose on lining&#10;Press with warm steam"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lesson to Course</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: CREATE NEW COURSE */}
      {activeTab === 'courses' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-display text-white">
              Create New Vocational Course
            </h3>
            <p className="text-xs text-slate-400">
              Instructors can introduce new specialized craftsmanship programs for their trade.
            </p>
          </div>

          {courseSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{courseSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleAddNewCourseSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Course Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Advanced Bridal Blouse Masterclass"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Course Title (Hindi)
                </label>
                <input
                  type="text"
                  value={newCourseHindiTitle}
                  onChange={e => setNewCourseHindiTitle(e.target.value)}
                  placeholder="e.g. एडवांस ब्राइडल ब्लाउज मास्टरक्लास"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Trade Category
                </label>
                <select
                  value={newCourseCategory}
                  onChange={e => setNewCourseCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Garment Making">Garment Making</option>
                  <option value="Embroidery">Embroidery</option>
                  <option value="Mehndi Art">Mehndi Art</option>
                  <option value="Beauty & Wellness">Beauty & Wellness</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  value={newCourseDuration}
                  onChange={e => setNewCourseDuration(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Enrollment Fee (₹)
                </label>
                <input
                  type="number"
                  value={newCourseFee}
                  onChange={e => setNewCourseFee(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description & Practical Curriculum
              </label>
              <textarea
                rows={3}
                value={newCourseDesc}
                onChange={e => setNewCourseDesc(e.target.value)}
                placeholder="Overview of practical techniques, machine handling, and client projects covered..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Course & Register in Catalog</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

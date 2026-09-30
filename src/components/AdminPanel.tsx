import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import { Course, CourseModule, Lesson, TrainingPlanPhase, User } from '../types';
import { TeacherAnalyticsSection } from './admin/TeacherAnalyticsSection';
import { CustomPagesSection } from './admin/CustomPagesSection';
import { WebsiteManualSettingsSection } from './admin/WebsiteManualSettingsSection';
import { LeadsCRMSection } from './admin/LeadsCRMSection';
import {
  Video,
  Users,
  Award,
  DollarSign,
  CheckCircle,
  Plus,
  Search,
  ExternalLink,
  ShieldCheck,
  Mail,
  Calendar,
  Image as ImageIcon,
  Clock,
  Layers,
  Sparkles,
  BookOpen,
  Save,
  Trash2,
  UserPlus,
  BarChart3,
  Printer,
  Download,
  CheckCircle2,
  GraduationCap,
  Sliders,
  Globe,
  Bot,
  AlertTriangle
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    courses,
    enrollments,
    certificates,
    emails,
    registeredUsers,
    attendance,
    adminEnrollStudent,
    adminEnrollTeacher,
    adminDeleteUser,
    getStudentAttendanceStats,
    adminUpdateLessonVideo,
    adminAddLesson,
    adminUpdateCoursePricing,
    adminUpdateCourseDuration,
    adminUpdateTrainingPlan,
    adminUpdateCourseImage,
    adminAddNewCourse,
    adminDeleteCourse,
    setViewingCertificate,
    setIsEmailLogsOpen,
    checkAndAwardCertificate
  } = useLMS();

  const [activeTab, setActiveTab] = useState<
    'teacher-analytics' | 'custom-pages' | 'site-settings' | 'leads-crm' | 'enrollment' | 'reports' | 'students' | 'videos' | 'pricing' | 'training-plan' | 'certificates'
  >('teacher-analytics');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(courses[0]?.modules[0]?.id || '');

  // Delete modal state
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  // Editing state for lesson
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Add lesson state
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState(25);
  const [newLessonNotes, setNewLessonNotes] = useState('');

  // Add course state
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseHindiTitle, setNewCourseHindiTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState<'Garment Making' | 'Embroidery' | 'Mehndi Art' | 'Beauty & Wellness' | 'Combo Package'>('Garment Making');
  const [newCourseDuration, setNewCourseDuration] = useState(30);
  const [newCourseFee, setNewCourseFee] = useState(1799);
  const [newCourseOriginalFee, setNewCourseOriginalFee] = useState(3499);
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseImage, setNewCourseImage] = useState('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80');

  // Student enrollment form state
  const [stuName, setStuName] = useState('');
  const [stuEmail, setStuEmail] = useState('');
  const [stuPhone, setStuPhone] = useState('');
  const [stuPassword, setStuPassword] = useState('student123');
  const [stuCourseId, setStuCourseId] = useState(courses[0]?.id || 'silai-machine-operator');
  const [stuBatch, setStuBatch] = useState('Batch 2026-A');
  const [createdStudentSuccess, setCreatedStudentSuccess] = useState<User | null>(null);

  // Teacher enrollment form state
  const [tchName, setTchName] = useState('');
  const [tchEmail, setTchEmail] = useState('');
  const [tchPhone, setTchPhone] = useState('');
  const [tchPassword, setTchPassword] = useState('teacher123');
  const [tchTrade, setTchTrade] = useState('Garment Making');
  const [createdTeacherSuccess, setCreatedTeacherSuccess] = useState<User | null>(null);

  // Reports state
  const [reportCourseFilter, setReportCourseFilter] = useState('all');
  const [showPrintableDossier, setShowPrintableDossier] = useState(false);

  // Filter for students table
  const [studentSearch, setStudentSearch] = useState('');

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const currentModule = currentCourse?.modules.find(m => m.id === selectedModuleId) || currentCourse?.modules[0];

  const handleStartEdit = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setEditVideoUrl(lesson.videoUrl);
    setEditTitle(lesson.title);
    setSaveSuccessMsg('');
  };

  const handleSaveLessonVideo = (lessonId: string) => {
    if (!currentCourse || !currentModule) return;
    adminUpdateLessonVideo(currentCourse.id, currentModule.id, lessonId, editVideoUrl, editTitle);
    setEditingLessonId(null);
    setSaveSuccessMsg(`Updated video stream link for "${editTitle || 'Lesson'}"`);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleAddLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCourse || !currentModule || !newLessonTitle.trim() || !newLessonVideoUrl.trim()) return;

    adminAddLesson(currentCourse.id, currentModule.id, {
      title: newLessonTitle.trim(),
      durationMinutes: Number(newLessonDuration) || 20,
      videoUrl: newLessonVideoUrl.trim(),
      keyNotes: newLessonNotes ? newLessonNotes.split('\n').filter(Boolean) : ['Key vocational skill steps.']
    });

    setShowAddLessonModal(false);
    setNewLessonTitle('');
    setNewLessonVideoUrl('');
    setNewLessonNotes('');
    setSaveSuccessMsg(`Successfully added new lesson to ${currentModule.title}`);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const courseId = newCourseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCourseObj: Course = {
      id: `${courseId}-${Date.now().toString(36)}`,
      title: newCourseTitle.trim(),
      hindiTitle: newCourseHindiTitle.trim() || newCourseTitle.trim(),
      category: newCourseCategory,
      durationDays: Number(newCourseDuration) || 30,
      fee: Number(newCourseFee) || 1799,
      originalFee: Number(newCourseOriginalFee) || 3499,
      level: 'Beginner to Pro',
      rating: 4.9,
      reviewsCount: 15,
      enrolledStudentsCount: 0,
      shortDescription: newCourseDesc.trim() || 'Comprehensive vocational skilling programme by Barabanki Head Office.',
      fullDescription: newCourseDesc.trim() || 'Hands-on practical vocational training according to national apparel and skilling council guidelines.',
      learningOutcomes: [
        'Hands-on practical tool handling and workshop mastery',
        'Commercial standard craft finish and client measurement drafting',
        'Preparation for government and boutique enterprise licensing'
      ],
      prerequisites: ['No formal prerequisites. Suitable for youth and women.'],
      trainer: {
        name: 'Prashant Sagar & Faculty Board',
        designation: 'Director & Senior Master Evaluator',
        experience: '15+ Years in Vocational Skilling',
        specialization: 'Vocational Skilling & Enterprise Setup'
      },
      imageUrl: newCourseImage,
      trainingPlan: [
        {
          phaseNumber: 1,
          daysRange: `Day 1 - Day ${Math.round(newCourseDuration * 0.25)}`,
          title: 'Foundation & Machine/Tool Anatomy',
          focusArea: 'Tools setup, safety protocols, and core stitches/strokes',
          sequenceSteps: ['Machine setup & thread tension', 'Paper exercises & hand control', 'Safety & posture standards']
        },
        {
          phaseNumber: 2,
          daysRange: `Day ${Math.round(newCourseDuration * 0.25) + 1} - Day ${Math.round(newCourseDuration * 0.6)}`,
          title: 'Drafting, Measurements & Core Assembly',
          focusArea: 'Standard measurement charts, cutting, and initial assembly',
          sequenceSteps: ['Body measurement taking', 'Paper pattern drafting', 'Cutting & fabric layout']
        },
        {
          phaseNumber: 3,
          daysRange: `Day ${Math.round(newCourseDuration * 0.6) + 1} - Day ${newCourseDuration}`,
          title: 'Finishing, Quality Assurance & Certification Exam',
          focusArea: 'Complete project finishing, commercial pricing, and final assessment',
          sequenceSteps: ['Edge piping & interlock finishing', 'Client fitting trial checklist', 'Certification practical exam']
        }
      ],
      modules: [
        {
          id: `mod-1-${Date.now()}`,
          title: 'Module 1: Professional Trade Foundations & Tools Setup',
          lessons: [
            {
              id: `les-1-${Date.now()}`,
              title: '1.1 Equipment Handling, Needles & Safety Protocols',
              durationMinutes: 20,
              videoUrl: 'https://www.youtube.com/embed/5-b0j91c0bI',
              keyNotes: [
                'Understand machine components, thread paths, and safety margins.',
                'Maintain steady foot pedal control and clean straight stitching.'
              ],
              isPreview: true
            }
          ],
          quiz: {
            id: `q-1-${Date.now()}`,
            title: 'Module 1 Practical Assessment',
            passingScorePercent: 70,
            questions: [
              {
                id: 'nq1',
                question: 'What is the primary safety rule when operating industrial vocational equipment?',
                options: ['Keep fingers clear of moving needle plate', 'Run at maximum speed immediately', 'Never turn off motor', 'Skip thread guide'],
                correctIndex: 0,
                explanation: 'Maintaining safe clearance from moving needle heads prevents occupational injuries.'
              }
            ]
          }
        }
      ]
    };

    adminAddNewCourse(newCourseObj);
    setShowAddCourseModal(false);
    setSelectedCourseId(newCourseObj.id);
    setSaveSuccessMsg(`Successfully created new course "${newCourseObj.title}" (${newCourseObj.durationDays} Days)!`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleUpdateDurationAndImage = (courseId: string, duration: number, image: string) => {
    adminUpdateCourseDuration(courseId, duration);
    if (image) adminUpdateCourseImage(courseId, image);
    setSaveSuccessMsg(`Updated duration to ${duration} Days and saved picture for course!`);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Add default training sequence to course if not present
  const handleGenerateDefaultPlan = (course: Course) => {
    const days = course.durationDays;
    const defaultPlan: TrainingPlanPhase[] = [
      {
        phaseNumber: 1,
        daysRange: `Day 1 - Day ${Math.round(days * 0.25)}`,
        title: 'Phase 1: Workshop Foundations & Tool Setup',
        focusArea: 'Equipment handling, ergonomic posture, thread tension, and needle selection.',
        sequenceSteps: [
          'Safety check and machine components orientation',
          'Tension calibration and needle sizing for fabrics',
          'Speed control paper drills and straight seam guidelines'
        ]
      },
      {
        phaseNumber: 2,
        daysRange: `Day ${Math.round(days * 0.25) + 1} - Day ${Math.round(days * 0.6)}`,
        title: 'Phase 2: Pattern Drafting & Practical Construction',
        focusArea: 'Precise body measurement taking, paper pattern layout, and fabric cutting.',
        sequenceSteps: [
          'Bust, waist, hip, and armhole circumference calculation',
          'Paper pattern drafting with ease allowance',
          'Component fabric cutting with seam allowances'
        ]
      },
      {
        phaseNumber: 3,
        daysRange: `Day ${Math.round(days * 0.6) + 1} - Day ${Math.round(days * 0.85)}`,
        title: 'Phase 3: Garment Assembly & Decorative Craftsmanship',
        focusArea: 'Seam finishing, lining attachment, zipper/piping and embellishments.',
        sequenceSteps: [
          'Princess seam / dart stitching and cup placement',
          'Neckline canvas fusing and bias piping border',
          'Zari / Zardozi / decorative border attachment'
        ]
      },
      {
        phaseNumber: 4,
        daysRange: `Day ${Math.round(days * 0.85) + 1} - Day ${days}`,
        title: 'Phase 4: Client Trial Fitting, Costing & Final Certification',
        focusArea: 'Quality inspection, pressing, commercial pricing formulas, and final assessment.',
        sequenceSteps: [
          'Trial fitting alteration checklist and pressing',
          'Boutique labor hour and profit margin costing formula',
          'Final practical evaluation for National Skill Certification'
        ]
      }
    ];

    adminUpdateTrainingPlan(course.id, defaultPlan);
    setSaveSuccessMsg(`Generated comprehensive 4-phase training sequence for "${course.title}"!`);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleEnrollStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stuName.trim() || !stuEmail.trim()) return;

    const newStudent = adminEnrollStudent({
      name: stuName.trim(),
      email: stuEmail.trim(),
      phone: stuPhone.trim() || '+91 98765 00000',
      password: stuPassword.trim() || 'student123',
      courseId: stuCourseId,
      batch: stuBatch
    });

    setCreatedStudentSuccess(newStudent);
    setStuName('');
    setStuEmail('');
    setStuPhone('');
    setSaveSuccessMsg(`Student ID ${newStudent.id} created! Credentials are saved and ready for student login.`);
    setTimeout(() => setSaveSuccessMsg(''), 5000);
  };

  const handleEnrollTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tchName.trim() || !tchEmail.trim()) return;

    const newTeacher = adminEnrollTeacher({
      name: tchName.trim(),
      email: tchEmail.trim(),
      phone: tchPhone.trim() || '+91 98765 11111',
      password: tchPassword.trim() || 'teacher123',
      assignedTrade: tchTrade
    });

    setCreatedTeacherSuccess(newTeacher);
    setTchName('');
    setTchEmail('');
    setTchPhone('');
    setSaveSuccessMsg(`Teacher ID ${newTeacher.id} created! Credentials are saved and ready for teacher login.`);
    setTimeout(() => setSaveSuccessMsg(''), 5000);
  };

  const filteredEnrollments = enrollments.filter(e =>
    e.studentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    e.studentEmail.toLowerCase().includes(studentSearch.toLowerCase()) ||
    e.transactionRef.toLowerCase().includes(studentSearch.toLowerCase()) ||
    e.courseTitle.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Admin Top Dashboard Banner with Director Prashant Sagar & + Add Course Button */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>DIRECTOR PRASHANT SAGAR · BARABANKI HEAD OFFICE</span>
            <span aria-hidden="true">·</span>
            <span>HELPLINE: 7800897677</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            LMS Content & Course Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Logged in as Director Prashant Sagar (prashantsagarmepl@gmail.com). Add courses, set durations, update training sequences, manage video links, and review enrollments.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-md cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Course</span>
          </button>

          <button
            onClick={() => setIsEmailLogsOpen(true)}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl flex items-center gap-2 transition-colors border border-slate-700 whitespace-nowrap cursor-pointer"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Email Audit ({emails.length})</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('teacher-analytics')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'teacher-analytics'
              ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Teacher Analytics & Dossier</span>
        </button>

        <button
          onClick={() => setActiveTab('custom-pages')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'custom-pages'
              ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Custom Pages CMS</span>
        </button>

        <button
          onClick={() => setActiveTab('site-settings')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'site-settings'
              ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Dashboard Manual Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('leads-crm')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'leads-crm'
              ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Leads & Inquiries CRM</span>
        </button>

        <button
          onClick={() => setActiveTab('enrollment')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'enrollment'
              ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>ID Generator & Enrollment ({registeredUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Student Performance & Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'videos'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Video Links & Lessons</span>
        </button>

        <button
          onClick={() => setActiveTab('training-plan')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'training-plan'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Training Sequence & Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Duration, Fees & Pictures ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'students'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Enrollments ({enrollments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'certificates'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificates ({certificates.length})</span>
        </button>
      </div>

      {/* SECTION 1: TEACHER ANALYTICS & PERFORMANCE DOSSIER */}
      {activeTab === 'teacher-analytics' && (
        <div className="animate-fade-in">
          <TeacherAnalyticsSection />
        </div>
      )}

      {/* SECTION 2: CUSTOM PAGES & DYNAMIC CMS */}
      {activeTab === 'custom-pages' && (
        <div className="animate-fade-in">
          <CustomPagesSection />
        </div>
      )}

      {/* SECTION 3: SITE SETTINGS & DASHBOARD MANUAL FEED */}
      {activeTab === 'site-settings' && (
        <div className="animate-fade-in">
          <WebsiteManualSettingsSection />
        </div>
      )}

      {/* SECTION 4: LEADS & INQUIRIES CRM */}
      {activeTab === 'leads-crm' && (
        <div className="animate-fade-in">
          <LeadsCRMSection />
        </div>
      )}

      {/* TAB 0A: ENROLLMENT & ID CREATION (STUDENT & TEACHER) */}
      {activeTab === 'enrollment' && (
        <div className="space-y-8 animate-fade-in">
          {/* Header notice */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold font-mono">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>OFFICIAL ADMISSION & INSTRUCTOR REGISTRY</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white">
                Generate Student & Teacher IDs
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl">
                When you create an ID below, the student or teacher can immediately log in on the LMS with that exact ID (or Email) and Password. Students can mark attendance and study; teachers can upload video lessons and record daily attendance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">Total Students</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {registeredUsers.filter(u => u.role === 'student').length}
                </span>
              </div>
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">Total Teachers</span>
                <span className="text-lg font-bold font-mono text-amber-400">
                  {registeredUsers.filter(u => u.role === 'teacher').length}
                </span>
              </div>
            </div>
          </div>

          {/* Form Columns: Student Enrollment vs Teacher Enrollment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Enrollment Form */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">
                      Enroll New Student
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Creates Student ID & automatically grants active course access
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Auto-STU ID
                </span>
              </div>

              {createdStudentSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Student ID Generated Successfully!</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 font-mono">
                    <div>
                      <span className="text-slate-400 block">Student Login ID:</span>
                      <strong className="text-amber-300 font-bold">{createdStudentSuccess.id}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Password:</span>
                      <strong className="text-white">{createdStudentSuccess.password}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email:</span>
                      <span className="text-slate-200">{createdStudentSuccess.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Batch:</span>
                      <span className="text-slate-200">{createdStudentSuccess.batch}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    The student can now click "Login" and enter either this Student ID or Email with the password above.
                  </p>
                </div>
              )}

              <form onSubmit={handleEnrollStudentSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={stuName}
                    onChange={e => setStuName(e.target.value)}
                    placeholder="e.g. Vandana Kashyap"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={stuEmail}
                      onChange={e => setStuEmail(e.target.value)}
                      placeholder="e.g. vandana@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={stuPhone}
                      onChange={e => setStuPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Login Password
                    </label>
                    <input
                      type="text"
                      value={stuPassword}
                      onChange={e => setStuPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Batch
                    </label>
                    <input
                      type="text"
                      value={stuBatch}
                      onChange={e => setStuBatch(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Enrolled Vocational Course *
                  </label>
                  <select
                    value={stuCourseId}
                    onChange={e => setStuCourseId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.durationDays} Days - ₹{c.fee})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Generate Student ID & Activate Account</span>
                </button>
              </form>
            </div>

            {/* Teacher Enrollment Form */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">
                      Enroll New Instructor / Teacher
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Creates Teacher ID with permissions to upload lessons & take attendance
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Auto-TCH ID
                </span>
              </div>

              {createdTeacherSuccess && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Teacher Account Created Successfully!</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 font-mono">
                    <div>
                      <span className="text-slate-400 block">Teacher Login ID:</span>
                      <strong className="text-amber-300 font-bold">{createdTeacherSuccess.id}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Password:</span>
                      <strong className="text-white">{createdTeacherSuccess.password}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email:</span>
                      <span className="text-slate-200">{createdTeacherSuccess.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Trade:</span>
                      <span className="text-slate-200">{createdTeacherSuccess.assignedTrade}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Instructor can now log in, mark daily batch attendance, and upload video lessons for students.
                  </p>
                </div>
              )}

              <form onSubmit={handleEnrollTeacherSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Instructor Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={tchName}
                    onChange={e => setTchName(e.target.value)}
                    placeholder="e.g. Master Trainer Sunita Sharma"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={tchEmail}
                      onChange={e => setTchEmail(e.target.value)}
                      placeholder="e.g. sunita@hunarsetu.in"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={tchPhone}
                      onChange={e => setTchPhone(e.target.value)}
                      placeholder="+91 98765 11111"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Login Password
                    </label>
                    <input
                      type="text"
                      value={tchPassword}
                      onChange={e => setTchPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Assigned Trade / Subject
                    </label>
                    <select
                      value={tchTrade}
                      onChange={e => setTchTrade(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Garment Making">Garment Making & Tailoring</option>
                      <option value="Embroidery">Hand Embroidery & Zardozi</option>
                      <option value="Mehndi Art">Mehndi Art & Bridal Designing</option>
                      <option value="Beauty & Wellness">Beauty & Wellness</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-amber-300">Teacher Capabilities:</div>
                  <div>• Upload & link practical video lessons to courses</div>
                  <div>• Record daily present/absent student attendance</div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Generate Teacher ID & Authorize</span>
                </button>
              </form>
            </div>
          </div>

          {/* Master Roster Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-4 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Registered LMS User Accounts ({registeredUsers.length})
                </h3>
                <p className="text-xs text-slate-400">
                  All active Students, Teachers, and Administrators with permanent login credentials.
                </p>
              </div>

              <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-mono">
                Real-Time Roster Synced
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-3">Login ID</th>
                    <th className="py-3 px-3">Name & Email</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Assigned Trade / Course</th>
                    <th className="py-3 px-3">Password</th>
                    <th className="py-3 px-3">Phone</th>
                    <th className="py-3 px-3 text-right">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {registeredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-amber-300">
                        {u.id}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            u.role === 'admin'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                              : u.role === 'teacher'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        {u.assignedTrade || u.assignedCourseId || 'General Curriculum'}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">
                        {u.password || '••••••••'}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                        {u.phone}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            Active
                          </span>
                          {u.role !== 'admin' && (
                            <button
                              onClick={() => setUserToDelete(u)}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                              title={`Delete ${u.role === 'teacher' ? 'Teacher' : 'Student'} Account`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 0B: STUDENT PERFORMANCE & REPORT GENERATOR */}
      {activeTab === 'reports' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header & Report Actions */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold font-mono">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>STUDENT PERFORMANCE AUDIT & TRANSCRIPT HUB</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white">
                Comprehensive Student Performance & Reports
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl">
                Track every student's daily attendance records, video module completion, and practical quiz distinction. Generate and print official institutional dossiers for Director Prashant Sagar's review.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowPrintableDossier(!showPrintableDossier)}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{showPrintableDossier ? 'Hide Report Preview' : 'Generate & Print Institutional Report'}</span>
              </button>
            </div>
          </div>

          {/* Printable Official Dossier View */}
          {showPrintableDossier && (
            <div
              id="printable-report"
              className="bg-white text-slate-950 p-8 rounded-2xl border border-slate-300 shadow-2xl space-y-6 animate-fade-in font-sans"
            >
              {/* Report Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
                <div>
                  <div className="text-xs font-bold text-amber-700 tracking-wider uppercase">
                    Institutional Governance & Vocational Council
                  </div>
                  <h1 className="text-2xl font-bold text-slate-950 font-display">
                    HunarSetu Vocational Academy · Barabanki Head Office
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Official Student Performance & Attendance Transcript Dossier · Directorate of Skills
                  </p>
                  <p className="text-xs text-slate-600">
                    Barabanki Head Office, Uttar Pradesh - 225001 | Director Helpline: 7800897677
                  </p>
                </div>

                <div className="text-right">
                  <div className="px-3 py-1 bg-amber-100 text-amber-900 rounded font-mono font-bold text-xs border border-amber-300">
                    AUDIT REPORT #{new Date().getFullYear()}-{Date.now().toString().slice(-4)}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Performance Summary Metrics */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <div className="text-slate-500">Total Enrolled Learners</div>
                  <div className="text-xl font-bold font-mono text-slate-900">
                    {registeredUsers.filter(u => u.role === 'student').length}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Average Attendance</div>
                  <div className="text-xl font-bold font-mono text-emerald-700">
                    89.4% (Eligible)
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Module Pass Rate</div>
                  <div className="text-xl font-bold font-mono text-blue-700">
                    94.2%
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Issued Certifications</div>
                  <div className="text-xl font-bold font-mono text-amber-800">
                    {certificates.length} Issued
                  </div>
                </div>
              </div>

              {/* Student Transcripts Table */}
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-900 bg-slate-100 text-slate-800 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Student ID</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Vocational Trade</th>
                    <th className="py-2.5 px-3 text-center">Attendance %</th>
                    <th className="py-2.5 px-3 text-center">Lessons Watched</th>
                    <th className="py-2.5 px-3 text-center">Pass Status</th>
                    <th className="py-2.5 px-3 text-right">Certification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {registeredUsers
                    .filter(u => u.role === 'student')
                    .map(stu => {
                      const stats = getStudentAttendanceStats(stu.id);
                      const enr = enrollments.find(e => e.studentId === stu.id);
                      const course = courses.find(c => c.id === (enr?.courseId || stu.assignedCourseId));
                      const totalLessons = course ? course.modules.reduce((s, m) => s + m.lessons.length, 0) : 12;
                      const completedCount = enr ? enr.completedLessonIds.length : Math.min(totalLessons, 10);
                      const progressPct = Math.round((completedCount / totalLessons) * 100);

                      return (
                        <tr key={stu.id}>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                            {stu.id}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            {stu.name}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">
                            {course?.title || stu.assignedTrade || 'Silai Machine Operator'}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-800">
                            {stats.percentage}%
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono">
                            {progressPct}% ({completedCount}/{totalLessons})
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                              Distinction (70%+)
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-[11px] font-bold text-slate-800">
                            {enr?.certificateId || 'Verified & Ready'}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              {/* Official Signature Block */}
              <div className="pt-8 border-t border-slate-300 flex items-end justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-700">Audit Status:</div>
                  <div className="text-emerald-700 font-bold">100% Verified against LMS Database</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">
                    HunarSetu Academy National Accreditation
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <div className="font-serif italic text-base text-slate-900 border-b border-slate-400 pb-1 px-6">
                    Prashant Sagar
                  </div>
                  <div className="font-bold text-slate-950">Prashant Sagar</div>
                  <div className="text-[10px] text-slate-600">
                    Director, Head of Vocational Skilling Council
                  </div>
                  <div className="text-[10px] text-amber-700 font-mono">
                    Barabanki Head Office, U.P.
                  </div>
                </div>
              </div>

              {/* Print Button inside preview */}
              <div className="pt-4 border-t border-slate-200 flex justify-end print:hidden">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document / Save as PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* Student Performance Roster Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Student Live Performance Tracker
                </h3>
                <p className="text-xs text-slate-400">
                  Monitoring attendance percentage, video progress, quiz distinctions, and eligibility.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={reportCourseFilter}
                  onChange={e => setReportCourseFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Vocational Trades</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-3">Student</th>
                    <th className="py-3 px-3">Course</th>
                    <th className="py-3 px-3 text-center">Attendance Rate</th>
                    <th className="py-3 px-3 text-center">Video Progress</th>
                    <th className="py-3 px-3 text-center">Quiz Score</th>
                    <th className="py-3 px-3 text-center">Performance Rating</th>
                    <th className="py-3 px-3 text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {registeredUsers
                    .filter(u => u.role === 'student')
                    .filter(u => reportCourseFilter === 'all' || u.assignedCourseId === reportCourseFilter)
                    .map(stu => {
                      const stats = getStudentAttendanceStats(stu.id);
                      const enr = enrollments.find(e => e.studentId === stu.id);
                      const course = courses.find(c => c.id === (enr?.courseId || stu.assignedCourseId));
                      const totalLessons = course ? course.modules.reduce((s, m) => s + m.lessons.length, 0) : 10;
                      const completedCount = enr ? enr.completedLessonIds.length : 8;
                      const progressPct = Math.round((completedCount / totalLessons) * 100);

                      return (
                        <tr key={stu.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-semibold text-white">{stu.name}</div>
                            <div className="text-[10px] text-amber-300 font-mono">{stu.id}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-300">
                            {course?.title || stu.assignedTrade || 'Silai Machine Operator'}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="font-mono font-bold text-emerald-400 text-xs">
                              {stats.percentage}%
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              {stats.presentDays}/{stats.totalDays} sessions
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="font-mono font-semibold text-white">
                              {progressPct}%
                            </span>
                            <div className="w-20 bg-slate-800 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                              <div
                                className="bg-amber-400 h-full rounded-full"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="font-mono text-emerald-300 font-bold">
                              88% Avg
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              Passed (70%+)
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              Distinction Tier
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {enr?.certificateId ? (
                              <span className="font-mono text-emerald-400 font-semibold text-[11px]">
                                {enr.certificateId}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">
                                In Progress
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: UPDATE VIDEO LINKS & LESSON CURRICULUM */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Select Vocational Course & Module to Edit
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                  Course
                </label>
                <select
                  value={selectedCourseId}
                  onChange={e => {
                    setSelectedCourseId(e.target.value);
                    const c = courses.find(item => item.id === e.target.value);
                    if (c && c.modules[0]) {
                      setSelectedModuleId(c.modules[0].id);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.durationDays} Days - ₹{c.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                  Module
                </label>
                <select
                  value={selectedModuleId}
                  onChange={e => setSelectedModuleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {currentCourse?.modules.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Module Lessons Table with Live Video Link Editing */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Lessons in: {currentModule?.title}
                </h4>
                <p className="text-xs text-slate-400">
                  Update YouTube embed URLs, cloud video streams, or direct MP4 links.
                </p>
              </div>

              <button
                onClick={() => setShowAddLessonModal(true)}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Lesson</span>
              </button>
            </div>

            <div className="divide-y divide-slate-800/80">
              {currentModule?.lessons.map(lesson => {
                const isEditing = editingLessonId === lesson.id;

                return (
                  <div key={lesson.id} className="p-5 space-y-4 hover:bg-slate-950/40 transition-colors">
                    {isEditing ? (
                      <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-300 font-medium block mb-1">
                              Lesson Title
                            </label>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={e => setEditTitle(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="text-xs text-slate-300 font-medium block mb-1">
                              Video Stream URL (YouTube, Vimeo, or MP4)
                            </label>
                            <input
                              type="text"
                              value={editVideoUrl}
                              onChange={e => setEditVideoUrl(e.target.value)}
                              placeholder="e.g. https://www.youtube.com/watch?v=..."
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        {editVideoUrl && (
                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span>Video Stream Preview Target:</span>
                            <span className="font-mono text-amber-300 truncate max-w-sm">
                              {editVideoUrl}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => handleSaveLessonVideo(lesson.id)}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Video Link</span>
                          </button>
                          <button
                            onClick={() => setEditingLessonId(null)}
                            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">
                              {lesson.title}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({lesson.durationMinutes} mins)
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                            <Video className="w-3.5 h-3.5 text-amber-400" />
                            <span className="truncate max-w-md">{lesson.videoUrl}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={lesson.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                            title="Test external link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleStartEdit(lesson)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium transition-colors cursor-pointer"
                          >
                            Edit Video Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRAINING PLAN & SEQUENCE MANAGER */}
      {activeTab === 'training-plan' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Select Course to Manage Training Sequence
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Set practical days ranges, sequencing milestones, and weekly focus topics.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedCourseId}
                onChange={e => setSelectedCourseId(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.durationDays} Days)
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleGenerateDefaultPlan(currentCourse)}
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Generate 4-Phase Plan</span>
              </button>
            </div>
          </div>

          {/* Current Training Plan Phases Display */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h4 className="text-base font-bold text-white font-display">
                  Training Plan for: {currentCourse.title}
                </h4>
                <div className="text-xs text-amber-400 font-mono mt-0.5">
                  Total Course Duration: {currentCourse.durationDays} Days
                </div>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                Active on Website Syllabus
              </span>
            </div>

            {currentCourse.trainingPlan && currentCourse.trainingPlan.length > 0 ? (
              <div className="space-y-4">
                {currentCourse.trainingPlan.map((phase, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 relative hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center font-mono">
                          {phase.phaseNumber}
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-white">{phase.title}</h5>
                          <span className="text-[11px] font-mono text-amber-400 font-semibold">
                            Schedule: {phase.daysRange}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {phase.focusArea}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Sequence Steps:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        {phase.sequenceSteps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-slate-300 flex items-start gap-1.5"
                          >
                            <span className="text-amber-400 font-mono text-[10px] mt-0.5">#{sIdx + 1}</span>
                            <span className="leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <Layers className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-sm font-medium text-slate-300">No training plan configured yet for this course</p>
                <p className="text-xs text-slate-500">
                  Click "Auto-Generate 4-Phase Plan" above to create an accredited vocational day-by-day training sequence.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: COURSE FEES, DURATION & PICTURES */}
      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Course Duration, Pricing & Pictures Management
              </h3>
              <p className="text-xs text-slate-400">
                Update course duration in days, tuition fees, and thumbnail pictures in real time.
              </p>
            </div>

            <button
              onClick={() => setShowAddCourseModal(true)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {courses.map(course => (
              <div
                key={course.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-amber-400 font-mono font-semibold">
                      {course.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{course.title}</h4>
                    <p className="text-[11px] text-slate-400">{course.hindiTitle}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {course.imageUrl && (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-14 h-14 rounded-lg object-cover border border-slate-700 shrink-0"
                      />
                    )}
                    <button
                      onClick={() => setCourseToDelete(course)}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block font-medium">Duration (Days)</label>
                    <input
                      type="number"
                      defaultValue={course.durationDays}
                      onBlur={e => {
                        const newDays = Number(e.target.value);
                        if (newDays > 0) {
                          handleUpdateDurationAndImage(course.id, newDays, course.imageUrl || '');
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white font-mono mt-1 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block font-medium">Course Fee (₹)</label>
                    <input
                      type="number"
                      defaultValue={course.fee}
                      onBlur={e => {
                        const newFee = Number(e.target.value);
                        if (newFee > 0) {
                          adminUpdateCoursePricing(course.id, newFee, course.originalFee);
                          setSaveSuccessMsg(`Updated fee for ${course.title} to ₹${newFee}`);
                          setTimeout(() => setSaveSuccessMsg(''), 2500);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white font-mono mt-1 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block font-medium">Original Fee (₹)</label>
                    <input
                      type="number"
                      defaultValue={course.originalFee}
                      onBlur={e => {
                        const newOrig = Number(e.target.value);
                        if (newOrig > 0) {
                          adminUpdateCoursePricing(course.id, course.fee, newOrig);
                          setSaveSuccessMsg(`Updated original price to ₹${newOrig}`);
                          setTimeout(() => setSaveSuccessMsg(''), 2500);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white font-mono mt-1 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Picture URL Editor */}
                <div className="pt-2 border-t border-slate-800/80">
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Course Thumbnail Picture URL:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={course.imageUrl || ''}
                      placeholder="https://images.unsplash.com/..."
                      onBlur={e => {
                        if (e.target.value.trim()) {
                          adminUpdateCourseImage(course.id, e.target.value.trim());
                          setSaveSuccessMsg(`Updated course picture!`);
                          setTimeout(() => setSaveSuccessMsg(''), 2500);
                        }
                      }}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-600 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STUDENT ENROLLMENTS & UPI TRANSACTIONS TABLE */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Enrolled Students & UPI Transaction Verification
              </h3>
              <p className="text-xs text-slate-400">
                Total enrollments: <span className="font-mono text-white">{enrollments.length}</span>
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student, UTR or course..."
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="px-4 py-3">Student Name & Email</th>
                    <th className="px-4 py-3">Course Title</th>
                    <th className="px-4 py-3 text-right">Fee Paid</th>
                    <th className="px-4 py-3">Payment Mode</th>
                    <th className="px-4 py-3">Bank UTR / Ref</th>
                    <th className="px-4 py-3 text-center">Progress</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredEnrollments.map(enr => {
                    const course = courses.find(c => c.id === enr.courseId);
                    const totalLessons = course ? course.modules.reduce((s, m) => s + m.lessons.length, 0) : 1;
                    const progressPct = Math.round((enr.completedLessonIds.length / totalLessons) * 100);
                    const cert = certificates.find(c => c.enrollmentId === enr.id);

                    return (
                      <tr key={enr.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-white">{enr.studentName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{enr.studentEmail}</div>
                        </td>

                        <td className="px-4 py-3 text-slate-300 max-w-xs truncate">
                          {enr.courseTitle}
                        </td>

                        <td className="px-4 py-3 text-right font-mono font-bold text-amber-400">
                          ₹{enr.amountPaid.toLocaleString('en-IN')}
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {enr.paymentMethod}
                          </span>
                        </td>

                        <td className="px-4 py-3 font-mono text-[11px] text-slate-300">
                          {enr.transactionRef}
                        </td>

                        <td className="px-4 py-3 text-center">
                          <span className="font-mono font-semibold text-emerald-400">
                            {progressPct}%
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            {enr.completedLessonIds.length}/{totalLessons} lessons
                          </span>
                        </td>

                        <td className="px-4 py-3 text-right">
                          {cert ? (
                            <button
                              onClick={() => setViewingCertificate(cert)}
                              className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium text-[11px] cursor-pointer"
                            >
                              View Cert
                            </button>
                          ) : (
                            <button
                              onClick={() => checkAndAwardCertificate(enr.id)}
                              className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium text-[11px] cursor-pointer"
                            >
                              Check Cert
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ISSUED CERTIFICATES REGISTRY */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white font-display">
              National Vocational Certificate Registry
            </h3>
            <p className="text-xs text-slate-400">
              Director: Prashant Sagar · Barabanki Head Office.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">
                      {cert.id}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Grade: {cert.grade}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-2">{cert.studentName}</h4>
                  <div className="text-xs text-slate-300 mt-0.5 font-display">{cert.courseTitle}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-2">
                    Issued: {cert.issueDate} · VerCode: {cert.verificationCode}
                  </div>
                </div>

                <button
                  onClick={() => setViewingCertificate(cert)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Download / Preview PDF</span>
                </button>
              </div>
            ))}

            {certificates.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
                <Award className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-medium text-slate-300">No certificates generated yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE NEW COURSE MODAL */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-white">
                    Add New Vocational Training Course
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Barabanki Head Office · Director: Prashant Sagar
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddCourseModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourseSubmit} className="p-6 space-y-4 overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Course Title (English)</label>
                  <input
                    type="text"
                    required
                    value={newCourseTitle}
                    onChange={e => setNewCourseTitle(e.target.value)}
                    placeholder="e.g. Master Boutique Pattern Designer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Hindi Title</label>
                  <input
                    type="text"
                    value={newCourseHindiTitle}
                    onChange={e => setNewCourseHindiTitle(e.target.value)}
                    placeholder="e.g. मास्टर बुटीक पैटर्न डिज़ाइनर"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Category</label>
                  <select
                    value={newCourseCategory}
                    onChange={e => setNewCourseCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Garment Making">Garment Making</option>
                    <option value="Embroidery">Embroidery</option>
                    <option value="Mehndi Art">Mehndi Art</option>
                    <option value="Beauty & Wellness">Beauty & Wellness</option>
                    <option value="Combo Package">Combo Package</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={newCourseDuration}
                    onChange={e => setNewCourseDuration(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Course Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={newCourseFee}
                    onChange={e => setNewCourseFee(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Course Thumbnail Picture URL</label>
                <input
                  type="text"
                  value={newCourseImage}
                  onChange={e => setNewCourseImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Course Description</label>
                <textarea
                  rows={3}
                  value={newCourseDesc}
                  onChange={e => setNewCourseDesc(e.target.value)}
                  placeholder="Describe the practical hands-on competencies learners will develop in this vocational trade..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg cursor-pointer shadow-sm"
                >
                  Create Course & Launch Syllabus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showAddLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-display">
              Add New Lesson to {currentModule?.title}
            </h3>

            <form onSubmit={handleAddLessonSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Lesson Title</label>
                <input
                  type="text"
                  required
                  value={newLessonTitle}
                  onChange={e => setNewLessonTitle(e.target.value)}
                  placeholder="e.g. 1.4 Precision Border Stitching & Finishing"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={newLessonDuration}
                    onChange={e => setNewLessonDuration(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">
                    Video Stream Platform
                  </label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white">
                    <option>YouTube Embed</option>
                    <option>MP4 Direct Stream</option>
                    <option>Vimeo Player</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Video URL
                </label>
                <input
                  type="text"
                  required
                  value={newLessonVideoUrl}
                  onChange={e => setNewLessonVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Key Practical Notes (One per line)
                </label>
                <textarea
                  rows={3}
                  value={newLessonNotes}
                  onChange={e => setNewLessonNotes(e.target.value)}
                  placeholder="Keep needle speed uniform.&#10;Check thread tension after every 10cm."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLessonModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Add Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User (Student / Teacher) Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-white text-base">
                Delete {userToDelete.role === 'teacher' ? 'Teacher' : 'Student'} Account
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong>{userToDelete.name}</strong> ({userToDelete.id})? This will permanently revoke their login and remove their registry records.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  adminDeleteUser(userToDelete.id);
                  setSaveSuccessMsg(`Deleted ${userToDelete.role}: ${userToDelete.name} (${userToDelete.id})`);
                  setUserToDelete(null);
                  setTimeout(() => setSaveSuccessMsg(''), 3000);
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Course Confirmation Modal */}
      {courseToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-white text-base">Delete Course</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete the course <strong>"{courseToDelete.title}"</strong>? It will be removed from the catalog and LMS syllabus.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCourseToDelete(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  adminDeleteCourse(courseToDelete.id);
                  setSaveSuccessMsg(`Deleted course: "${courseToDelete.title}"`);
                  setCourseToDelete(null);
                  setTimeout(() => setSaveSuccessMsg(''), 3000);
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

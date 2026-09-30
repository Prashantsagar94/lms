export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  password?: string;
  assignedCourseId?: string;
  assignedTrade?: string;
  batch?: string;
  avatarUrl?: string;
  joinedAt: string;
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  studentId: string;
  studentName: string;
  courseId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  markedBy: 'SELF' | 'TEACHER' | 'ADMIN';
  timestamp: string;
  notes?: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string; // YouTube embed, MP4, or cloud video link
  videoType?: 'youtube' | 'mp4' | 'vimeo';
  keyNotes: string[];
  isPreview?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: {
    id: string;
    title: string;
    passingScorePercent: number;
    questions: QuizQuestion[];
  };
}

export interface TrainingPlanPhase {
  phaseNumber: number;
  daysRange: string; // e.g. "Day 1 - Day 7"
  title: string;
  focusArea: string;
  sequenceSteps: string[];
}

export interface Course {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'Garment Making' | 'Embroidery' | 'Mehndi Art' | 'Beauty & Wellness' | 'Combo Package';
  durationDays: number;
  fee: number;
  originalFee: number;
  level: 'Beginner to Pro' | 'Intermediate' | 'Advanced Masterclass';
  rating: number;
  reviewsCount: number;
  enrolledStudentsCount: number;
  shortDescription: string;
  fullDescription: string;
  learningOutcomes: string[];
  prerequisites: string[];
  trainer: {
    name: string;
    designation: string;
    experience: string;
    specialization: string;
  };
  modules: CourseModule[];
  trainingPlan?: TrainingPlanPhase[];
  imageUrl?: string;
  badgeText?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  amountPaid: number;
  paymentMethod: 'UPI_QR' | 'UPI_ID' | 'CARD' | 'NETBANKING';
  transactionRef: string;
  enrolledAt: string;
  status: 'ACTIVE' | 'COMPLETED';
  completedLessonIds: string[];
  passedQuizIds: string[];
  certificateId?: string;
  certificateIssuedDate?: string;
}

export interface CertificateRecord {
  id: string; // e.g. HS-CERT-2026-9042
  enrollmentId: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  courseCategory: string;
  durationDays: number;
  grade: 'A+' | 'A' | 'Distinction';
  issueDate: string;
  verificationCode: string;
  authorizedSignatory: string;
}

export interface EmailNotification {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  type: 'ENROLLMENT_CONFIRMATION' | 'PAYMENT_RECEIPT' | 'MODULE_MILESTONE' | 'CERTIFICATE_ISSUED';
  sentAt: string;
  body: string;
}

export interface LeaderboardLearner {
  id: string;
  rank: number;
  name: string;
  city: string;
  avatarUrl: string;
  courseId: string;
  courseTitle: string;
  category: 'Garment Making' | 'Embroidery' | 'Mehndi Art' | 'Beauty & Wellness' | 'Combo Package';
  completionDays: number;
  totalCourseDays: number;
  quizScorePercent: number;
  lessonsCompleted: number;
  totalLessons: number;
  badge: string;
  kudosCount: number;
  isCurrentUser?: boolean;
}

export interface TeacherAnalyticsReport {
  teacherId: string;
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  assignedTrade: string;
  assignedCourseId?: string;
  assignedCourseTitle?: string;
  totalAssignedCourses: number;
  totalEnrolledStudents: number;
  activeStudents: number;
  completedStudents: number;
  studentEngagementScore: number; // percentage (attendance + lesson progress weight)
  attendanceRatePercent: number;
  avgQuizScorePercent: number;
  courseCompletionRatePercent: number;
  quizzesConducted: number;
  performanceGrade: 'A+' | 'A' | 'B+' | 'B' | 'Needs Improvement';
  ratingScore: number; // out of 5.0
  automatedSummary: string;
  keyStrengths: string[];
  recommendedActions: string[];
  topPerformingStudents: {
    studentId: string;
    studentName: string;
    courseTitle: string;
    quizScore: number;
    completionPercent: number;
  }[];
  generatedAt: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  hindiTitle?: string;
  category: 'General' | 'Workshops' | 'Syllabus' | 'Notice' | 'Success Stories' | 'Career';
  content: string;
  bannerImageUrl?: string;
  metaDescription?: string;
  isPublished: boolean;
  showInHeader: boolean;
  showInFooter: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteManualSettings {
  customDomain?: string;
  websiteUrl?: string;
  announcementTicker: string;
  heroHeadline: string;
  heroSubheadline: string;
  helplinePhone: string;
  helplineEmail: string;
  headOfficeAddress: string;
  directorName: string;
  directorMessage: string;
  statsTrainedStudents: number;
  statsPlacementRate: number;
  statsPartnerCenters: number;
  statsSkillCertificates: number;
  bannerAlertActive: boolean;
}

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  interestedCourseId?: string;
  interestedCourseTitle?: string;
  learningGoal?: string;
  source: 'AI_BOT' | 'WEBSITE_HERO' | 'FRANCHISE_MODAL' | 'CUSTOM_PAGE';
  status: 'NEW' | 'CONTACTED' | 'ENROLLED' | 'FOLLOW_UP' | 'ARCHIVED';
  notes?: string;
  capturedAt: string;
  aiSuggestedCourse?: string;
}


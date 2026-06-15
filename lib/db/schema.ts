import { pgTable, text, timestamp, boolean, integer, numeric, jsonb } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- Clinivex App Tables ---------------------------------------------------

// Doctor Profile
export const doctorProfile = pgTable('doctor_profile', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  specialization: text('specialization').notNull(),
  licenseNumber: text('licenseNumber').notNull().unique(),
  experience: integer('experience').notNull(), // years
  clinic: text('clinic').notNull(),
  location: text('location').notNull(),
  phone: text('phone').notNull(),
  consultationFee: numeric('consultationFee', { precision: 10, scale: 2 }).notNull(),
  rating: numeric('rating', { precision: 3, scale: 2 }).default('0'),
  totalPatients: integer('totalPatients').default(0),
  workingHours: jsonb('workingHours').default('{}'),
  bio: text('bio'),
  isActive: boolean('isActive').default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Patient Profile
export const patientProfile = pgTable('patient_profile', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  dateOfBirth: timestamp('dateOfBirth'),
  gender: text('gender'), // 'male', 'female', 'other'
  phone: text('phone').notNull(),
  address: text('address'),
  bloodGroup: text('bloodGroup'),
  medicalHistory: jsonb('medicalHistory').default('[]'),
  allergies: text('allergies'),
  emergencyContact: text('emergencyContact'),
  emergencyPhone: text('emergencyPhone'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Appointments
export const appointments = pgTable('appointments', {
  id: text('id').primaryKey(),
  patientId: text('patientId').notNull(),
  doctorId: text('doctorId').notNull(),
  appointmentDate: timestamp('appointmentDate').notNull(),
  timeSlot: text('timeSlot').notNull(), // e.g., "10:00-10:30"
  reason: text('reason').notNull(),
  status: text('status').notNull().default('scheduled'), // scheduled, completed, cancelled
  notes: text('notes'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Queue Management
export const queue = pgTable('queue', {
  id: text('id').primaryKey(),
  doctorId: text('doctorId').notNull(),
  patientId: text('patientId').notNull(),
  appointmentId: text('appointmentId').notNull(),
  position: integer('position').notNull(),
  status: text('status').notNull().default('waiting'), // waiting, current, completed, no-show
  estimatedWaitTime: integer('estimatedWaitTime'), // minutes
  actualWaitTime: integer('actualWaitTime'), // minutes
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Doctor Availability/Schedule
export const schedule = pgTable('schedule', {
  id: text('id').primaryKey(),
  doctorId: text('doctorId').notNull(),
  dayOfWeek: integer('dayOfWeek').notNull(), // 0-6 (Sun-Sat)
  startTime: text('startTime').notNull(), // HH:mm format
  endTime: text('endTime').notNull(),
  isAvailable: boolean('isAvailable').default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Analytics/Metrics
export const consultation = pgTable('consultation', {
  id: text('id').primaryKey(),
  doctorId: text('doctorId').notNull(),
  patientId: text('patientId').notNull(),
  appointmentId: text('appointmentId').notNull(),
  duration: integer('duration').notNull(), // minutes
  revenue: numeric('revenue', { precision: 10, scale: 2 }).notNull(),
  consultationDate: timestamp('consultationDate').notNull(),
  diagnosis: text('diagnosis'),
  prescription: text('prescription'),
  followUpRequired: boolean('followUpRequired').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

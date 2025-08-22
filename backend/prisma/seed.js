const {PrismaClient,Role,ApplicationStatus} =require("@prisma/client")
const bcrypt = require('bcryptjs')


const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Hash passwords
  const passwordEmployer = await bcrypt.hash('employer123', 10)
  const passwordDev1 = await bcrypt.hash('dev123', 10)
  const passwordDev2 = await bcrypt.hash('dev456', 10)

  // Create Users
  const employer = await prisma.user.create({
    data: {
      email: 'employer@company.com',
      password: passwordEmployer,
      fullName: 'Alice Employer',
      role: Role.EMPLOYER,
    },
  })

  const dev1 = await prisma.user.create({
    data: {
      email: 'dev1@example.com',
      password: passwordDev1,
      fullName: 'Bob Developer',
      role: Role.DEVELOPER,
    },
  })

  const dev2 = await prisma.user.create({
    data: {
      email: 'dev2@example.com',
      password: passwordDev2,
      fullName: 'Charlie Developer',
      role: Role.DEVELOPER,
    },
  })

  // Create Jobs
  const job1 = await prisma.job.create({
    data: {
      title: 'Fullstack Developer',
      description: 'We are looking for a skilled Fullstack Developer with React & Node.js experience.',
      createdBy: { connect: { id: employer.id } },
    },
  })

  const job2 = await prisma.job.create({
    data: {
      title: 'UI/UX Designer',
      description: 'Design engaging user interfaces for our SaaS products.',
      createdBy: { connect: { id: employer.id } },
    },
  })

  // Create Applications
  await prisma.application.create({
    data: {
      status: ApplicationStatus.APPLIED,
      resumeUrl: 'https://example.com/resume-bob.pdf',
      job: { connect: { id: job1.id } },
      applicant: { connect: { id: dev1.id } },
    },
  })

  await prisma.application.create({
    data: {
      status: ApplicationStatus.SHORTLISTED,
      resumeUrl: 'https://example.com/resume-charlie.pdf',
      job: { connect: { id: job1.id } },
      applicant: { connect: { id: dev2.id } },
    },
  })

  await prisma.application.create({
    data: {
      status: ApplicationStatus.REJECTED,
      job: { connect: { id: job2.id } },
      applicant: { connect: { id: dev1.id } },
    },
  })

  console.log('✅ Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

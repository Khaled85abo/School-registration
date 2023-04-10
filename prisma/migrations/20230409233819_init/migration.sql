-- CreateTable
CREATE TABLE "SigleVisit" (
    "id" SERIAL NOT NULL,
    "studentsCount" INTEGER NOT NULL,
    "teachersCount" INTEGER NOT NULL,
    "havePayedTour" BOOLEAN NOT NULL,
    "school" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "municipality" TEXT,
    "country" TEXT,
    "teacher" TEXT NOT NULL,
    "museumId" INTEGER NOT NULL,

    CONSTRAINT "SigleVisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Museum" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Museum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "studentsCount" INTEGER NOT NULL,
    "teachersCount" INTEGER NOT NULL,
    "havePayedTour" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "grade" TEXT NOT NULL,
    "local" BOOLEAN NOT NULL,
    "municipality" TEXT,
    "country" TEXT,
    "teacherId" INTEGER,
    "museumId" INTEGER NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Museum_name_key" ON "Museum"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Museum_email_key" ON "Museum"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Museum_phone_key" ON "Museum"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");

-- CreateIndex
CREATE UNIQUE INDEX "School_email_key" ON "School"("email");

-- CreateIndex
CREATE UNIQUE INDEX "School_phone_key" ON "School"("phone");

-- AddForeignKey
ALTER TABLE "SigleVisit" ADD CONSTRAINT "SigleVisit_museumId_fkey" FOREIGN KEY ("museumId") REFERENCES "Museum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_museumId_fkey" FOREIGN KEY ("museumId") REFERENCES "Museum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

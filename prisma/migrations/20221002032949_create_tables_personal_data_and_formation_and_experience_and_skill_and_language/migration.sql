-- CreateTable
CREATE TABLE "personalsDatas" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "imageUser" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "numberPhone" VARCHAR(11) NOT NULL,
    "postalCode" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "birthday" VARCHAR(255) NOT NULL,
    "driverLicense" VARCHAR(255) NOT NULL,
    "linkedin" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "personalsDatas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formations" (
    "id" SERIAL NOT NULL,
    "formation" VARCHAR(255) NOT NULL,
    "institution" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "monthStart" VARCHAR(2) NOT NULL,
    "yearStart" VARCHAR(4) NOT NULL,
    "monthEnd" VARCHAR(2) NOT NULL,
    "yearEnd" VARCHAR(4) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "personalDataId" INTEGER NOT NULL,

    CONSTRAINT "formations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" SERIAL NOT NULL,
    "occupation" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "monthStart" VARCHAR(2) NOT NULL,
    "yearStart" VARCHAR(4) NOT NULL,
    "monthEnd" VARCHAR(2) NOT NULL,
    "yearEnd" VARCHAR(4) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "personalDataId" INTEGER NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "skill" VARCHAR(255) NOT NULL,
    "personalDataId" INTEGER NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "personalDataId" INTEGER NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "personalsDatas" ADD CONSTRAINT "personalsDatas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formations" ADD CONSTRAINT "formations_personalDataId_fkey" FOREIGN KEY ("personalDataId") REFERENCES "personalsDatas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_personalDataId_fkey" FOREIGN KEY ("personalDataId") REFERENCES "personalsDatas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_personalDataId_fkey" FOREIGN KEY ("personalDataId") REFERENCES "personalsDatas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_personalDataId_fkey" FOREIGN KEY ("personalDataId") REFERENCES "personalsDatas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

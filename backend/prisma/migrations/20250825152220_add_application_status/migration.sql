-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "requirements" JSONB,
    "responsibilities" JSONB,
    "location" TEXT,
    "aboutCompany" TEXT,
    "companyName" TEXT DEFAULT 'Private Company',
    "logo" TEXT,
    "salary" TEXT,
    "posted" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "category" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    CONSTRAINT "jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_jobs" ("aboutCompany", "category", "companyName", "description", "featured", "id", "location", "logo", "posted", "requirements", "responsibilities", "salary", "title", "type", "updatedAt", "userId") SELECT "aboutCompany", "category", "companyName", "description", "featured", "id", "location", "logo", "posted", "requirements", "responsibilities", "salary", "title", "type", "updatedAt", "userId" FROM "jobs";
DROP TABLE "jobs";
ALTER TABLE "new_jobs" RENAME TO "jobs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

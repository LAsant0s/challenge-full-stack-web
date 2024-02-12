import { Student } from "../entities/Student";
import { StudentsRepositoryMock } from "../repositories/students/StudentsRepositoryMock";
import { StudentsService } from "../services/StudentsService";
import { PaginationRequestError } from "../errors/PaginationRequestError";
import crypto from 'crypto';

const generate = function (): string {
  return crypto.randomBytes(10).toString('hex');
}
const studentsRepositoryMock = new StudentsRepositoryMock();
const studentsService = new StudentsService(studentsRepositoryMock);
let students: Student[] = [];

describe(
  "Use case: list registered students", () => {
    afterEach(async () => {
      for (const student of students) {
        await studentsService.deleteStudent(student.ra);
      }
      students = [];
    });

    test("Should get all Students", async () => {
      students.push(
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null },
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null },
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null }
      );

      for (const student of students) {
        await studentsService.createStudent(student);
      }

      const { totalStudents, students: paginatedStudents } = await studentsService.getStudents(1, 5, "");

      expect(totalStudents).toBe(3);
      expect(paginatedStudents.length).toBe(3);
    });

    test("Should get page 3 of students with 2 students per page", async () => {
      students.push(
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null },
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null },
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null },
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null },
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null },
        { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null }
      );

      for (const student of students) {
        await studentsService.createStudent(student);
      }

      const { students: pagenatedStudents, totalStudents } = await studentsService.getStudents(3, 2, "");

      expect(totalStudents).toBe(6);
      expect(pagenatedStudents.length).toBe(2);
      expect(pagenatedStudents[0].ra).toBe(students[4].ra);
      expect(pagenatedStudents[1].ra).toBe(students[5].ra);
    });

    test("Should validate paging parameters", async () => {
      expect(async () => await studentsService.getStudents(-1, 5, "")).rejects.toThrow(new PaginationRequestError());
      expect(async () => await studentsService.getStudents(1, -5, "")).rejects.toThrow(new PaginationRequestError());
    });
  }
)
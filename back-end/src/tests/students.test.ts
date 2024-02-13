import { Student } from "../entities/Student";
import { StudentsRepositoryMock } from "../repositories/students/StudentsRepositoryMock";
import { StudentsService } from "../services/StudentsService";
import { PaginationRequestError } from "../errors/PaginationRequestError";
import crypto from 'crypto';
import { InvalidRequestError } from "../errors/InvalidRequestError";
import { ResourceConflictError } from "../errors/ResourceConflictError";
import { ResourceNotFound } from "../errors/ResourceNotFound";

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
);

describe("Use case: register new student", () => {
  test("Should register a new student", async () => {
    const student = { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    await studentsService.createStudent(student);

    const registeredStudent = await studentsService.getStudent(student.ra);

    expect(registeredStudent).toEqual(student);
  });

  test("Should validate student data", async () => {
    const studentWithoutRA = { ra: null, name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    const studentWithoutEmail = { ra: null, name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    const studentWithoutDoc = { ra: null, name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    const studentWithoutName = { ra: null, name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };

    expect(async () => await studentsService.createStudent(studentWithoutRA)).rejects.toThrow(new InvalidRequestError());
    expect(async () => await studentsService.createStudent(studentWithoutEmail)).rejects.toThrow(new InvalidRequestError());
    expect(async () => await studentsService.createStudent(studentWithoutDoc)).rejects.toThrow(new InvalidRequestError());
    expect(async () => await studentsService.createStudent(studentWithoutName)).rejects.toThrow(new InvalidRequestError());
  });

  test("Should not register a student with the same RA", async () => {
    const student = { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    await studentsService.createStudent(student);

    expect(async () => await studentsService.createStudent(student)).rejects.toThrow(new ResourceConflictError());
  });
});

describe("Use case: edit student data", () => {
  test("Should edit student data", async () => {
    const student = { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    await studentsService.createStudent(student);

    const insertedStudent = await studentsService.getStudent(student.ra);

    expect(insertedStudent).toEqual(student);

    let updatedStudent = { ...insertedStudent, name: generate(), email: generate() };
    updatedStudent = await studentsService.updateStudent(student.ra, updatedStudent);

    const registeredStudent = await studentsService.getStudent(student.ra);

    expect(registeredStudent).toEqual(updatedStudent);
  });

  test("Should not update a non-existing student", async () => {
    const student = { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    expect(async () => await studentsService.updateStudent(student.ra, student)).rejects.toThrow(new ResourceNotFound());
  });

  test("Should validate request required data", async () => {
    const student = { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    await studentsService.createStudent(student);

    const insertedStudent = await studentsService.getStudent(student.ra);

    const studentWithRequiredData = { ra: generate(), name: generate(), email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };
    const studentWithoutEmail = { ra: student.ra, name: generate(), email: null, doc: generate(), createdAt: new Date(), updatedAt: null };
    const studentWithoutName = { ra: student.ra, name: null, email: generate(), doc: generate(), createdAt: new Date(), updatedAt: null };

    expect(async () => await studentsService.updateStudent(null, studentWithRequiredData)).rejects.toThrow(new InvalidRequestError());
    expect(async () => await studentsService.updateStudent(insertedStudent.ra, studentWithoutEmail)).rejects.toThrow(new InvalidRequestError());
    expect(async () => await studentsService.updateStudent(insertedStudent.ra, studentWithoutName)).rejects.toThrow(new InvalidRequestError());
  });
});
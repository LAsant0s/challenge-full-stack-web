import { Student } from "../../entities/Student";

interface IStudentsRepository {
  getStudents(page: number, limit: number, searchTerm: string): Promise<Student[]>;

  getStudent(ra: string): Promise<Student>;

  getTotalStudentsCount(searchTerm: string): Promise<number>;

  deleteStudent(ra: string): Promise<void>;

  createStudent(student: Student): Promise<Student>;
}

export { IStudentsRepository };
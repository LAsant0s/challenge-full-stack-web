import { QueryResult } from "pg";
import { Student } from "../../entities/Student";
import { IStudentsRepository } from "../interfaces/IStudentsRepository";

class StudentsRepositoryMock implements IStudentsRepository {
  private mockStudents: Array<Student> = [];

  public async createStudent(student: Student): Promise<void> {
    this.mockStudents.push(student);
  }

  public async getStudents(page = 1, limit = 5, search: string): Promise<Student[]> {
    const searchTerm = search.toLowerCase();

    return new Promise(resolve => {
      const data = { rows: this.mockStudents, rowCount: this.mockStudents.length } as QueryResult<Student>;

      const returningArray = data.rows.filter(student => {
        return student.doc.toLowerCase().includes(searchTerm) || student.name.toLowerCase().includes(searchTerm)
          || student.email.toLowerCase().includes(searchTerm) || student.ra.toLowerCase().includes(searchTerm);
      }).slice((page - 1) * limit, page * limit);

      resolve(returningArray);
    });
  }

  public async getTotalStudentsCount(searchTerm: string): Promise<number> {
    return new Promise(resolve => {
      const data = { rows: this.mockStudents, rowCount: this.mockStudents.length } as QueryResult<Student>;

      const totalStudents = data.rows.filter(student => {
        return student.doc.toLowerCase().includes(searchTerm) || student.name.toLowerCase().includes(searchTerm)
          || student.email.toLowerCase().includes(searchTerm) || student.ra.toLowerCase().includes(searchTerm);
      }).length;

      resolve(totalStudents);
    });
  }

  public deleteStudent(ra: string): Promise<void> {
    return new Promise(resolve => {
      this.mockStudents = this.mockStudents.filter(student => student.ra !== ra);
      resolve();
    });
  }
}

export { StudentsRepositoryMock }
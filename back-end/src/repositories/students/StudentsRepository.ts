import { Pool } from "pg";
import { createConnection } from "../../database/infra/connection";
import { Student } from "../../entities/Student";
import { IStudentsRepository } from "../interfaces/IStudentsRepository";

class StudentsRepository implements IStudentsRepository {
  private connection: Pool;

  constructor() {
    createConnection().then(connection => {
      this.connection = connection;
    });
  }

  public async getStudents(page = 1, limit = 5, searchTerm: string): Promise<Student[]> {

    const data = await this.connection.query(
      "SELECT * FROM SM.STUDENTS WHERE RA ILIKE $1 OR NAME ILIKE $1 OR EMAIL ILIKE $1 OR DOC ILIKE $1 LIMIT $2 OFFSET $3",
      [`%${searchTerm}%`, limit, (page - 1) * limit]
    );
    return data.rows as Student[];
  }

  public async getTotalStudentsCount(searchTerm: string): Promise<number> {
    const data = await this.connection.query(
      "SELECT COUNT(*) FROM SM.STUDENTS WHERE RA ILIKE $1 OR NAME ILIKE $1 OR EMAIL ILIKE $1 OR DOC ILIKE $1",
      [`%${searchTerm}%`]
    );

    return data.rows[0].count;
  }

  public async deleteStudent(ra: string): Promise<void> { }

  public async createStudent(student: Student): Promise<void> { }
}

export { StudentsRepository }
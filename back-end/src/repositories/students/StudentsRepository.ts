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

  public async getStudent(ra: string): Promise<Student> {
    const data = await this.connection.query(
      "SELECT * FROM SM.STUDENTS WHERE RA = $1 LIMIT 1",
      [ra]
    );

    return data.rows[0] as Student;
  }

  public async deleteStudent(ra: string): Promise<void> {
    await this.connection.query(
      "DELETE FROM SM.STUDENTS WHERE RA = $1",
      [ra]
    );
  }

  public async createStudent(student: Student): Promise<Student> {
    const { ra, name, email, doc } = student;

    const data = await this.connection.query(
      "INSERT INTO SM.STUDENTS(RA, NAME, EMAIL, DOC) VALUES($1, $2, $3, $4) RETURNING *",
      [ra, name, email, doc]
    );

    return data.rows[0] as Student;
  }

  public async updateStudent(ra: string, student: Student): Promise<Student> {
    const { name, email } = student;

    const data = await this.connection.query(
      "UPDATE SM.STUDENTS SET NAME = $1, EMAIL = $2 WHERE RA = $3 RETURNING *",
      [name, email, ra]
    );

    return data.rows[0] as Student;
  }
}

export { StudentsRepository }
import { Pool } from "pg";
import { createConnection } from "../../database/infra/connection";
import { Student } from "../../entities/Student";
import { IStudentsRepository } from "./IStudentsRepository";

class StudentsRepository implements IStudentsRepository {
  public async getStudents() { }
}

export { StudentsRepository }
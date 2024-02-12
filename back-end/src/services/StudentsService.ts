import { Student } from "../entities/Student";
import { InvalidRequestError } from "../errors/InvalidRequestError";
import { PaginationRequestError } from "../errors/PaginationRequestError";
import { ResourceConflictError } from "../errors/ResourceConflictError";
import { IStudentsRepository } from "../repositories/interfaces/IStudentsRepository";

class StudentsService {

  constructor(private studentsRepository: IStudentsRepository) { }

  public async getStudents(page: number, limit: number, search: string) {
    const pageIndex = !page && page !== 0 ? 1 : page;
    const numLimit = !limit && limit !== 0 ? 5 : limit;

    if (limit < 1 || page < 1) throw new PaginationRequestError();

    const students = await this.studentsRepository.getStudents(pageIndex, numLimit, search);
    const totalStudents = await this.studentsRepository.getTotalStudentsCount(search);

    return { students, totalStudents };
  }

  public async getStudent(ra: string) {
    if (!ra) throw new InvalidRequestError();
    return this.studentsRepository.getStudent(ra);
  }

  public async createStudent(student: Student) {
    const { ra, name, email, doc } = student;
    if (!ra || !name || !email || !doc || doc?.length < 11) throw new InvalidRequestError();

    const studentExists = await this.studentsRepository.getStudent(ra);
    if (studentExists) throw new ResourceConflictError();

    return this.studentsRepository.createStudent(student);
  }

  public async deleteStudent(ra: string) {
    return this.studentsRepository.deleteStudent(ra);
  }
}

export { StudentsService };
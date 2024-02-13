import { Student } from "../entities/Student";
import { InvalidRequestError } from "../errors/InvalidRequestError";
import { PaginationRequestError } from "../errors/PaginationRequestError";
import { ResourceConflictError } from "../errors/ResourceConflictError";
import { ResourceNotFound } from "../errors/ResourceNotFound";
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
    const student = await this.studentsRepository.getStudent(ra) || {} as Student;
    return student;
  }

  public async createStudent(student: Student) {
    const { ra, name, email, doc } = student;
    if (!ra || !name || !email || !doc || doc?.length < 11) throw new InvalidRequestError();

    const studentExists = await this.studentsRepository.getStudent(ra);
    if (studentExists) throw new ResourceConflictError();

    return this.studentsRepository.createStudent(student);
  }

  public async updateStudent(ra: string, student: Student) {
    const { name, email } = student;
    if (!ra || !name || !email) throw new InvalidRequestError();

    const studentExists = await this.studentsRepository.getStudent(ra);
    if (!studentExists) throw new ResourceNotFound();

    return this.studentsRepository.updateStudent(ra, student);
  }

  public async deleteStudent(ra: string) {
    if (!ra) throw new InvalidRequestError();

    const studentExists = await this.studentsRepository.getStudent(ra);
    if (!studentExists) throw new ResourceNotFound();

    return this.studentsRepository.deleteStudent(ra);
  }
}

export { StudentsService };
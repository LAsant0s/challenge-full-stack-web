import { Student } from "../entities/Student";
import { PaginationRequestError } from "../errors/PaginationRequestError";
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

  public async createStudent(student: Student) {
    return this.studentsRepository.createStudent(student);
  }

  public async deleteStudent(ra: string) {
    return this.studentsRepository.deleteStudent(ra);
  }
}

export { StudentsService };
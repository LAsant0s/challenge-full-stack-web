import { Student } from "../../entities/Student";
import { StudentsService } from "../../services/StudentsService";
import { NextFunction, Request, Response } from "express";

class StudentsController {
  constructor(private studentsService: StudentsService) { }

  createStudent(student: Student) { };

  async getStudents(request: Request, response: Response, next: NextFunction) {
    try {
      const page = Number(request.query.page);
      const limit = Number(request.query.limit);
      const search = request.query.search ? String(request.query.search) : "";

      const students = await this.studentsService.getStudents(page, limit, search);
      return response.status(200).json(students);
    } catch (error) {
      next(error);
    }
  };

  getStudent(ra: number) { };

  updateStudent(ra: number) { };

  deleteStudent(ra: number) { };
}

export { StudentsController };
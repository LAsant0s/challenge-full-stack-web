import { NextFunction, Router, Request, Response } from "express";
import { StudentsService } from "../services/StudentsService";
import { StudentsRepository } from "../repositories/students/StudentsRepository";
import { StudentsController } from "../controllers/students/StudentsController";

const router = Router();

const studentsRepository = new StudentsRepository();
const studentsService = new StudentsService(studentsRepository);
const studentsController = new StudentsController(studentsService);

router.post("/students", async (req: Request, res: Response, next: NextFunction) => {

});

router.get("/students", async (req: Request, res: Response, next: NextFunction) => {
  studentsController.getStudents(req, res, next);
});

router.get("/students/:ra", async (req: Request, res: Response) => {
});

router.put("/students/:ra", async (req: Request, res: Response) => {
});

router.delete("/students/:ra", async (req: Request, res: Response) => {
});

export { router }
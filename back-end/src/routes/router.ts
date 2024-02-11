import { Router } from "express";
import { Request, Response } from 'express';
import { StudentsRepository } from "../repositories/students/StudentsRepository";
import { StudentsService } from "../services/StudentsService";

const router = Router();


router.post("/students", async (req: Request, res: Response) => {
});

router.get("/students", async (req: Request, res: Response) => {
});

router.get("/students/:ra", async (req: Request, res: Response) => {
});

router.put("/students/:ra", async (req: Request, res: Response) => {
});

router.delete("/students/:ra", async (req: Request, res: Response) => {
});

export { router }
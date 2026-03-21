const Turma = require("../models/turma");
const errorResponse = require("../utils/errorResponse");

const criarTurma = async (req, res) => {
  try {
    const { nome, alunosIds, professorId } = req.body;

    if (!nome || !professorId) {
      return errorResponse(res, "Nome e professorId são obrigatórios", 400);
    }

    const novaTurma = new Turma({
      nome,
      alunos: Array.isArray(alunosIds) ? alunosIds : [],
      professor: professorId,
    });

    await novaTurma.save();

    return res.status(201).json({
      message: "Turma criada com sucesso!",
      turma: novaTurma,
    });
  } catch (error) {
    return errorResponse(res);
  }
};

const obterTodasTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate("alunos professor");
    return res.status(200).json(turmas);
  } catch (error) {
    return errorResponse(res);
  }
};

const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Turma.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return errorResponse(res, "Turma não encontrada", 404);
    }

    return res.status(200).json({ message: "Turma removida com sucesso!" });
  } catch (error) {
    return errorResponse(res);
  }
};

const editarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, alunosIds, professorId } = req.body;

    if (!nome || !professorId) {
      return errorResponse(res, "Nome e professorId são obrigatórios", 400);
    }

    const turma = await Turma.findByIdAndUpdate(
      id,
      {
        nome,
        alunos: Array.isArray(alunosIds) ? alunosIds : [],
        professor: professorId,
      },
      { new: true }
    );

    if (!turma) {
      return errorResponse(res, "Turma não encontrada", 404);
    }

    return res.status(200).json({
      message: "Turma atualizada com sucesso!",
      turma,
    });
  } catch (error) {
    return errorResponse(res);
  }
};

module.exports = { criarTurma, editarTurma, deletarTurma, obterTodasTurmas }
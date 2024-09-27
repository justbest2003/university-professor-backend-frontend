import api from "./api";

const PROFESSOR_API = import.meta.env.VITE_PROFESSOR_API;

//get all Professor
const getAllProfessor = async () => {
  return await api.get(PROFESSOR_API);
};

//get Professor by ID
const getProfessorById = async (id) => {
  return await api.get(PROFESSOR_API +  `/${id}`);
};

//update Professor data
const editProfessor = async (id, professor) => {
  return await api.put(PROFESSOR_API + `/${id}`, professor);
};

//add Professor
const insertProfessor = async (professor) => {
  return await api.post(PROFESSOR_API, professor);
};


//delete Professor
const deleteProfessor = async (id) => {
  return await api.delete(PROFESSOR_API + `/${id}`);
};



const ProfessorService = {
  getAllProfessor,
  getProfessorById,
  editProfessor,
  deleteProfessor,
  insertProfessor,
};

export default ProfessorService;

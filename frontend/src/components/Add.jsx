import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';
import ProfessorService from "../services/professor.service"

const Add = () => {
  const [professor, setProfessor] = useState({
    name: "",
    imageUrl: "",
    department: "",
    position : "",
    email : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ProfessorService.insertProfessor(professor)
      if(response.status === 200){
        Swal.fire({
          title: 'Add Professor',
          text: "Professor Added Successfully",
          icon: 'success'
        });
        setProfessor({
            name: "",
            imageUrl: "",
            department: "",
            position : "",
            email : ""
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Add Professor',
        text: error.response.data.message || error.message,
        icon: 'error'
      });
    }
  };
  
  return (
    <div className="container flex flex-col items-center p-4 mx-auto space-y-6">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ชื่ออาจารย์</span>
            </label>
            <input
              type="text"
              placeholder="ชื่ออาจารย์"
              className="input input-bordered"
              required
              name="name"
              id="name"
              value={professor.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">แผนก</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อสาขา"
              className="input input-bordered"
              required
              name="department"
              id="department"
              value={professor.department}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ตำแหน่ง</span>
            </label>
            <input
              type="text"
              placeholder="ตำแหน่ง"
              className="input input-bordered"
              required
              name="position"
              id="position"
              value={professor.position}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">อีเมล</span>
            </label>
            <input
              type="text"
              placeholder="อีเมล"
              className="input input-bordered"
              required
              name="email"
              id="email"
              value={professor.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">URL รูปโปรไฟล์</span>
            </label>
            <input
              type="text"
              placeholder="รูปโปรไฟล์"
              className="input input-bordered"
              required
              name="imageUrl"
              id="imageUrl"
              value={professor.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              เพิ่มข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
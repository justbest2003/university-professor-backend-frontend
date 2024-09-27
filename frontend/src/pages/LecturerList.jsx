import React, { useState, useEffect } from "react";
import ProfessorService from "../services/professor.service";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const LecturerList = () => {
  const [professors, setProfessors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // เก็บค่าการค้นหา
  const { user } = useAuthContext();

  // ฟังก์ชันดึงข้อมูลอาจารย์
  const getAllProfessor = async () => {
    try {
      const response = await ProfessorService.getAllProfessor();
      setProfessors(response.data); // ปรับตามรูปแบบของข้อมูลที่ได้รับจาก API
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  useEffect(() => {
    getAllProfessor();
  }, []); // ดึงข้อมูลเมื่อ component ถูก mount

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this professor? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await ProfessorService.deleteProfessor(id);
        if (response.status === 200) {
          Swal.fire({
            title: "Professor Deleted",
            text: response.data.message,
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Professor Deletion Failed",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    }
  };

  // ฟังก์ชันจัดกลุ่มอาจารย์ตามแผนก
  const groupByDepartment = (professors) => {
    return professors.reduce((result, professor) => {
      const department = professor.department || "Unknown Department"; // ถ้าไม่มี department จะแสดง "Unknown Department"
      if (!result[department]) {
        result[department] = [];
      }
      result[department].push(professor);
      return result;
    }, {});
  };

  // กรองอาจารย์ตาม searchTerm
  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProfessors = groupByDepartment(filteredProfessors);

  return (
    <div className="container mx-auto py-8">
      {/* Input สำหรับค้นหาชื่ออาจารย์ */}
      <div className="flex justify-center mb-6">
        <label className="input input-bordered flex items-center gap-2 w-96">
          {/* Input field */}
          <input
            type="text"
            className="grow"
            placeholder="ค้นหารายชื่อ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* แสดงอาจารย์ตามแผนก */}
      {Object.keys(groupedProfessors).map((department) => (
        <div key={department}>
          <h2 className="text-center text-3xl font-semibold mb-6 p-4">
            {department}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center p-8">
            {groupedProfessors[department].map((professor) => (
              <div className="text-center" key={professor.id}>
                <img
                  className="w-52 h-52 rounded-full mx-auto object-cover shadow-2xl"
                  src={professor.imageUrl}
                  alt={professor.name}
                />
                <h3 className="mt-4 text-lg font-semibold">{professor.name}</h3>
                <p className="text-sm">{professor.position}</p>
                {user &&
                  (user.roles.includes("ROLES_MODERATOR") ||
                    user.roles.includes("ROLES_ADMIN")) && (
                    <div className="card-actions justify-center p-2">
                      {user.roles.includes("ROLES_ADMIN") && (
                        <button
                          className="btn btn-sm btn-error"
                          type="button"
                          onClick={() => handleDelete(professor.id)}
                        >
                          ลบ
                        </button>
                      )}
                      <a
                        href={`/edit/${professor.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        แก้ไข
                      </a>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LecturerList;

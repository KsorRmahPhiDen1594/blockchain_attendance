import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import AttendanceContract from '../../../attendance.json';
import studentAddresses from '../../../constants/studentAddresses';

const CONTRACT_ADDRESS = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";

function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const contract = new web3.eth.Contract(AttendanceContract.abi, CONTRACT_ADDRESS);
  
        const results = await Promise.all(studentAddresses.map(async (address) => {
          try {
            const student = await contract.methods.getStudent(address).call();
            const name = student.name;
            const dob = student.dob;
            const className = student.className;
            const isRegistered = student.isRegistered;
            console.log("check>>>>>>", student);
console.log("Địa chỉ:", address);
console.log("→ Tên:", student[0], "Ngày sinh:", student[1], "Lớp:", student[2], "Đã đăng ký:", student[3]);
  if(!isRegistered) return null;
            const isPresent = await contract.methods.getAttendance(address).call();
            
  
            return isRegistered
              ? {
                  address,
                  name,
                  dob,
                  className,
                  status: isPresent ? "Có mặt" : "Vắng mặt",
                }
              : null;
          } catch (err) {
            console.error(`❌ Lỗi khi xử lý địa chỉ: ${address}`, err);
            return null;
          }
        }));
  
        const validStudents = results.filter(Boolean);
        setStudents(validStudents);
  
        console.log("✅ Danh sách sinh viên hợp lệ:", validStudents);
      } catch (err) {
        console.error("Lỗi tổng khi fetchStudents:", err);
      }
    };
  
    fetchStudents();
  }, []);
  

  return (
    <div>
      <h3>Danh sách sinh viên:</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Địa chỉ</th>
            <th>Tên</th>
            <th>Ngày sinh</th>
            <th>Lớp</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={index}>
              <td>{s.address}</td>
              <td>{s.name}</td>
              <td>{s.dob}</td>
              <td>{s.className}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;

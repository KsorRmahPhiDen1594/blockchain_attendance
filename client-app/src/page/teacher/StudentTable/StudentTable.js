import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import AttendanceContract from '../../../attendance.json';
import studentAddresses from '../../../constants/studentAddresses';

const CONTRACT_ADDRESS = "0x072E20351f2E85aa013B45F34a4081cf79c9C937";

function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      const contract = new web3.eth.Contract(
        AttendanceContract.abi,
        CONTRACT_ADDRESS
      );

      const results = await Promise.all(
        studentAddresses.map(async (address) => {
          const s = await contract.methods.getStudentInfo(address).call();
          const isPresent = await contract.methods.getAttendanceStatus("2025-05-07", address).call();
          return {
            address,
            name: `${s[0]} ${s[1]}`,
            roll: s[2],
            batch: s[3],
            status: isPresent ? 'Có mặt' : 'Vắng'
          };
        })
      );
      setStudents(results);
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
            <th>Họ tên</th>
            <th>Mã SV</th>
            <th>Lớp</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={index}>
              <td>{s.address}</td>
              <td>{s.name}</td>
              <td>{s.roll}</td>
              <td>{s.batch}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
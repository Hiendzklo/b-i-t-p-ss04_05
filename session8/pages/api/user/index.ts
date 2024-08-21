import { NextApiRequest, NextApiResponse } from 'next';

let users = [
  { id: 1, user_name: 'David', age: 20 },
  { id: 2, user_name: 'Linda', age: 22 },
  { id: 3, user_name: 'Daniel', age: 25 }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, user_name, age } = req.query;

  if (req.method === 'POST') {
    // Xử lý yêu cầu POST để thêm người dùng mới
    const { id, user_name, age } = req.body;

    if (!id || !user_name || !age) {
      return res.status(400).json({ message: "Vui lòng cung cấp đủ thông tin người dùng" });
    }

    const newUser = { id: parseInt(id as string), user_name, age: parseInt(age as string) };
    users.push(newUser);

    res.status(201).json({ message: "Thêm mới thông tin người dùng thành công", user: newUser });
  } else if (req.method === 'GET') {
    // Xử lý yêu cầu GET để lấy thông tin người dùng
    if (id) {
      const user = users.find((u) => u.id === parseInt(id as string));

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: `Không tìm thấy người dùng có id = ${id}` });
      }
    } else if (user_name) {
      const filteredUsers = users.filter((u) =>
        u.user_name.toLowerCase().includes((user_name as string).toLowerCase())
      );

      if (filteredUsers.length > 0) {
        res.status(200).json(filteredUsers);
      } else {
        res.status(404).json({ message: `Không tìm thấy người dùng có tên = ${user_name}` });
      }
    } else {
      res.status(200).json(users);
    }
  } else if (req.method === 'DELETE') {
    // Xử lý yêu cầu DELETE để xóa người dùng theo ID
    if (id) {
      const userIndex = users.findIndex((u) => u.id === parseInt(id as string));

      if (userIndex !== -1) {
        users = users.filter((u) => u.id !== parseInt(id as string));
        res.status(200).json({ message: "Xóa thông tin người dùng thành công" });
      } else {
        res.status(404).json({ message: `Không tìm thấy người dùng có id = ${id}` });
      }
    } else {
      res.status(400).json({ message: "Vui lòng cung cấp ID hợp lệ" });
    }
  } else if (req.method === 'PUT') {
    // Xử lý yêu cầu PUT để cập nhật thông tin người dùng theo ID
    const { user_name, age } = req.body;

    if (!id || !user_name || !age) {
      return res.status(400).json({ message: "Vui lòng cung cấp đủ thông tin người dùng" });
    }

    const userIndex = users.findIndex((u) => u.id === parseInt(id as string));

    if (userIndex !== -1) {
      users[userIndex] = { id: parseInt(id as string), user_name, age: parseInt(age as string) };
      return res.status(200).json({ message: "Cập nhật thông tin người dùng thành công" });
    } else {
      return res.status(404).json({ message: `Không tìm thấy người dùng có id = ${id}` });
    }
  } else {
    // Phương thức không được hỗ trợ
    res.status(405).json({ message: `Phương thức ${req.method} không được hỗ trợ` });
  }
}

import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Read existing users or create empty array
let users: { id: number; email: string; password_hash: string; role: string; created_at: string }[] = [];
if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

// Check if admin exists
const adminExists = users.find((u) => u.email === 'ararciahurtado@gmail.com');

if (!adminExists) {
  // Create admin user with bcrypt hashed password
  const passwordHash = bcrypt.hashSync('Akira100*', 10);

  users.push({
    id: 1,
    email: 'ararciahurtado@gmail.com',
    password_hash: passwordHash,
    role: 'admin',
    created_at: new Date().toISOString(),
  });

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  console.log('Admin user created successfully!');
  console.log('Email: ararciahurtado@gmail.com');
  console.log('Password: Akira100*');
} else {
  // Update admin password
  const passwordHash = bcrypt.hashSync('Akira100*', 10);
  users = users.map((u) =>
    u.email === 'ararciahurtado@gmail.com' ? { ...u, password_hash: passwordHash } : u
  );
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  console.log('Admin password updated!');
}

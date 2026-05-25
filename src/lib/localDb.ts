import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'local_db.json');

function getDB() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], chats: [], projects: [] }, null, 2));
    }
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    try {
        return JSON.parse(content);
    } catch (e) {
        return { users: [], chats: [], projects: [] };
    }
}

function saveDB(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const LocalDB = {
    findUser: (email: string) => {
        const db = getDB();
        return db.users.find((u: any) => u.email === email);
    },
    createUser: (user: any) => {
        const db = getDB();
        db.users.push(user);
        saveDB(db);
        return user;
    },
    saveChat: (chat: any) => {
        const db = getDB();
        db.chats.push(chat);
        saveDB(db);
        return chat;
    },
    saveProject: (project: any) => {
        const db = getDB();
        if (!db.projects) db.projects = [];
        // Prevent duplicates
        const index = db.projects.findIndex((p: any) => p.id === project.id);
        if (index > -1) {
            db.projects[index] = project;
        } else {
            db.projects.push(project);
        }
        saveDB(db);
        return project;
    },
    getProjects: () => {
        const db = getDB();
        return db.projects || [];
    },
    deleteProject: (id: number) => {
        const db = getDB();
        if (db.projects) {
            db.projects = db.projects.filter((p: any) => p.id !== id);
            saveDB(db);
        }
        return true;
    }
};

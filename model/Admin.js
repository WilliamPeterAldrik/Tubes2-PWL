const dataAdmin = [
    {
        id: 1,
        nama: 'Admin A',
        email: 'Admin123@email.com',
        password: 'password123'
    }
]

class Admin {
    constructor() {
        // Initialization if needed
    }

    all() {
        return dataAdmin;
    }

    save(newAdmin) {
        dataAdmin.push(newAdmin);
    }
}
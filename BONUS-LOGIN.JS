const readline = require('readline');

class LoginError_2895 extends Error {
    constructor(message) {
        super(message);
        this.name = "LoginError_2895";
    }
}

class ValidationError_2895 extends LoginError_2895 {
    constructor(message) {
        super(message);
        this.name = "ValidationError_2895";
    }
}

class AuthError_2895 extends LoginError_2895 {
    constructor(message) {
        super(message);
        this.name = "AuthError_2895";
    }
}

class SystemError_2895 extends LoginError_2895 {
    constructor(originalError) {
        super("Terjadi kesalahan sistem internal.");
        this.name = "SystemError_2895";
        this.originalError = originalError;
    }
}

class LoginService_2895 {
    static validUser = "jonathan";
    static validPass = "12345678";

    static async performLogin_2895(username, password) {
        try {

            if (typeof username !== 'string' || typeof password !== 'string') {
                throw new ValidationError_2895("Input harus berupa text/string");
            }

            if (!username || !password) {
                throw new ValidationError_2895("Username atau Password tidak boleh kosong");
            }

            if (username.length < 4) {
                throw new ValidationError_2895("Username terlalu pendek (min. 4 karakter)");
            }

            if (password.length < 6) {
                throw new ValidationError_2895("Password terlalu pendek (min. 6 karakter)");
            }

            if (username === "crash") {
                throw new Error("Database Connection Failed (Simulated)");
            }

            if (username !== this.validUser) {
                throw new AuthError_2895("Username tidak terdaftar");
            }

            if (password !== this.validPass) {
                throw new AuthError_2895("Password salah");
            }

            return "Login berhasil -> selamat datang " + username;

        } catch (error) {
            if (error instanceof ValidationError_2895 || error instanceof AuthError_2895) {
                throw error;
            } else {
                throw new SystemError_2895(error);
            }
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function startApp_2895() {
    console.log("\n=== SYSTEM LOGIN ===");
    console.log("Hint: User='jonathan', Pass='12345678'. Ketik 'crash' di username untuk tes SystemError.\n");

    let isLoggedIn = false;

    while (!isLoggedIn) {
        try {
            const username = await askQuestion("Username: ");
            const password = await askQuestion("Password: ");

            const result = await LoginService_2895.performLogin_2895(username, password);
            
            console.log(`\n[SUCCESS] ${result}`);
            isLoggedIn = true;

        } catch (error) {
            console.log("\n[LOGIN GAGAL]");
            
            if (error instanceof ValidationError_2895) {
                console.log(`>> Kesalahan Input: ${error.message}`);
                console.log(">> Silakan cek format input Anda.");
            } else if (error instanceof AuthError_2895) {
                console.log(`>> Akses Ditolak: ${error.message}`);
                console.log(">> Cek kembali username/password.");
            } else if (error instanceof SystemError_2895) {
                console.log(`>> CRITICAL: ${error.message}`);
                console.log(`>> Detail: ${error.originalError.message}`);
            } else {
                console.log(`>> Unknown Error: ${error.message}`);
            }
    
            console.log("----------------------------------------");

        } finally {
            console.log("(Proses login selesai dijalankan)\n");
        }
    }

    rl.close();
}

startApp_2895();
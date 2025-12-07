class InvalidSeatFormatError_2895 extends Error {
    constructor(seat) {
        super(`Format kursi ${seat} tidak valid. Gunakan huruf+nomer (contoh: A12)`);
        this.name = "InvalidSeatFormatError_2895";
        this.seat = seat;
    }
}

class RowNotExistError_2895 extends Error {
    constructor(row) {
        super(`Baris ${row} tidak tersedia`);
        this.name = "RowNotExistError_2895";
        this.row = row;
    }
}

class SeatManager_2895 {
    static parseSeat_2895(seat) {
        if (!/^[A-J]\d+$/.test(seat)) { // Validasi format kursi
            throw new InvalidSeatFormatError_2895(seat);
        }
        return seat.charAt(0);
    }

    static async loadLayout_2895() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const row = arguments[0]; 
                if (row > "J") {
                    reject(new RowNotExistError_2895(row));
                } else {
                    resolve(true);
                }
            }, 100);
        });
    }

    static async reserveSeat_2895(seat) {
        try {
            const row = this.parseSeat_2895(seat);
            await this.loadLayout_2895(row);
            console.log(`Kursi ${seat} berhasil di-reserve`);
        } catch (error) {
            if (error instanceof InvalidSeatFormatError_2895) {
                console.log(`Gagal reserve: ${error.message}`);
            } else if (error instanceof RowNotExistError_2895) {
                console.log(`Gagal reserve: ${error.message}`);
            }
            throw error;
        } finally {
            console.log("Release seat lock");
        }
    }
}

(async () => {
    const testCases = ["A12", "K5", "Z99", "B10", "A1"];
    for (const seat of testCases) {
        try {
            await SeatManager_2895.reserveSeat_2895(seat);
        } catch (error) {
            if (error instanceof InvalidSeatFormatError_2895) {
                console.log(`Format salah: ${error.seat}`);
            } else if (error instanceof RowNotExistError_2895) {
                console.log(`Baris tidak ada: ${error.row}`);
            }
        }
    }
})();
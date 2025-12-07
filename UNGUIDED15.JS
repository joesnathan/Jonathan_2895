class SeatNotAvailableError_2895 extends Error {
    constructor(seat) {
        super(seat);
        this.name = "SeatNotAvailableError_2895";
        this.seat = seat;
    }
}

class PaymentFailedError_2895 extends Error {
    constructor(reason) {
        super(reason);
        this.name = "PaymentFailedError_2895";
        this.reason = reason;
    }
}

class BookingService_2895 {
    static validateAge_2895(age, movieRating) {
        if (age < 17 && movieRating === "R") {
            throw new SeatNotAvailableError_2895(`Umur ${age} tahun tidak boleh nonton film R`);
        }
    }

    static checkSeatAvailability_2895(seatNumber) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const bookedSeats = ["A1", "A2", "A3", "A4", "A5"];
                if (bookedSeats.includes(seatNumber)) {
                    reject(new SeatNotAvailableError_2895(seatNumber));
                } else {
                    resolve(true);
                }
            }, 100);
        });
    }

    static async processPayment_2895(amount) {
        if (amount < 50000) {
            throw new PaymentFailedError_2895("Saldo tidak mencukupi (min. Rp50.000)");
        }
        return true;
    }

    static async bookTicket_2895(name, age, seat, movieRating) {
        try {
            this.validateAge_2895(age, movieRating);
            await this.checkSeatAvailability_2895(seat);
            await this.processPayment_2895(arguments[4]);
            return {
                name: name,
                seat: seat,
                movieRating: movieRating,
                status: 'Tiket berhasil dipesan'
            };
        } catch (error) {
            throw error;
        } finally {
            console.log("Cleanup booking session");
        }
    }
}

async function testBooking_2895() {
    const tests = [
        { name: "Budi", age: 15, seat: "A3", rating: "R" },
        { name: "Andi", age: 20, seat: "A1", rating: "SU" },
        { name: "Cici", age: 25, seat: "B7", rating: "SU", amount: 30000 },
        { name: "Dedi", age: 22, seat: "C5", rating: "SU", amount: 75000 }
    ];

    for (const test of tests) {
        try {
            await BookingService_2895.bookTicket_2895(
                test.name, test.age, test.seat, test.rating, test.amount
            );
            console.log("Berhasil:", {
                name: test.name,
                seat: test.seat,
                movieRating: test.rating,
                status: 'Tiket berhasil dipesan'
            });
        } catch (error) {
            if (error instanceof SeatNotAvailableError_2895) {
                console.log(`Kursi/Umur tidak tersedia: ${error.message}`);
            } else if (error instanceof PaymentFailedError_2895) {
                console.log(`Pembayaran gagal: Pembayaran gagal: ${error.message}`);
            } else {
                console.log("Error tidak dikenal:", error.message);
            }
        }
    }
}

testBooking_2895();
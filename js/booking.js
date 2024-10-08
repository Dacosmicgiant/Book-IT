// booking.js

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const movieTitle = document.getElementById('movie-title');
    const seatSelection = document.getElementById('seat-selection');
    const totalPrice = document.getElementById('total-price');
    const confirmBookingBtn = document.getElementById('confirm-booking');
    const bookingsList = document.getElementById('bookings-list');

    let selectedSeats = [];
    const ticketPrice = 10; // Price per ticket

    // Open modal when "Book Now" is clicked
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const movie = e.target.closest('.book-btn').dataset.movie;
            openBookingModal(movie);
        });
    });

    // Close modal when (x) is clicked
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside of it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    function openBookingModal(movie) {
        movieTitle.textContent = movie;
        generateSeats();
        modal.style.display = 'block';
    }

    function generateSeats() {
        seatSelection.innerHTML = '';
        for (let i = 0; i < 48; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            if (Math.random() < 0.3) { // 30% chance of a seat being occupied
                seat.classList.add('occupied');
            } else {
                seat.addEventListener('click', toggleSeat);
            }
            seatSelection.appendChild(seat);
        }
    }

    function toggleSeat(e) {
        e.target.classList.toggle('selected');
        updateSelectedSeats();
    }

    function updateSelectedSeats() {
        selectedSeats = Array.from(seatSelection.querySelectorAll('.seat.selected'));
        totalPrice.textContent = selectedSeats.length * ticketPrice;
    }

    confirmBookingBtn.addEventListener('click', () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat.');
            return;
        }

        const booking = {
            movie: movieTitle.textContent,
            seats: selectedSeats.length,
            total: selectedSeats.length * ticketPrice
        };

        addBookingToList(booking);
        modal.style.display = 'none';
        selectedSeats = [];
        totalPrice.textContent = '0';
    });

    function addBookingToList(booking) {
        const bookingItem = document.createElement('div');
        bookingItem.classList.add('booking-item');
        bookingItem.innerHTML = `
            <h3>${booking.movie}</h3>
            <p>Seats: ${booking.seats}</p>
            <p>Total: $${booking.total}</p>
        `;
        bookingsList.appendChild(bookingItem);
    }
});
class FavoritesTicketsStore {
    constructor() {

    }

    setTicketsToLocalStorage(parent) {
        localStorage.setItem(`ticket ${Math.random()}`, JSON.stringify({
            airline_logo : parent.querySelector('.ticket-airline-img').src,
            airline_name : parent.querySelector('.ticket-airline-name').textContent,
            origin_name : parent.querySelector('.ticket-city-origin').textContent,
            destination_name : parent.querySelector('.ticket-city-destination').textContent,
            departure_at : parent.querySelector('.ticket-time-departure').textContent,
            price : parent.querySelector('.ticket-price').textContent,
            transfers : parent.querySelector('.ticket-transfers').textContent,
            flight_number : parent.querySelector('.ticket-flight-number').textContent,
        }));
    }

    getTicketsFromStorage(){
        const arrTickets = [];
        for(let i = 0; i < localStorage.length; i++){
            if(localStorage.key(i).startsWith('ticket')){
                const ticket = JSON.parse(localStorage.getItem(localStorage.key(i)))
                arrTickets.push(ticket)
                // arrTickets.push(JSON.parse(localStorage.getItem(`ticket ${i}`)));
            }
        }
        return arrTickets;
    }

}

const favoritesTicketsStore = new FavoritesTicketsStore();
export default favoritesTicketsStore;
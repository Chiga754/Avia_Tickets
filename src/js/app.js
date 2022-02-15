import '../css/style.css';
import './plugins';
import locations from "./store/locations";
import favoritesTicketsStore from './store/favoritesTicketsStore';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';
import favoritesTicketsUI from './views/favoritesTickets' ;

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    //Elements
    const form = formUI.form;
    const container = ticketsUI.container;
    const favoritesContainer = favoritesTicketsUI.container;

    //Получение и рендер избранных билетов при загрузке страницы
    favoritesTicketsUI.renderFovoritesTickets(favoritesTicketsStore.getTicketsFromStorage());
    //Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    })
    container.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-favorite')){
            const parent = e.target.closest('.card');
            favoritesTicketsStore.setTicketsToLocalStorage(parent);
            //Получение и рендер избранных билетов при добавлении нового билета
            favoritesTicketsUI.renderFovoritesTickets(favoritesTicketsStore.getTicketsFromStorage());
        }
    });

    favoritesContainer.addEventListener('click', (event) => {
        deleteTicketHandler(event);
    });

    //Handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        // Собрать данные из инпутов
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departValue;
        const return_date = formUI.returnValue;
        const currency = currencyUI.currencyValue;
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });
        ticketsUI.renderTickets(locations.lastSearch);
    }

    function deleteTicketHandler ({target}) {
        if(target.classList.contains('delete-favorite')){
            const parent = target.closest('.favorite-item');
            const parentId = parent.dataset.id;
            parent.remove();
            favoritesTicketsStore.removeTicketFromStorage(parentId);
        }
    }

});
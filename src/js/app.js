import '../css/style.css';
import './plugins';
import locations from "./store/locations";
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets'
import favouritesTicketsStore from './store/favouritesTicketsStore';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;
    const container = ticketsUI.container;
    //Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    })
    container.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-favorite')){
            const parent = e.target.closest('.card');
            favouritesTicketsStore.setTicketsToLocalStorage(parent);
        }
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
});
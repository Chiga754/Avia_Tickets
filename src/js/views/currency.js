class CurrencyUI {
    constructor() {
        this.currency = document.getElementById('currency');
        this.dictioary = {
            USD: '$',
            EUR: '€',
        }
    }
    get currencyValue() {
        return this.currency.value;
    }

    getCurrencySymbol() {
        return this.dictioary[this.currencyValue];
    }

}

const currencyUI = new CurrencyUI();

export default currencyUI;
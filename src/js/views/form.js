import {getAutocompleteInstance, getDatepickerInstance} from '../plugins/materialize';

class FormUI {
    constructor(autocompleteInstance, datepickerInstance) {
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');
        this.originAutocomplete = autocompleteInstance(this.origin);
        this.destinationAutocomplete = autocompleteInstance(this.destination);
        this.departDatePiker = datepickerInstance(this.depart);
        this.returnDatePiker = datepickerInstance(this.return);
    }
    get form() {
        this.$form;
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickerInstance);

export default formUI;
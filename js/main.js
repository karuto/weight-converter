(function() {
    var options = {};
    var CONFIG = {
        INPUT_ID: 'input',
        CONVERSIONS_ID: '#conversions',
        CONVERSION_POUND_ID: '#pound',
        CONVERSION_POUND_AND_OUNCE_ID: '#pound-and-ounce'
    };
    var STRINGS = {
        WAIT: 'Type a valid number...',
        SUFFIX_POUND: ' Pounds',
        SUFFIX_OUNCE: ' Ounces'
    };
    var CONVERSIONS = {
        OUNCES_PER_POUND: 16,
        POUND_PER_KILO: 2.20462
    };

    function validateData(data) {
        if (isNaN(data) || data === '') {
            // not a valid number, or empty
            return false;
        }
        return true;
    }

    function toRawPound(kilo) {
        return (kilo * CONVERSIONS.POUND_PER_KILO);
    }

    function toPound(kilo) {
        return toRawPound(kilo).toFixed(2) + STRINGS.SUFFIX_POUND;
    }

    function toRawOunce(pound) {
        return (pound * CONVERSIONS.OUNCES_PER_POUND);
    }

    function toPoundAndOunce(kilo) {
        var output = '';
        var rawPounds = toRawPound(kilo);

        var numericalSegments = rawPounds.toString().split('.');
        var wholePounds = numericalSegments[0];
        var remainderPounds = numericalSegments[1] ? '.' + numericalSegments[1] : undefined;

        output = parseInt(wholePounds).toFixed(0) + STRINGS.SUFFIX_POUND;

        if (remainderPounds) {
            var fullOunces = toRawOunce(remainderPounds).toFixed(2) + STRINGS.SUFFIX_OUNCE;
            output += ' ';
            output += fullOunces;
        }
        return output;
    }

    function resetOutputs() {
        // Only display a single wait string, else set to empty.
        $(CONFIG.CONVERSION_POUND_ID).text(STRINGS.WAIT);
        $(CONFIG.CONVERSION_POUND_AND_OUNCE_ID).text('');
    }

    function handleInput(e) {
        var input = e.target.value;
        if (validateData(input)) {
            $(CONFIG.CONVERSION_POUND_ID).text(toPound(input));
            $(CONFIG.CONVERSION_POUND_AND_OUNCE_ID).text(toPoundAndOunce(input));
        } else {
            resetOutputs();
        }
    }

    function init() {
        resetOutputs();
        window.addEventListener(CONFIG.INPUT_ID, handleInput, false);
    }

    init();
}());

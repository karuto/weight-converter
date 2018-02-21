(function() {
    var options = {};
    var CONFIG = {
        INPUT_ID: 'input',
        CONVERSIONS_ID: '#conversions'
    };
    var STRINGS = {
        WAIT: 'Keep typing...',
        SUFFIX_POUND: ' Pounds',
        SUFFIX_OUNCE: ' Ounces'
    };
    var CONVERSIONS = {
        OUNCES_PER_POUND: 16,
        POUND_PER_KILO: 2.20462
    };

    function validateData(data) {
        if (isNaN(data)) {
            // not a valid number
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
        var output = STRINGS.WAIT;
        var rawPounds = toRawPound(kilo);
        var numericalSegments = rawPounds.toString().split('.');
        console.log(rawPounds, numericalSegments);
        output = parseInt(numericalSegments[0]).toFixed(0) + STRINGS.SUFFIX_POUND;
        if (numericalSegments.length === 2) {
            var remainderPound = '.' + numericalSegments[1];
            // if there are decimals, display both pounds and ounces
            var fullOunces = toRawOunce(remainderPound).toFixed(2) + STRINGS.SUFFIX_OUNCE;
            output += ' ' + fullOunces;
        }
        return output;
    }

    function handleInput(e) {
        var input = e.target.value;
        console.log("input =", input);
        if (validateData(input)) {
            $(CONFIG.CONVERSIONS_ID).text(toPoundAndOunce(input));
        } else {
            $(CONFIG.CONVERSIONS_ID).text(STRINGS.WAIT);
        }
    }

    function init() {
        console.log('init');
        window.addEventListener(CONFIG.INPUT_ID, handleInput, false);
    }

    init();
}());

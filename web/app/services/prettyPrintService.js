(function() {

    'use strict';

// pretty print helpers
    app.factory('prettyPrintService', function () {
        var prettyPrintService = {};

        // print a Date object
        prettyPrintService.printDate = function (date) {
            return (parseInt(date.getUTCMonth()) + 1).toString() + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
        };

        // print a phone number
        prettyPrintService.printPhone = function (phone) {
            if (phone.length == 10) {
                return "(" + phone.substr(0, 3) + ") " + phone.substr(3, 3) + "-" + phone.substr(6, 4);
            }
            return "";
        };

        // print gender, given a bit representation
        prettyPrintService.printGender = function (genderBit) {
            if (genderBit == 1) {
                return "Male";
            } else if (genderBit == 0) {
                return "Female";
            }
            return "";
        };

        // print yes/no, given a bit representation
        prettyPrintService.printYesOrNo = function (bit) {
            if (bit == 1) {
                return "Yes";
            } else if (bit == 0) {
                return "No";
            }
            return "";
        };

        // print yes/no, based on whether input is positive
        prettyPrintService.isGreaterThanZero = function (num) {
            if (num > 0) {
                return "Yes";
            } else {
                return "No";
            }
        };

        // print month name, given month as integer
        prettyPrintService.printMonth = function (month) {
            var months = {};
            months[1] = "January";
            months[2] = "February";
            months[3] = "March";
            months[4] = "April";
            months[5] = "May";
            months[6] = "June";
            months[7] = "July";
            months[8] = "August";
            months[9] = "September";
            months[10] = "October";
            months[11] = "November";
            months[12] = "December";

            return months[parseInt(month)];
        };


        prettyPrintService.roundToTenth = function (num) {
            var floored = Math.floor(num);
            var decimal = num - floored;
            if (decimal > .75) {
                return floored + 1;
            } else if (decimal >= .25){
                return floored + .5;
            } else {
                return floored;
            }
        };

        return prettyPrintService;
    });

})();
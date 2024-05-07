

import moment from 'moment'


export const getDateBetweenOfDayFromNow = (date, nowDate = new Date()) => {
    return Math.round(moment.duration(moment(date).diff(moment(nowDate))).asDays())
}


export const toLatinFromTurkish = (string) => {
    var letters = {
        "Ğ": "G",
        "Ü": "U",
        "Ş": "S",
        "İ": "I",
        "Ö": "O",
        "Ç": "C",

        "ğ": "g",
        "ü": "u",
        "ş": "s",
        "ı": "i",
        "ö": "o",
        "ç": "c"
    };
    return string.replace(/[ĞÜŞİÖÇğüşıöç]/g, function (letter) {
        return letters[letter];
    });

}

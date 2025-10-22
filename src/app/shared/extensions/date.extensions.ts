const monthValue = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
export {};

declare global {
   interface Date {
      addDays(days: number, useThis?: boolean): Date;
      addMonth(days: number, useThis?: boolean): Date;
      addYear(days: number, useThis?: boolean): Date;
      addHours(days: number, useThis?: boolean): Date;
      isToday(): boolean;
      clone(): Date;
      isAnotherMonth(date: Date): boolean;
      isWeekend(): boolean;
      isSameDate(date: Date): boolean;
      getStringDate(): string;
      getLocaleDateTime(): string;
      DateGetLocaleDate(): string;
      DateGetLocaleDateTime(): Date;
      getClearDate(): string;
      startTime(): Date;
      endTime(): Date;
   }
}

Date.prototype.addDays = function(days: number): Date {
   if (!days) { return this; }
   const date = this;
   date.setDate(date.getDate() + days);

   return date;
};

Date.prototype.addMonth = function(monts: number): Date {
    if (!monts) { return this; }
    const date = this;
    date.setMonth(date.getMonth() + monts);

    return date;
 };

Date.prototype.addYear = function(year: number): Date {
    if (!year) { return this; }
    const date = this;
    date.setFullYear(date.getFullYear() + year);

    return date;
 };

Date.prototype.addHours = function(hours: number): Date {
    if (!hours) { return this; }
    const date = this;
    date.setHours(date.getHours() + hours);

    return date;
 };

Date.prototype.startTime = function(): Date {
    const date = this;
    date.setHours(0, 0, 0, 0);
    return date;
 };

Date.prototype.endTime = function(): Date {
    const date = this;
    date.setHours(23, 59, 59, 999);
    return date;
 };

Date.prototype.isToday = function(): boolean{
   const today = new Date();
   return this.isSameDate(today);
};



Date.prototype.clone = function(): Date{
   return new Date(+this);
};

Date.prototype.isAnotherMonth = function(date: Date): boolean {
   return date && this.getMonth() !== date.getMonth();
};

Date.prototype.isWeekend = function(): boolean  {
   return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = function(date: Date): boolean  {
   return date && this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
};

Date.prototype.getStringDate = function(): string {
    // Month names in English
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = this;
    let str = '';
    const year = date.getFullYear();
    const month = monthValue[date.getMonth()];
    let  day = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    /*if (Number(month) < 10) {
        month = '0' + month;
    }*/
    if (day < 10) {
        day = '0' + day;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
       seconds = '0' + seconds;
    }

    if (hours < 10) {
        hours = '0' + hours;
     }

    str += year + '-' + month + '-' + day + 'T' + hours + ':' + minutes; // + ':' + seconds + ' ';

    const today = new Date();

    if (month === monthValue[today.getMonth()] && day === today.getDate()) {
        return 'Today';
    } else if (month === monthValue[today.getMonth()] && day === today.getDate() + 1) {
        return 'Tomorrow';
    } else if (month === monthValue[today.getMonth()] && day === today.getDate() - 1) {
        return 'Yesterday';
    } else {
        // return this.getDay() + ' de ' + this.monthNames[this.getMonth()] + ' de ' + this.getFullYear();
        return monthNames[this.getMonth()] + ' ' + day + ', ' +  year;
    }
};


Date.prototype.getLocaleDateTime = function(): string {
    const date = this;
    let str = '';
    const year = date.getFullYear();
    const month = monthValue[date.getMonth()];
    let  day = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    /*if (Number(month) < 10) {
        month = '0' + month;
    }*/
    if (day < 10) {
        day = '0' + day;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
       seconds = '0' + seconds;
    }

    if (hours < 10) {
        hours = '0' + hours;
     }

    str += year + '-' + month + '-' + day + 'T' + hours + ':' + minutes; // + ':' + seconds + ' ';

    return str;
};

Date.prototype.DateGetLocaleDate = function(): string {
    const date = this;
    let str = '';
    const year = date.getFullYear();
    const month = monthValue[date.getMonth()];
    let  day = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    /*if (Number(month) < 10) {
        month = '0' + month;
    }*/
    if (day < 10) {
        day = '0' + day;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
       seconds = '0' + seconds;
    }

    if (hours < 10) {
        hours = '0' + hours;
     }

    str += year + '-' + month + '-' + day;

    return str;
};

Date.prototype.DateGetLocaleDateTime = function(): Date {
    const date = this;
    let str = '';
    const year = date.getFullYear();
    const month = monthValue[date.getMonth()];
    let  day = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    /*if (Number(month) < 10) {
        month = '0' + month;
    }*/
    if (day < 10) {
        day = '0' + day;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
       seconds = '0' + seconds;
    }

    if (hours < 10) {
        hours = '0' + hours;
     }

    str += year + '-' + month + '-' + day + 'T' + hours + ':' + minutes; // + ':' + seconds + ' ';

    return new Date(str);
};

Date.prototype.getClearDate = function(): string {
    const date = this;
    let str = '';
    const year = date.getFullYear();
    const month = monthValue[date.getMonth()];
    let  day = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    /*if (Number(month)< 10) {
        month = '0' + month;
    }*/
    if (day < 10) {
        day = '0' + day;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
       seconds = '0' + seconds;
    }

    if (hours < 10) {
        hours = '0' + hours;
     }

    str += year + '' + month + '' + day;

    return str;
};

import { Pipe, PipeTransform } from '@angular/core';

interface NumbersObject {
    [key: number]: string,
    [key: string]: string
}

@Pipe({ name: 'numberToText' })
export class NumberToTextPipe implements PipeTransform {



    transform(value: string): string {
        var res = this.convertNumToWord(parseInt(value));
        return res.toUpperCase();
    }

    number2text(value) {
        var fraction = Math.round(this.frac(value) * 100);
       

       

        return this.convert_number(value);
    }

    frac(f) {
        return f % 1;
    }

    convert_number(number) {
        if ((number < 0) || (number > 999999999999)) {
            return "NUMBER OUT OF RANGE!";
        }
        var Gn = Math.floor(number / 1000000000);  /* Billion */
        number -= Gn * 10000000;
        var kn = Math.floor(number / 1000000);     /* million */
        number -= kn * 100000;
        var Hn = Math.floor(number / 1000);      /* thousand */
        number -= Hn * 1000;
        var Dn = Math.floor(number / 100);       /* Tens (deca) */
        number = number % 100;               /* Ones */
        var tn = Math.floor(number / 10);
        var one = Math.floor(number % 10);
        var res = "";

        if (Gn > 0) {
            res += (this.convert_number(Gn) + " Billion");
        }
        if (kn > 0) {
            res += (((res == "") ? "" : " ") +
                this.convert_number(kn) + " Million");
        }
        if (Hn > 0) {
            res += (((res == "") ? "" : " ") +
                this.convert_number(Hn) + " THOUSAND");
        }

        if (Dn) {
            res += (((res == "") ? "" : " ") +
                this.convert_number(Dn) + " HUNDRED");
        }


        var ones = Array("", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN");
        var tens = Array("", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY");

        if (tn > 0 || one > 0) {
            if (!(res == "")) {
                res += " AND ";
            }
            if (tn < 2) {
                res += ones[tn * 10 + one];
            }
            else {

                res += tens[tn];
                if (one > 0) {
                    res += ("-" + ones[one]);
                }
            }
        }

        if (res == "") {
            res = "zero";
        }
        return res;
    }

    convertNumToWord(e)
    {
        if(0===e)return"zero";
            var d=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],h=["","","twenty","thirty","fourty","fifty","sixty","seventy","eighty","ninety"],b=["","thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion"];
            function m(e)
            {
                return("000"+e).substr(-3)}
                function p(e)
                {
                    return e.substr(0,e.length-3)
                }
                return function e(a,t,r,i)
                {
                    return"000"==r&&0===i.length?a:e((n=a,s=r[0],c=r[1],u=r[2],o=("0"==s?"":d[s]+" hundred ")+("0"==u?h[c]:h[c]&&h[c]+"-"||"")+(d[c+u]||d[u]),l=b[t],o?o+(l&&" "+l||"")+" "+n:n),++t,m(i),p(i));
                    var n,o,l,s,c,u
                }
                    ("",0,m(String(e)),p(String(e)))
    }




}
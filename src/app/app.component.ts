import { Component, VERSION } from '@angular/core';
import { of, take, tap, combineLatest, Observable, Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor() {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    console.log(arr1 == arr2); // false
    console.log(arr1 === arr2); // true

    //*************************************************************************************************

    let a: number[];
    const b: number[] = (a = []);
    a.push(1);
    console.log(a == b); // true
    console.log(a === b); // true

    //*************************************************************************************************

    const fname = 'Xavier';
    const lname = undefined;
    const nname = 'Xa';
    console.log(fname || lname); // Xavier
    console.log(lname || fname); // Xavier
    console.log(fname && nname); // Xa
    console.log(fname && lname); // undefined

    //*************************************************************************************************

    const firstName = 'Cap';
    const lastName = 'Gemini';
    const email = null;
    const age = 0;
    console.log(!!(firstName && lastName)); // true
    console.log(!!(email || lastName)); // true
    console.log(!!(age ?? lastName)); // false
    console.log(!!(email ?? lastName)); // true
    console.log(age ?? lastName); // 0
    console.log(email ?? lastName); // Gemini

    //*************************************************************************************************

    const objA = { name: 'Xavier' };
    const objB = { name: 'Xavier' };
    console.log(objA == objB); // false
    console.log(objA === objB); // false
    console.log(objA.name == objB.name); // true

    //*************************************************************************************************

    const obj1 = { foo: 'bar' };
    const obj2 = {
      foo: 'bar',
      bar: { foo: 'bar' },
      obj1: obj1,
    };
    const obj3 = {
      foo: 'bar',
      bar: { foo: 'bar' },
      obj1: obj1,
    };
    console.log(obj2 === obj3); // false
    console.log(obj2.bar === obj3.bar); // false
    console.log(obj2.obj1 === obj3.obj1); // true

    Object.assign(obj3.obj1, { key: 'value' });
    console.log(obj2.obj1 === obj3.obj1); // true

    //*************************************************************************************************

    const x = { userId: 1, name: 'Joe' };
    const y = { ...x };
    console.log(x === y); // false
    console.log(Object.keys(x).map((key) => y[key])); // 1, Joe
    console.log(Object.keys(x).map((key) => x[key] === y[key].toString())); // false, true

    //*************************************************************************************************

    const myObject = {
      foo: 'bar',
      func: function () {
        const self = this;
        console.log(this?.foo); // bar
        console.log(self?.foo); // bar
        (function () {
          console.log(this?.foo); // undefined
          console.log(self?.foo); // bar
        })();
      },
    };
    myObject.func();

    //************************************************************************************************

    const obs1 = of([1, 2, 3, 4, 5]);
    obs1.pipe(
      take(2),
      tap((val) => console.log(val))
    );
    // does not ouput anything because there is no subscription!

    const obs2 = of([1, 2, 3, 4, 5]);
    obs2
      .pipe(
        take(2),
        tap((val) => console.log(val))
      )
      .subscribe();
    // outputs:
    // [1, 2, 3, 4, 5]

    const obs3 = of(1, 2, 3, 4, 5);
    obs3
      .pipe(
        take(2),
        tap((val) => console.log(val))
      )
      .subscribe();
    // outputs:
    // 1
    // 2

    //*************************************************************************************************

    const obs4 = new Observable((subscriber) =>
      subscriber.next({ name: 'Cap1' })
    );
    const sub4 = new Subject();
    sub4.next({ name: 'Cap2' });
    combineLatest([obs4, sub4])
      .pipe(tap((val) => console.log(val)))
      .subscribe();
    // does not ouput anything
    // because subD has not emitted a value after the subscription!

    //*************************************************************************************************

    const obs5 = new Observable((subscriber) => {
      subscriber.next({ name: 'Cap1' });
    });
    const sub5 = new Subject();
    sub5.next({ name: 'Cap2' });
    combineLatest([obs5, sub5])
      .pipe(tap((val) => console.log(val)))
      .subscribe();
    sub5.next({ name: 'Cap3' });
    // outputs:
    // [ { name: 'Cap1'}, { name: 'Cap3'} ]

    /**************************************************************************************************
     * Check if a number is composed of unique digits
     *************************************************************************************************/
    const hasUniqueNumbers1 = (n: number): boolean =>
      !n
        .toString()
        .split('')
        .some((e, i, a) => a.lastIndexOf(e) !== i);
    console.log(hasUniqueNumbers1(1234)); // true
    console.log(hasUniqueNumbers1(12342)); // false

    // alternative
    const hasUniqueNumbers2 = (n: number): boolean =>
      new Set(n.toString().split('')).size === n.toString().split('').length;
    console.log(hasUniqueNumbers2(1234)); // true
    console.log(hasUniqueNumbers2(12342)); // false

    /**************************************************************************************************
     * Calculate the largest product for a contiguous substring of digits of a given length
     * from a given string of digits
     * example: for the input '1027839564',
     * the largest product for a series of 3 digits is 270 (9 * 5 * 6),
     * and the largest product for a series of 5 digits is 7560 (7 * 8 * 3 * 9 * 5).
     *************************************************************************************************/
    const largestSeriesProduct1 = (digits: string, size: number): number => {
      const digitsArr = digits.split('');
      let largest = 0;
      for (let i = 0; i < digitsArr.length; i++) {
        let product = 1;
        for (let j = 0; j < size; j++) {
          product *= Number(digitsArr[i + j]);
        }
        if (product > largest) {
          largest = product;
        }
      }
      return largest;
    };
    console.log(largestSeriesProduct1('1027839564', 3)); // 270
    console.log(largestSeriesProduct1('1027839564', 5)); // 7560

    // alternative
    const largestSeriesProduct2 = (digits: string, size: number): number => {
      const products: number[] = [];
      for (let i = 0; i <= digits.length - size; i++) {
        const subDigits = digits
          .substring(i, i + size)
          .split('')
          .map((char) => parseInt(char, 10));
        products.push(subDigits.reduce((prod, curr) => prod * curr));
      }
      return Math.max(...products);
    };
    console.log(largestSeriesProduct2('1027839564', 3)); // 270
    console.log(largestSeriesProduct2('1027839564', 5)); // 7560

    /**************************************************************************************************
     * Count the occurrences of each word in a given sentence
     * should return a an object where the words are its keys and the counts its values
     * example: {word1: count1, word2: count2, ...}
     *************************************************************************************************/
    const countWordOc1 = (str: string) => {
      const wordCount = {};
      str
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .forEach((word) => {
          wordCount[word] = wordCount.hasOwnProperty(word)
            ? wordCount[word] + 1
            : 1;
        });
      return wordCount;
    };
    console.log(countWordOc1('aa aa bb')); // {aa: 2, bb: 1}

    // alternative
    const countWordOc2 = (str: string) => {
      return str
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .reduce((acc, word) => {
          acc[word] && !isNaN(acc[word]) ? acc[word]++ : (acc[word] = 1);
          return acc;
        }, {});
    };
    console.log(countWordOc2('aa aa bb')); // {aa: 2, bb: 1}

    /**************************************************************************************************
     * Check if a string is a palindrome
     * (word, phrase, or sequence that reads the same backwards as forwards
     * discarding whitespaces, tabs and new lines)
     *************************************************************************************************/
    const isPalindrome = (str: String): boolean => {
      const noSpacesStr = str.replace(/\s+/g, '');
      return noSpacesStr === noSpacesStr.split('').reverse().join('');
    };
    console.log(isPalindrome('madam')); // true
    console.log(isPalindrome('nurses run')); // true
    console.log(isPalindrome('capgemini')); // false

    /**************************************************************************************************
     * Check if a given string is a pangram
     * (sentence using every letter of the alphabet at least once)
     *************************************************************************************************/
    const isPangram1 = (sentence: string): boolean =>
      [...'abcdefghijklmnopqrstuvwxyz'].every((char) =>
        sentence.toLowerCase().includes(char)
      );
    console.log(isPangram1('The quick brown fox jumps over the lazy dog')); // true
    console.log(isPangram1('A quick brown fox jumps over a lazy dog')); // false

    // alternative
    const isPangram2 = (sentence: string): boolean => {
      var sentenceArray = sentence.toLowerCase().split('');
      return (
        [...'abcdefghijklmnopqrstuvwxyz'].filter(
          (char) => !sentenceArray.includes(char)
        ).length === 0
      );
    };
    console.log(isPangram2('The quick brown fox jumps over the lazy dog')); // true
    console.log(isPangram2('A quick brown fox jumps over a lazy dog')); // false

    /**************************************************************************************************
     * Check if a given string is an isogram
     * (word or phrase without repeating letters, however spaces and hyphens are allowed to repeat)
     *************************************************************************************************/
    const isIsogram1 = (str: string): boolean => {
      const strLc = str.toLowerCase().replace(/\s+/g, ''); // remove all spaces
      // str = str.toLowerCase().replace(/[^a-z]/g, ''); // alternative regex
      // str = str.toLowerCase().replace(/[ \-]/g, ''); // alternative regex
      // str = str.toLowerCase().replace(/\W/g, ''); // alternative regex
      return new Set(strLc).size === strLc.length;
    };
    console.log(isIsogram1('abc def')); // true
    console.log(isIsogram1('abc aef')); // false

    // alternative
    const isIsogram2 = (str: string): boolean => {
      const strLc = str.toLowerCase().replace(/\s+/g, ''); // remove all spaces
      for (const c of strLc) {
        if (str.split(c).length !== 2) return false;
      }
      return true;
    };
    console.log(isIsogram2('abc def')); // true
    console.log(isIsogram2('abc aef')); // false

    /**************************************************************************************************
     * How many steps a given natural number takes to reach 1, using the Collatz Conjecture?
     * The Collatz Conjecture (also known as the 3x+1 problem) can be summarized as follows:
     *  Take any positive integer n;
     *  If n is even, divide n by 2;
     *  If n is odd, multiply n by 3 and add 1.
     * The conjecture states that no matter which number you start with,
     * you will always reach 1 eventually
     *************************************************************************************************/
    const collatz1 = (n: number): number => {
      let count = 0;
      while (true) {
        if (n === 1) return count;
        n = n % 2 === 0 ? n / 2 : n * 3 + 1;
        count++;
      }
    };
    console.log(collatz1(2)); // 1
    console.log(collatz1(3)); // 7
    console.log(collatz1(10)); // 6

    // alternative
    const collatz2 = (n: number): number => {
      if (n == 1) return 0;
      if (n % 2 == 0) return 1 + collatz2(n / 2);
      return 1 + collatz2(n * 3 + 1);
    };
    console.log(collatz2(2)); // 1
    console.log(collatz2(3)); // 7
    console.log(collatz2(10)); // 6

    /**************************************************************************************************
     * Check if a given number is an Armstrong number
     * An Armstrong number is a number that is the sum of its own digits
     * each raised to the power of the number of digits.
     * For example:
     * 9 is an Armstrong number, because 9 = 9^1 = 9
     * 10 is not an Armstrong number, because 10 != 1^2 + 0^2 = 1
     * 153 is an Armstrong number, because: 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
     * 154 is not an Armstrong number, because: 154 != 1^3 + 5^3 + 4^3 = 1 + 125 + 64 = 190
     *************************************************************************************************/
    const isArmstrong1 = (n: number): boolean => {
      let armstrongSum = 0;
      const digitsStr = n.toString();
      for (let i = 0; i < digitsStr.length; i++) {
        armstrongSum += Math.pow(parseInt(digitsStr[i]), digitsStr.length);
      }
      return n === armstrongSum;
    };
    console.log(isArmstrong1(153)); // true
    console.log(isArmstrong1(154)); // false

    // alternative
    const isArmstrong2 = (n: number): boolean => {
      const digitsArr = n
        .toString()
        .split('')
        .map((digit) => parseInt(digit));
      const armstrongSum = digitsArr
        .map((digit) => Math.pow(digit, digitsArr.length))
        .reduce((total, curr) => total + curr);
      return n === armstrongSum;
    };
    console.log(isArmstrong2(153)); // true
    console.log(isArmstrong2(154)); // false

    // alternative
    const isArmstrong3 = (n: number): boolean => {
      return (
        n ===
        n
          .toString()
          .split('')
          .map((digit) => parseInt(digit))
          .reduce((total, curr, _, orig) => total + Math.pow(curr, orig.length))
      );
    };
    console.log(isArmstrong3(153)); // true
    console.log(isArmstrong3(154)); // false

    /**************************************************************************************************
     * Get the nth prime number
     * Example:
     * The first six prime numbers are 2, 3, 5, 7, 11 and 13,
     * so, if the function is given the number 6 it should return 13
     *************************************************************************************************/
    const getNthPrime1 = (pos: number): number => {
      if (pos < 1) return 0;
      let primeCount = 0;
      for (let i = 2; true; i++) {
        let isPrime = true;
        // because we don't need to check all the integers until i
        // if a number cannot be divided by the numbers below its sqaure root
        // it won't be divisible by the ones above
        const max = Math.floor(Math.sqrt(i));
        for (let j = 2; j <= max; j++) {
          if (i % j == 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          primeCount++;
          if (primeCount === pos) return i;
        }
      }
    };
    console.log(getNthPrime1(5)); // 11
    console.log(getNthPrime1(6)); // 13

    // alternative
    const getNthPrime2 = (pos: number): number => {
      if (pos < 1) return 0;
      // we return the first prime number (2) as it's the only even one
      // this way we can start with number 3 and increment by 2
      if (pos === 1) return 2;
      let primeCount = 2;
      let n = 3;
      while (primeCount < pos) {
        n += 2; // skip even numbers
        let isPrime = true;
        const max = Math.floor(Math.sqrt(n));
        for (let i = 2; i <= max; i++) {
          if (n % i === 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) primeCount++;
      }
      return n;
    };
    console.log(getNthPrime2(5)); // 11
    console.log(getNthPrime2(6)); // 13
  }
}

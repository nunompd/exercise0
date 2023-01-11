import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palindrome',
  templateUrl: './palindrome.component.html',
  styleUrls: ['./palindrome.component.css']
})
export class PalindromeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(this.isPalindrome('salas'));
    console.log(this.isPalindrome('capgemini'));
  }

  isPalindrome(word: string) {
    return false;
  }

}
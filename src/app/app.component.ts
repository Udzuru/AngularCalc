import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class CalculatorComponent {
  a: number = 0;
  b: number = 0;
  znak: string = '';
  result: number = 0;

  // Массив кнопок
  buttons: (number | string)[] = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
    '-', '+', '='
  ];

  click(value: number | string): void {
    if (typeof value === 'number') {
      // Логика для чисел
      if (!this.znak) {
        this.a = this.a * 10 + value; // Сбор числа
      } else {
        this.b = this.b * 10 + value; // Сбор второго числа
      }
    } else if (value === '-' || value === '+') {
      // Логика для операций
      this.znak = value;
    } else if (value === '=') {
      // Логика для вычисления результата
      if (this.znak === '+') {
        this.result = this.a + this.b;
      } else if (this.znak === '-') {
        this.result = this.a - this.b;
      }
      // Сброс значений после вычисления
      this.a = this.result;
      this.b = 0;
      this.znak = '';
    }
  }
}
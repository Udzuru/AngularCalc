import { Component,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent {
  a: number = 0; // Первое число
  b: number = 0; // Второе число
  znak: string = ''; // Знак операции
  result: number | null = null; // Результат
  title = "calc";

  // Массив кнопок
  buttons: (number | string)[] = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
    0,
    '+', '-', '*', '/',
    '=', 'C' // Добавляем кнопку сброса
  ];

  click(value: number | string): void {
    if (typeof value === 'number') {
      // Логика для чисел
      if (!this.znak) {
        this.a = this.a * 10 + value; // Сбор первого числа
      } else {
        this.b = this.b * 10 + value; // Сбор второго числа
      }
    } else if (['-', '+', '*', '/'].includes(value as string)) {
      // Логика для операций
      if (this.znak) {
        // Если операция уже выбрана, вычисляем результат
        this.calculate();
      }
      this.znak = value as string; // Устанавливаем знак операции
    } else if (value === '=') {
      // Логика для вычисления результата
      this.calculate();
    } else if (value === 'C') {
      // Логика для сброса
      this.reset();
    }
  }

  calculate(): void {
    if (this.znak) {
      switch (this.znak) {
        case '+':
          this.result = this.a + this.b;
          break;
        case '-':
          this.result = this.a - this.b;
          break;
        case '*':
          this.result = this.a * this.b;
          break;
        case '/':
          if (this.b === 0) {
            alert("Ошибка: Деление на ноль!");
            this.reset();
            return;
          }
          this.result = this.a / this.b;
          break;
      }
      // После вычисления устанавливаем результат как первое число
      this.a = this.result !== null ? this.result : 0;
      this.b = 0; // Сбрасываем второе число
      this.znak = ''; // Сбрасываем знак операции
    }
  }

  reset(): void {
    this.a = 0;
    this.b = 0;
    this.znak = '';
    this.result = null; // Сбрасываем результат
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    if (!isNaN(Number(key))) {
      // Если нажата клавиша с числом
      this.click(Number(key));
    } else if (['+', '-', '*', '/'].includes(key)) {
      // Если нажата клавиша с операцией
      this.click(key);
    } else if (key === 'Enter' || key === '=') {
      // Если нажата клавиша "Enter" или "="
      this.click('=');
    } else if (key === 'Escape' || key === 'c') {
      // Если нажата клавиша "Escape" или "C"
      this.click('C');
    }
  }
}
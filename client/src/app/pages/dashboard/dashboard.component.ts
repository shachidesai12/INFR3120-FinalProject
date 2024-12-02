import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  foodTotal: number = 0;
  travelTotal: number = 0;
  housingTotal: number = 0;
  personalTotal: number = 0;
  subTotal: number = 0;
  misTotal: number = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.calculateTotals(expenses);
    });
  }

  calculateTotals(expenses: any[]): void {
    expenses.forEach(expense => {
      switch (expense.Category) {
        case 'Food':
          this.foodTotal += expense.Amount;
          break;
        case 'Travel':
          this.travelTotal += expense.Amount;
          break;
        case 'Housing':
          this.housingTotal += expense.Amount;
          break;
        case 'Personal':
          this.personalTotal += expense.Amount;
          break;
        case 'Subscriptions':
          this.subTotal += expense.Amount;
          break;
        case 'Miscellaneous':
          this.misTotal += expense.Amount;
          break;
      }
    });

    this.renderChart();
  }

  renderChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Food', 'Travel', 'Housing', 'Personal', 'Subscriptions', 'Miscellaneous'],
        datasets: [{
          label: 'Expense',
          data: [
            this.foodTotal,
            this.travelTotal,
            this.housingTotal,
            this.personalTotal,
            this.subTotal,
            this.misTotal
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

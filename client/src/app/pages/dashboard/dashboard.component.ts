import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Chart } from 'chart.js/auto';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   // Category Totals
//   foodTotal: number = 0;
//   travelTotal: number = 0;
//   housingTotal: number = 0;
//   personalTotal: number = 0;
//   subTotal: number = 0;
//   misTotal: number = 0;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchExpenses();
//   }

//   // Fetch expenses from the backend
//   fetchExpenses(): void {
//     const apiUrl = 'http://localhost:3000/api/expenses'; // Replace with your API endpoint

//     this.http.get<any[]>(apiUrl).subscribe({
//       next: (expenses) => this.calculateTotals(expenses),
//       error: (error) => console.error('Error fetching expenses:', error),
//     });
//   }

//   // Calculate category-wise totals
//   calculateTotals(expenses: any[]): void {
//     expenses.forEach((expense) => {
//       switch (expense.Category) {
//         case 'Food':
//           this.foodTotal += expense.Amount;
//           break;
//         case 'Travel':
//           this.travelTotal += expense.Amount;
//           break;
//         case 'Housing':
//           this.housingTotal += expense.Amount;
//           break;
//         case 'Personal':
//           this.personalTotal += expense.Amount;
//           break;
//         case 'Subscriptions':
//           this.subTotal += expense.Amount;
//           break;
//         case 'Miscellaneous':
//           this.misTotal += expense.Amount;
//           break;
//       }
//     });

//     // Render the chart after processing data
//     this.renderChart();
//   }

//   // Render a chart using Chart.js
//   renderChart(): void {
//     const ctx = document.getElementById('myChart') as HTMLCanvasElement;

//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Food', 'Travel', 'Housing', 'Personal', 'Subscriptions', 'Miscellaneous'],
//         datasets: [
//           {
//             label: 'Expenses',
//             data: [
//               this.foodTotal,
//               this.travelTotal,
//               this.housingTotal,
//               this.personalTotal,
//               this.subTotal,
//               this.misTotal,
//             ],
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(153, 102, 255, 0.2)',
//               'rgba(255, 159, 64, 0.2)',
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)',
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   }
// }
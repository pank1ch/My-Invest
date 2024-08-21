import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { PreInvestData, InvestResultData } from './investment.model';
import { InvestmentResultComponent } from './investment-result/investment-result.component';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultComponent]
})
export class AppComponent {

  investmentResults = signal<InvestResultData[] | undefined>(undefined);

  onUserSubmit(investData: PreInvestData){
    this.investmentResults.set(this.calculateInvestmentResults(investData));
  }

  calculateInvestmentResults(data: PreInvestData) {

    const {initialInvestment, annualInvestment, expectedReturn, duration} = data;

    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    return annualData;
  }
}

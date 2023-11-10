import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  monthBefore!:String;
  monthAfter!:String;

  currentDate: Date = new Date();
  calendarDays: Date[] = [];

  ngOnInit() {
    this.construirCalendario();
  }

  construirCalendario() {
    const ano = this.currentDate.getFullYear();
    const mes = this.currentDate.getMonth();
    

    const primeiroDiaDaSemana = 0; // domingo
    const ultimoDiaDaSemana = 6; // sábado

    // Vai subtraindo -1 até chegarmos no primeiro dia da semana
    const dataInicial = new Date(ano, mes, 1);
    while (dataInicial.getDay() !== primeiroDiaDaSemana) {
      dataInicial.setDate(dataInicial.getDate() - 1);
    }

    // Vai somando +1 até chegarmos no último dia da semana
    const dataFinal = new Date(ano, mes + 1, 0);
    while (dataFinal.getDay() !== ultimoDiaDaSemana) {
      dataFinal.setDate(dataFinal.getDate() + 1);
    }

    this.calendarDays = [];
    for (
      let data = new Date(dataInicial.getTime());
      data <= dataFinal;
      data.setDate(data.getDate() + 1)
    ) {
      this.calendarDays.push(new Date(data.getTime()));
    }
  }

  changeMonth(offsetMes: number) {
      this.currentDate.setMonth(this.currentDate.getMonth() + offsetMes);
      this.currentDate = new Date(this.currentDate.getTime());
      this.construirCalendario();
  }


  translateMonth(index:number): string{
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    if(index == 12){
      return monthNames[0];
    }
    if(index == -1){
      return monthNames[11];
    }
    return monthNames[index];
  }
  translateDayOfWeek(index:number): string{
    console.log(index);
    const dayNames = [
      "DOM", "SEG", "TER", "QUA",
      "QUI", "SEX", "SAB"
    ];
    return dayNames[index];
  }
}

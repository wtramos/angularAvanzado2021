import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, Observer, of, Subject, fromEvent, interval, timer, asyncScheduler, range, from } from 'rxjs';
import { map, pluck, filter, tap, debounceTime, mergeAll } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reactivex',
  templateUrl: './reactivex.component.html',
  styleUrls: ['./reactivex.component.scss']
})
export class ReactivexComponent implements OnInit {
  users: any = [];
  dataSource:  MatTableDataSource<any>;
  displayedColumns: string[] = ['login', 'id', 'node_id', 'url', 'type'];
  positionHorizontal: MatSnackBarHorizontalPosition = 'right';
  positionVertical: MatSnackBarVerticalPosition = 'top';
  durationSeconds = 4;
  codeMessageError = 0;

  observer: Observer<any> = {
    next: console.log,
    error: console.error,
    complete: () => console.log('Completed!')
  };

  @ViewChild('progressBar', {static: true}) progressBar: ElementRef | undefined

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef | undefined

  @ViewChild('tableList', {static: true}) tableList: ElementRef | undefined

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private _renderer: Renderer2,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.laboratorio2();
  }

  private firsOsbervable(): void {
    const obs$ = new Observable<string>(emiter => {
      emiter.next("Hola");
      emiter.next("Bienvenidos");
      emiter.next("Al curso");
      emiter.next("de angular avanzado");
      const interval = setInterval(() => {
        emiter.next("hay un intervalo");
        console.log("hay un intervalo");
      }, 1000);

      setTimeout(() => {
        //clearInterval(interval);
        emiter.complete();
      }, 3000);
      emiter.next("sigo enviando");
    });

    const subject = obs$.subscribe(this.observer);
    const subject2 = obs$.subscribe(this.observer);

    setTimeout(() => {
      subject.unsubscribe();
    }, 1500);

    // setTimeout(() => {
    //   subject.unsubscribe();
    // }, 1500);
  }

  private unSubscribeExample(): void {
    const interval$ = new Observable<number>(
      subscriber =>{
        let count = 0;
        const interval = setInterval(() => {
          //LO QUE ESCRIBA AQUI SERA EJECUTADO CADA SEGUNDO.
          console.log(count);
          count++;
          subscriber.next(count);
          if (count === 3){
            subscriber.complete();
          }
        }, 1000);

        return () => {
          console.log("retornado");
          clearInterval(interval);
        }
    });

    const subscriptor = interval$.subscribe(this.observer);
    setTimeout(() => {
      subscriptor.unsubscribe();
    }, 5000);
  }

  private secondExample(): void {
    const interval$ = new Observable<number>(subscriber => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        subscriber.next(count);
      }, 1000);

      console.log({count});

      setTimeout(() => {
        subscriber.next(count);
      }, 3000);

      return () => {
        clearInterval(interval);
        console.log("Inervalo destruido");
      }
    });

    const sub1 = interval$.subscribe(this.observer);
    const sub2 = interval$.subscribe(this.observer);
    const sub3 = interval$.subscribe(this.observer);

    sub1.add(sub2).add(sub3);

    setTimeout(() => {
      sub1.unsubscribe();
    }, 3000);
  }

  private ejemploSubject(): void {
    const intervalo$ = new Observable<number>(subscriber => {
      const intervalId = setInterval(() => {
        subscriber.next(Number(Number(Math.random() * 100).toFixed(2)));
      }, 1000);

      return () => {
        clearInterval(intervalId);
        console.log("observable finalizado");
      }
    });

    const subject$ = new Subject<number>();
    intervalo$.subscribe(subject$);

    const subs1 = subject$.subscribe(this.observer);
    const subs2 = subject$.subscribe(this.observer);

    setTimeout(() => {
      subject$.next(10);
      subject$.closed;
      subject$.complete();
      subs1.unsubscribe();
    }, 3000);
  }

  private ejemploOf(): void {
    const numeros: number[] = [1,2,3,4,5];

    numeros.forEach((num) => console.log("por forEach", num * num));

    const ofObservable$ = of(...numeros);
    ofObservable$.subscribe({
      next: value => console.log("por Observable:", value * value),
      complete: () => console.log("Complete!")
    });
  }

  private ejemploFromEvent(): void {
    const src1$ = fromEvent(document, 'click');
    const src2$ = fromEvent(document, 'keyup');
    const observer = {
      next: (value: any) => console.log("Se ejecuto algo", value)
    }

    src1$.subscribe(observer);
    src2$.subscribe(observer);
  }

  private intervalAndTimeExample(): void {
    const interval$ = interval(1000);
    const sub = interval$.subscribe(this.observer);

    const observer: Observer<any> = {
      next: console.log,
      error: console.error,
      complete: () => {
        alert("Haz recibio una notificación");
        sub.unsubscribe();
      }
    };

    const notification = new Date();
    notification.setSeconds(notification.getSeconds() + 3);

    const timer$ = timer(notification);
    timer$.subscribe(observer);

  }

  private asyncShedulerExample(): void {
    const saludar = () => console.log("Hola!!!");
    asyncScheduler.schedule(saludar, 2000);
    const saludar2 = (nombre: string) => console.log(`Hola ${nombre}`);
    asyncScheduler.schedule(saludar2, 2000, "Walter");

    const subscriber = asyncScheduler.schedule(function(state: any) {
      console.log("state: ", state);
      this.schedule(state + 1, 1000);
    });

    asyncScheduler.schedule(() => subscriber.unsubscribe(), 6000);
  }

  private mapAndPluckExample(): void {
    range(1,5)
      .pipe(
        map(value => {
          return value * 10;
        })
      )
      .subscribe(this.observer);

      const keyboard$ = fromEvent(document, 'keyup');
      const keyUpCode$ = keyboard$.pipe(
        pluck('key'),
        map(event => event+'5')
      ).subscribe(this.observer);
  }

  private filterExample(): void {
    type Personas = {
      tipo: string,
      nombre: string,
    }

    const personas: Personas[] = [
      {tipo: 'estudiante', nombre: 'Walter Torres'},
      {tipo: 'estudiante', nombre: 'Debora Cartagena'},
      {tipo: 'docente', nombre: 'Ismael'},
      {tipo: 'docente', nombre: 'Rosario Depaz'}
    ];

    from(personas).pipe(
      filter(persona => persona.tipo === "docente")
    ).subscribe(this.observer);
  }

  private tapExample(): void {
    const numero$ = range(1, 5);

    numero$.pipe(
      tap(this.observer),
      map(val => val * 10),
      filter(value => value % 20 === 0)
    ).subscribe(this.observer);
  }

  private laboratorio(): void {
    const scroll$ = fromEvent(document, 'scroll').pipe(
      pluck('target', 'documentElement'),
      map(event => this.percentageCalculator(event))
    );
    scroll$.subscribe(percentage => {
      this._renderer.setStyle(this.progressBar.nativeElement, 'width', `${percentage}%`)
    });

    //scroll$.subscribe(this.observer);
  }

  private percentageCalculator(event): number {
    const { scrollTop, clientHeight, scrollHeight }  = event;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }

  private laboratorio2(): void {
    const input$ = fromEvent<KeyboardEvent>(this.searchInput!.nativeElement, 'keyup');
    input$.pipe(
      debounceTime(500),
      pluck('target', 'value'),
      map(text => ajax.getJSON(`https://api.github.com/search/users?q=${text}`)),
      mergeAll(),
      pluck('items')
    ).subscribe(data =>{
      console.log(data);
      this.users = data;
      if (this.users.length === 0)
      {
        const mensaje = "Non-existent records!";
        this.openSnackBar(mensaje, "Users", this.codeMessageError);
      }
      this.dataSource  = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    });
    console.log(input$);
  }
  //TODO que la lista que retorna el observable Input$
  //se muestre en el HTML y si no muestre mensaje.

  openSnackBar(message: string, action: string, codigo: number) {
    this._snackBar.open(message, action, {
      duration: this.durationSeconds * 1000,
      horizontalPosition: this.positionHorizontal,
      verticalPosition: this.positionVertical,
      panelClass: this.styleMessage(codigo)
    });
  }

  styleMessage(codigo: number){
    return 'style-message-error';
  }
}
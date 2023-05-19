import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';
import { LocalStorageService } from '../service/LocalStorage.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Tarefa } from './../models/tarefa';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.scss'],
})
export class ListaTarefasComponent implements OnInit, OnDestroy {
  tarefas: Tarefa[];
  subscription?: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    return (this.tarefas = this.localStorageService.getTarefas());
  }

  editar(id: number, event) {
    event.stopPropagation();
    this.router.navigate([`editar/${id}`]);
  }

  excluir(tarefa: Tarefa, event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Excluir',
        content: 'Tem certeza que deseja excluir esta tarefa?',
      },
    });
    this.subscription = dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.localStorageService.delete(tarefa.id);
        this.snackBar.open('Tarefa excluida com sucesso!', 'Fechar');
        this.refresh();
      }
    });
  }

  confirmaExcluirTarefa(tarefa) {
    this.localStorageService.concluir(tarefa.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  tarefaConcluida(tarefa) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Concluir',
        content: 'Deseja concluir está tarefa?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.confirmaExcluirTarefa(tarefa);
        this.snackBar.open('Tarefa concluida com sucesso!', 'Fechar');
        this.refresh();
      }
    });
  }
}

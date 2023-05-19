import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  insert(tarefa: Tarefa) {
    let tarefas = this.getTarefas();
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  getTarefas(): Array<Tarefa> {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (!tarefas) {
      tarefas = new Array<Tarefa>();
    }
    return tarefas;
  }

  getMaiorId() {
    const tarefas = this.getTarefas();
    const maior = tarefas.reduce(
      (accumulator, current) =>
        accumulator > current.id ? accumulator : current.id,
      0
    );
    return maior;
  }

  concluir(id: number) {
    let tarefa = this.getById(id);
    tarefa.done = true;
    this.update(tarefa);
  }

  getById(id: number) {
    const tarefas = this.getTarefas();
    return tarefas.find((tarefa) => tarefa.id == id);
  }

  update(tarefaAlterada: Tarefa) {
    const tarefas = this.getTarefas();
    const tarefa = tarefas.find((item) => item.id == tarefaAlterada.id);
    tarefa.nome = tarefaAlterada.nome;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  delete(id: number) {
    let tarefas = this.getTarefas().filter((t) => t.id != id);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
}

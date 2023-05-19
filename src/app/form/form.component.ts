import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Tarefa } from '../models/tarefa';
import { LocalStorageService } from '../service/LocalStorage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  tarefaFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.tarefaFormGroup = this.formBuilder.group({
      id: this.localStorageService.getMaiorId() + 1,
      nome: ['', [Validators.required]],
      done: false,
    });
  }
  ngOnInit(): void {
    let tarefa = this.activatedRoute.snapshot.data['tarefa'];
    if (tarefa) {
      this.tarefaFormGroup.setValue({
        id: tarefa.id,
        nome: tarefa.nome,
        done: tarefa.done,
      });
    }
  }

  onSubmit() {
    if (this.activatedRoute.snapshot.params['id']) {
      this.editar();
    } else {
      this.salva();
    }
  }

  salva() {
    const form: Tarefa = this.tarefaFormGroup.getRawValue();
    this.localStorageService.insert(form);
    this.confirmaAlteracao('Tarefa Adicionada com sucesso!');
    this.voltar();
  }

  editar() {
    const form: Tarefa = this.tarefaFormGroup.getRawValue();
    const id = this.activatedRoute.snapshot.params['id'];
    const tarefa = this.localStorageService.getById(id);
    tarefa.nome = form.nome;
    this.localStorageService.update(tarefa);
    this.confirmaAlteracao('Tarefa editada com sucesso!');
    this.voltar();
  }

  voltar() {
    this.route.navigate(['tarefas']);
  }

  confirmaAlteracao(msg: string, duration?) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
    });
  }
}

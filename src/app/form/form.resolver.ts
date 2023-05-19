import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Tarefa } from '../models/tarefa';
import { LocalStorageService } from '../service/LocalStorage.service';

export const formResolver: ResolveFn<Tarefa> = (route, state) => {
  const tarefaId: string = route.params['id'];
  if (tarefaId) {
    return inject(LocalStorageService).getById(+tarefaId);
  }
  return null;
};

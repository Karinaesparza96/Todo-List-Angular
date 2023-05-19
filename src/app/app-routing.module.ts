import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTarefasComponent } from './lista-tarefas/lista-tarefas.component';
import { FormComponent } from './form/form.component';
import { formResolver } from './form/form.resolver';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tarefas',
  },
  {
    path: 'tarefas',
    component: ListaTarefasComponent,
  },
  {
    path: 'criar',
    component: FormComponent,
    resolve: { tarefa: formResolver },
  },
  {
    path: 'editar/:id',
    component: FormComponent,
    resolve: { tarefa: formResolver },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

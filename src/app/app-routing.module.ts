import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserlistComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

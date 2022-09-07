import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogListComponent } from './audit-log-list/audit-log-list.component';
import { AuditLogViewComponent } from './audit-log-view/audit-log-view.component';

const routes: Routes = [
   {
     path: "list-audit-log",
    component: AuditLogListComponent,
   },
   {
    path: "view/:id",
   component: AuditLogViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditLogRoutingModule { }

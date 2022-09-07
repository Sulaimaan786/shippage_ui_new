import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: "homepage",
    component: HomepageComponent,
  },
  {
    path: "dashboard/:id",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "employees",
    loadChildren: () =>
      import("./employees/employees.module").then((m) => m.EmployeesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

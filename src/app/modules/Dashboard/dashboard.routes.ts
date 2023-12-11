import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { DbMenuComponent } from "./components/db-menu/db-menu.component";
import { DbShiftsComponent } from "./components/db-shifts/db-shifts.component";
import { DbReviewComponent } from "./components/db-review/db-review.component";
import { DbNewReservationComponent } from "./components/db-new-reservation/db-new-reservation.component";
import { DbReservationListComponent } from "./components/db-reservation-list/db-reservation-list.component";

const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "newreservation", component:DbNewReservationComponent },
    { path: "reservationlist", component: DbReservationListComponent },
    { path: "menu", component: DbMenuComponent },
    { path: "review", component: DbReviewComponent },
    { path: "shifts", component: DbShiftsComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutes { }
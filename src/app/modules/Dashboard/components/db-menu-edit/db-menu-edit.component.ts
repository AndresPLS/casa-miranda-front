import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { Menu } from 'src/app/core/interfaces/menu.interface';
import { MenuService } from 'src/app/core/services/menu.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-db-menu-edit',
  templateUrl: './db-menu-edit.component.html',
  styleUrls: ['./db-menu-edit.component.css']
})
export class DbMenuEditComponent {

  formulario: FormGroup;

  menuService = inject(MenuService)

  newMenu!: Menu;

  activatedRoute = inject(ActivatedRoute)

  newMenuId: string = ""

  router = inject(Router);

  previousMenu!: Menu;

  constructor() {
    this.formulario = new FormGroup({
      m_date: new FormControl(),
      first_course: new FormControl(),
      main_course: new FormControl(),
      dessert: new FormControl(),
      price: new FormControl()
    })
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.newMenuId = params["menuId"]
    })

    const response = await this.menuService.getById(Number(this.newMenuId))
    this.previousMenu = response

    this.formulario = new FormGroup({
      m_date: new FormControl("", [Validators.required]),
      first_course: new FormControl(this.previousMenu.first_course.split('-$-'), [Validators.required]),
      main_course: new FormControl(this.previousMenu.main_course.split('-$-'), [Validators.required]),
      dessert: new FormControl(this.previousMenu.dessert.split('-$-'), [Validators.required]),
      price: new FormControl(this.previousMenu.price, [Validators.required])
    })

  }

  async onSubmit() {
    this.activatedRoute.params.subscribe((params) => {
      this.newMenuId = params["menuId"]
    })

    this.newMenu = this.formulario.value
    this.newMenu.m_date = dayjs(this.previousMenu.m_date).format('YYYY-MM-DD')
    this.newMenu.id = Number(this.newMenuId)
    this.newMenu.main = this.previousMenu.main
    // this.newMenu.m_date = this.previousMenu.m_date

    const response = await this.menuService.update(this.newMenu)


    console.log(response);


    Swal.fire({
      title: "Menú editado con éxito",
      icon: "success",
      confirmButtonColor: "var(--secondary-color)",
      color: "var(--main-color)",
      background: "var(--bg-color)"
    });

    this.router.navigate(["/dashboard/menuview"])

  }

}

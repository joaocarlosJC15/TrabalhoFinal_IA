import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/grades',     title: 'Grades', icon:'nc-bank', class: '' },
    { path: '/periodos',   title: 'Periodos', icon:'nc-bank', class: '' },
    { path: '/salas',   title: 'Salas', icon:'nc-bank', class: '' },
    { path: '/professores',   title: 'Professores', icon:'nc-bank', class: '' },
    { path: '/materias',   title: 'Matérias', icon:'nc-bank', class: '' },
    { path: '/horariospordia',   title: 'Horários por dia', icon:'nc-bank', class: '' },
    { path: '/resultados',   title: 'Resultados algoritmo', icon:'nc-bank', class: '' },
    { path: '/gerarhorarios',   title: 'Gerar horário', icon:'nc-bank', class: '' }
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}

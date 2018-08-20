import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OptionGoTo } from '../../shared/models/option-go-to';
@Component({
    selector: 'app-user',
    templateUrl: 'developer.component.html',
    styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
    optionsForUser: OptionGoTo[] = [
        {
            name: 'Proyectos',
            description: 'Maneja tus proyectos',
            icon: 'home',
            route: 'user/projects'
        },
        {
            name: 'Perfil',
            description: 'Perfil del usuario',
            icon: 'folder',
            route: ''

        },
        {
            name: 'Practicas',
            description: 'Perfil del usuario',
            icon: 'folder',
            route: ''

        }
    ];

    folders: OptionGoTo[] = [
        {
            name: 'Proyectos',
            icon: 'home',
            route: 'app/projects',
            description: ''
        },
        {
            name: 'Proyectos',
            icon: 'home',
            route: 'app/projects', description: ''
        },
        {
            name: 'Proyectos',
            icon: 'home',
            route: 'app/projects', description: ''
        }
    ];

    constructor(private router: Router) { }

    goTo(option: OptionGoTo): void {
        let link = [option.route];
        this.router.navigate(link);
    }
}

import { Routes } from '@angular/router';
import { IntroComponent } from './Components/intro/intro.component';
import { ProjectsComponent } from './Components/projects/projects.component';
import { ContactComponent } from './Components/contact/contact.component';
import { SkillsComponent } from './Components/skills/skills.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full'
    },
    {
        path: 'intro',
        component: IntroComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'skills',
        component: SkillsComponent
    },
    {
        path: '**',
        redirectTo: 'intro',
        pathMatch: 'full'
    }
];

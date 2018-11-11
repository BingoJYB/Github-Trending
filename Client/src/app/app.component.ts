import {Component, OnInit} from '@angular/core';
import {Project} from './project';
import {HttpService} from "./http.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    projects: Project[];
    display: Project[];
    allWatcher = 0;
    allStar = 0;

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
        this.httpService.getProjects().subscribe(projects => {
            this.projects = projects;
            this.display = Object.assign([], this.projects);
            this.countTotal(this.display);
        });
    }

    filterProject(key) {
        if (key === undefined || key === '') {
            this.display = this.projects;
        } else {
            this.display = this.projects.filter(project => {
                return project.name.toLowerCase().includes(key.toLowerCase());
            });
        }
        this.countTotal(this.display);
    }

    getSomeProjects(amount) {
        if (amount === undefined || amount === '') {
            this.display = this.projects;
        } else {
            amount = parseInt(amount);
            
            if (amount <= 0) {
                this.display = this.projects;
            }
            else {
                this.display = this.display.slice(0, amount);
            }
        }
        this.countTotal(this.display);
    }

    countTotal(projects) {
        this.allWatcher = 0;
        this.allStar = 0;

        projects.forEach(project => {
            this.allWatcher += parseInt(project.watcher.replace(/,/g, ''));
            this.allStar += parseInt(project.star.replace(/,/g, ''));
        });
    }
}

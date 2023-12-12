import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  filterSettings: any[] = [];
  orderSettings: any[] = [];
  clicked !: string;
  query: string = '';
  searchBarOpen: boolean = false;
  filterOpen: boolean = false;
  orderOpen: boolean = false;
  propertiesOpen: boolean = false;

  logged !: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    const projectId: number = Number(this.route.snapshot.paramMap.get('projectId'));
    console.log(projectId);
    
    this.logged = this.userService.getLogged();
   }

  ngOnInit(): void {
    this.getClicked();
    this.logged = this.userService.getLogged();
  }

  getClicked(): void {
    const url: string = this.router.url;
    this.menuItems.forEach(item => {
      if (url.includes(item.id)) {
        this.clicked = item.id;
      }
    })
  }

  menuItems = [
    { id: 'kanban', iconClass: 'pi pi-th-large', label: 'Kanban' },
    { id: 'lista', iconClass: 'pi pi-list', label: 'Lista' },
    { id: 'calendario', iconClass: 'pi pi-calendar', label: 'Calendário' },
    { id: 'mural', iconClass: 'pi pi-chart-bar', label: 'Mural' }
  ];

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.toggleFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.toggleOrder() },
    { id: 'properties', iconClass: 'pi pi-tags', click: () => this.openPropertiesModal() },
  ];

  toggleSearchBar(): void {
    this.searchBarOpen = !this.searchBarOpen;
  }

  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  toggleOrder(): void {
    this.orderOpen = !this.orderOpen;
  }

  redirect(page: string): void {
    const url: string = this.router.url;

    if (url.includes('projeto')) {
      const projectId: number = Number(this.route.snapshot.paramMap.get('projectId'));
      this.router.navigate([`/projeto/${projectId}/tarefas/${page}`]);
      

    } else {
      this.router.navigate([`/tarefas/${page}`])
      
      
    }
    
    

    this.clicked = page;
  }

  // getUrlType(): boolean {
    
  // }

  onInputType(): void {

  }

  openPropertiesModal(): void {
    this.propertiesOpen = !this.propertiesOpen;
  }
  
}

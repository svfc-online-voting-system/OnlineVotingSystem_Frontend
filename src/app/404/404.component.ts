import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
	selector: 'app-404',
	standalone: true,
	imports: [RouterLink, MatButtonModule],
	templateUrl: './404.component.html',
})
export class NotFoundComponent {}

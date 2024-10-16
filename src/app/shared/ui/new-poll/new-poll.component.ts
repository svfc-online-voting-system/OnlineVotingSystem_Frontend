import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
	selector: 'app-new-poll',
	standalone: true,
	imports: [
		NavbarComponent,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatIcon,
		MatButtonModule,
	],
	templateUrl: './new-poll.component.html',
})
export class NewPollComponent {
	pollOptions: string[] = [];
	addOption() {
		this.pollOptions.push('');
	}

	saveUpdatedPoll() {
		this.pollOptions = this.pollOptions.filter((option) => option !== '');
	}
}

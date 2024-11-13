import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
import {
	FormControl,
	ReactiveFormsModule,
	Validators,
	FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnackbarService, PollService } from '@app/core/services';

@Component({
	selector: 'app-new-poll',
	standalone: true,
	imports: [
		NavbarComponent,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatIcon,
		MatTooltipModule,
		MatButtonModule,
	],
	templateUrl: './new-poll.component.html',
})
export class NewPollComponent {
	pollTitleGroup!: FormGroup;

	constructor(
		private pollService: PollService,
		private router: Router,
		private snackbarService: SnackbarService,
	) {
		this.pollTitleGroup = new FormGroup({
			title: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(255),
			]),
		});
	}

	saveNewPoll() {
		if (this.pollTitleGroup.invalid) {
			return;
		} else {
			this.snackbarService.showSnackBar('Poll created successfully');
			const id = this.pollService.createPoll(
				this.pollTitleGroup.value.title,
			);
			this.router.navigate([`/u/edit/poll/${id}`]);
		}
	}
}

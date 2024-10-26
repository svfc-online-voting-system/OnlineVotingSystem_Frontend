import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
import {
	FormControl,
	ReactiveFormsModule,
	Validators,
	FormGroup,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PollService } from '@app/core/core.module';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-edit-poll',
	standalone: true,
	imports: [
		MatIcon,
		NgIf,
		NavbarComponent,
		NgFor,
		MatFormField,
		MatLabel,
		MatInput,
		ReactiveFormsModule,
	],
	templateUrl: './edit-poll.component.html',
})
export class EditPollComponent implements OnInit {
	private readonly _pollService = inject(PollService);
	private readonly _router = inject(Router);
	private readonly _route = inject(ActivatedRoute);
	titleFormGroup!: FormGroup;
	pollTitle: string | null = '';
	pollOptions: string[] = [];
	saving = false;

	constructor() {
		this.titleFormGroup = new FormGroup({
			title: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(255),
			]),
		});
	}

	ngOnInit(): void {
		this.titleFormGroup.valueChanges
			.pipe(debounceTime(1000))
			.subscribe((value) => {
				this.saveUpdatedTitle(value.title);
				this.saving = true;
			});

		this._route.paramMap.subscribe((params) => {
			const pollId = Number(params.get('id'));
			if (pollId) {
				this.loadPoll(pollId);
			} else {
				this._router.navigate(['/u/new/poll']);
			}
		});
	}

	loadPoll(pollId: number): void {
		this._pollService.getPollData(pollId).subscribe((poll) => {
			this.pollTitle = poll.title;
			this.pollOptions = poll.options;
			this.titleFormGroup.setValue({ title: poll.title });
		});
	}

	deleteOption(id: number): void {
		this.pollOptions.splice(id, 1);
	}

	addOption(): void {
		const length = this.pollOptions.length + 1;
		this.pollOptions.push(`Option: ${length}`);
	}

	saveUpdatedTitle(pollTitle: string | null): void {
		this.pollTitle = pollTitle;
		this.saving = false;
	}
}
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
	MAT_DATE_LOCALE,
	provideNativeDateAdapter,
} from '@angular/material/core';
import { ProfileService } from '@app/core/services/api/profile/profile.service';

@Component({
	selector: 'app-settings',
	standalone: true,
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
		provideNativeDateAdapter(),
	],
	imports: [
		NavbarComponent,
		MatCardModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		MatCheckboxModule,
	],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _profileService = inject(ProfileService);
	email = '';
	username = '';
	firstName = '';
	lastName = '';
	birthday = '';
	accountCreationDate = '';

	personalInfoFormGroup = this._formBuilder.group({
		email: [{ disabled: true, value: this.email }],
		username: ['', [Validators.required]],
		firstName: ['', [Validators.required]],
		lastName: ['', [Validators.required]],
		birthday: [
			{
				value: this.birthday,
				disabled: true,
			},
		],
		accountCreationDate: [
			{
				value: this.accountCreationDate,
				disabled: true,
			},
		],
	});

	passwordFormGroup = this._formBuilder.group({
		currentPassword: ['', [Validators.required]],
		newPassword: ['', [Validators.required]],
		confirmPassword: ['', [Validators.required]],
	});

	deleteAccountFormGroup = this._formBuilder.group({
		currentPassword: ['', [Validators.required]],
		deleteMyAccountText: ['', [Validators.required]],
		understandIrreversibleAction: ['', [Validators.required]],
	});

	ngOnInit() {
		this._profileService.getMyDetails().subscribe((data) => {
			// Format dates from API response
			const birthDate = new Date(data.profile_data.date_of_birth)
				.toISOString()
				.split('T')[0];
			const creationDate = new Date(data.profile_data.creation_date)
				.toISOString()
				.split('T')[0];

			this.personalInfoFormGroup.patchValue({
				email: data.profile_data.email,
				username: data.profile_data.username,
				firstName: data.profile_data.first_name,
				lastName: data.profile_data.last_name,
				birthday: birthDate,
				accountCreationDate: creationDate,
			});
		});
	}
}

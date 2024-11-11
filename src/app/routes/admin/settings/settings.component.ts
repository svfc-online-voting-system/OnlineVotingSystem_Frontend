import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [
		NavbarComponent,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		ReactiveFormsModule,
	],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent {
	private readonly _formBuilder = inject(FormBuilder);

	personalInfoFormGroup = this._formBuilder.group({
		email: ['', [Validators.required]],
		username: ['', [Validators.required]],
		firstName: ['', [Validators.required]],
		lastName: ['', [Validators.required]],
		birthday: [
			{
				value: '1990-01-01',
				disabled: true,
			},
			[Validators.required],
		],
		accountCreationDate: [
			{
				value: '2022-01-01',
				disabled: true,
			},
			[Validators.required],
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
}

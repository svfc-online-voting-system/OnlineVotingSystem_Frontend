import { Component, inject } from '@angular/core';
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

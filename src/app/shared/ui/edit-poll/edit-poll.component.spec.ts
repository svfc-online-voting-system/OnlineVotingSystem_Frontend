import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { EditPollComponent } from './edit-poll.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { PollService } from '@app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideHttpClient } from '@angular/common/http';

describe('EditPollComponent', () => {
    let component: EditPollComponent;
    let fixture: ComponentFixture<EditPollComponent>;
    let router: Router;
    let pollService: jasmine.SpyObj<PollService>;
    let paramMapSubject: BehaviorSubject<{
        get: (param: string) => string | null;
    }>;

    beforeEach(async () => {
        paramMapSubject = new BehaviorSubject<{
            get: (param: string) => string | null;
        }>({
            get: (param: string) => (param === 'id' ? '1' : null),
        });

        const pollServiceSpy = jasmine.createSpyObj('PollService', [
            'getPollData',
            'saveModifiedPollData',
        ]);

        await TestBed.configureTestingModule({
            imports: [
                EditPollComponent,
                RouterTestingModule.withRoutes([
                    { path: 'u/new/poll', component: EditPollComponent },
                ]),
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            providers: [
                { provide: PollService, useValue: pollServiceSpy },
                provideHttpClient(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: paramMapSubject.asObservable(),
                    },
                },
            ],
        }).compileComponents();

        router = TestBed.inject(Router);
        pollService = TestBed.inject(
            PollService,
        ) as jasmine.SpyObj<PollService>;
        spyOn(router, 'navigate').and.callThrough();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditPollComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should navigate to new poll page when id is not present', fakeAsync(() => {
        paramMapSubject.next({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            get: (param: string) => null,
        });

        fixture.detectChanges();
        tick(1000);

        expect(router.navigate).toHaveBeenCalledWith(['/u/new/poll']);
    }));

    it('should navigate to new poll page when poll is not found', fakeAsync(() => {
        pollService.getPollData.and.returnValue(of({ id: 9999, title: '', options: [] }));

        paramMapSubject.next({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            get: (param: string) => '999',
        });

        fixture.detectChanges();
        tick(1000);

        expect(router.navigate).toHaveBeenCalledWith(['/u/new/poll']);
    }));

    it('should update poll title when form changes', fakeAsync(() => {
        fixture.detectChanges();

        const newTitle = 'Updated Poll Title';
        component.titleFormGroup.get('title')?.setValue(newTitle);

        tick(1000);

        expect(component.pollTitle).toBe(newTitle);
        expect(component.saving).toBe(false);
    }));

    it('should add new option', () => {
        fixture.detectChanges();

        const initialLength = component.pollOptions.length;
        component.addOption();

        expect(component.pollOptions.length).toBe(initialLength + 1);
        expect(component.pollOptions[component.pollOptions.length - 1]).toBe(
            `Option: ${initialLength + 1}`,
        );
    });

    it('should delete option', () => {
        fixture.detectChanges();

        component.pollOptions = ['Option 1', 'Option 2', 'Option 3'];
        const initialLength = component.pollOptions.length;

        component.deleteOption(1);

        expect(component.pollOptions.length).toBe(initialLength - 1);
        expect(component.pollOptions).not.toContain('Option 2');
    });
});

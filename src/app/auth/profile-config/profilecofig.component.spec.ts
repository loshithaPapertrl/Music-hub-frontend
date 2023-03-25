import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileConfigComponent } from './profilecofig.component';

describe('ProfileConfigComponent', () => {
    let component: ProfileConfigComponent;
    let fixture: ComponentFixture<ProfileConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProfileConfigComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

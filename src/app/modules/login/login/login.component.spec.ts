import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { WebStoreReducer } from 'src/app/store/storeReducers';

import { LoginComponent } from './login.component';
class MockRouter {
  navigateByUrl(url: string): string { return url; }
}
fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatSnackBarModule,
        StoreModule.forRoot({ webStore: WebStoreReducer })],
      providers: [{ provide: Router, useClass: MockRouter }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Should check required validation for email', () => {
    expect(component.loginForm.get('email')?.errors).toBeTruthy();
  });

  it('Should check for Inappropriate email Field', () => {
    component.loginForm.get('email')?.setValue('Anyemail@withoutdot');
    expect(component.loginForm.get('email')?.errors).toBeTruthy();
  });

  it('Should check for valid email Field', () => {
    component.loginForm.get('email')?.setValue('psoni2@irobot.com');
    expect(component.loginForm.get('email')?.invalid).toBeFalsy();
  });

  it('Should check required validation for Password', () => {
    expect(component.loginForm.get('password')?.errors).toBeTruthy();
  });

  it('Submit Login form data with Invalid email and password', () => {
    spyOn(component.snackBar, 'open');
    component.loginForm.get('email')?.setValue('invalidemail');
    component.loginForm.get('password')?.setValue('password');
    component.login();
    expect(component.snackBar.open).toHaveBeenCalled();
  });

  it('Submit Login form data with appropriate Data', () => {
    spyOn(component.router,'navigateByUrl');
    component.loginForm.get('email')?.setValue('psoni2@irobot.com');
    component.loginForm.get('password')?.setValue('123123123');
    component.login();
    expect(component.router.navigateByUrl).toHaveBeenCalled();
  });

});

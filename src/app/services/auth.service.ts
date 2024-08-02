import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtResponse } from '../models/jwt-response';
import { LoginRequest } from '../models/login-request';
import { SignupRequest } from '../models/signup-request';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { AddCompanyInfoDialogComponent } from '../FrontOffice/add-company-info-dialog/add-company-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8087/api/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {
    const savedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/signin`, credentials).pipe(
      map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        if (!user.profileComplete) {
          this.showProfileCompletionDialog(user.idUser);
        } else {
          this.router.navigate(['/dashboard']);
        }
        return user;
      })
    );
  }
  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-code`, { email, code });
  }  
  showProfileCompletionDialog(userId: number) {
    const dialogRef = this.dialog.open(AddCompanyInfoDialogComponent, {
      width: '800px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      disableClose: true // Prevent closing the dialog without completing the form
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.completeProfile(userId, result).subscribe(updatedUser => {
          this.updateCurrentUser(updatedUser); // Update user in AuthService
        });
      }
    });
  }

  completeProfile(userId: number, companyInfo: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userId}/complete-profile`, companyInfo).pipe(
      map((updatedUser: User) => {
        console.log('Updated user received from API:', updatedUser); // Log the updated user
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.currentUserSubject.next(updatedUser);
        return updatedUser;
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(signupRequest: SignupRequest): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('firstName', signupRequest.firstName);
    formData.append('lastName', signupRequest.lastName);
    formData.append('email', signupRequest.email);
    formData.append('password', signupRequest.password);
    formData.append('companyName', signupRequest.companyName);

    return this.http.post(`${this.baseUrl}/signup`, formData);
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getUserById/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  updateUser(idUser: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateUser/${idUser}`, user).pipe(
      map((response: any) => {
        if (user.idUser === this.currentUserValue?.idUser) {
          const updatedUser = { ...this.currentUserValue, ...user };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        }
        return response;
      })
    );
  }

  deleteUser(idUser: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${idUser}`);
  }
}

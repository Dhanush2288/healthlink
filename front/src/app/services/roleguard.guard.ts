// role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const us: any | null = localStorage.getItem('user');
      const users:any | null=JSON.parse(us);
      console.log(users)

      // Get the user's role from local storage
    const expectedRole = 1
    const userRoleString: any | null = users.role_id

    if (!userRoleString) {
      // If role is not found in local storage, redirect to login
      console.error('Unauthorized access - Role not found in local storage');
      this.router.navigate(['/login']); // Replace with the actual path to your login page
      return false;
    }

    // Check if the user has the required role
    if (userRoleString === expectedRole) {
      return true;
    }

    // If not, you can handle unauthorized access here
    console.error('Unauthorized access - Insufficient role');

    // Redirect to login and remove the invalid role from local storage
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']); // Replace with the actual path to your login page
    return false;
  }
}

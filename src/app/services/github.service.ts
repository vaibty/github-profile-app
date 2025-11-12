import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`${this.apiUrl}/users/${username}`);
  }

  // GitHub doesn't have a direct API for contribution graph
  // We'll use a workaround by fetching user's events or use mock data
  // For now, we'll create a method that can be extended
  getContributionData(username: string): Observable<any> {
    // This is a placeholder - GitHub doesn't provide direct contribution graph API
    // We'll use mock data or scrape the SVG from GitHub
    return this.http.get(`${this.apiUrl}/users/${username}/events/public`);
  }
}

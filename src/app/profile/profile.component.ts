import { Component, OnInit } from '@angular/core';
import { GithubService, GitHubUser } from '../services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: GitHubUser | null = null;
  activeTab: string = 'overview';
  loading: boolean = true;

  // Mock data
  popularRepos = [
    {
      name: 'Complete-Python-3-Bootcamp',
      fullName: 'Pierian-Data/Complete-Python-3-Bootcamp',
      description: 'Course Files for Complete Python 3 Bootcamp Course on Udemy',
      language: 'Jupyter Notebook',
      isFork: true
    },
    {
      name: 'flutter_login_ui',
      fullName: 'MarcusNg/flutter_login_ui',
      description: 'https://youtu.be/6kaEbTfb444',
      language: 'Dart',
      isFork: true
    },
    {
      name: 'gitignore',
      fullName: 'github/gitignore',
      description: 'A collection of useful .gitignore templates',
      language: '',
      isFork: true
    },
    {
      name: 'node-opcua-logger',
      fullName: 'coussej/node-opcua-logger',
      description: 'An OPCUA Client for logging data to InfluxDB!',
      language: 'JavaScript',
      isFork: true
    },
    {
      name: 'kafkajs',
      fullName: 'tulios/kafkajs',
      description: 'A modern Apache Kafka client for node.js',
      language: 'JavaScript',
      isFork: true
    },
    {
      name: 'node-opcua-1',
      fullName: 'node-opcua/node-opcua',
      description: 'an implementation of a OPC UA stack fully written in javascript and nodejs - http://node-opcua.github.io/',
      language: 'TypeScript',
      isFork: true
    }
  ];

  achievements = [
    { name: 'First pull request', icon: '🌟' },
    { name: 'Pull Shark', icon: '🦈' },
    { name: 'YOLO', icon: '💜' }
  ];

  organizations = [
    { name: 'UptimeAI', avatar: 'https://github.com/UptimeAI.png' }
  ];

  contributionStats = {
    total: 1753,
    commits: 83,
    pullRequests: 17
  };

  monthlyActivity = {
    month: 'October 2025',
    commits: 56,
    repositories: 11,
    pullRequests: 29,
    prDetails: [
      { repo: 'UptimeAI/uptime_webapp', merged: 16, open: 1 },
      { repo: 'UptimeAI/uptime_ml', merged: 8 },
      { repo: 'UptimeAI/uptime_scripts', merged: 4 },
      { repo: 'UptimeAI/uptime_engine', merged: 1 },
      { repo: 'UptimeAI/uptime_ml_encrypted', merged: 1 }
    ]
  };

  skills = ['Python', 'Angular', 'Javascript', 'NodeJS', 'MongoDB', 'Influx DB', 'TimescaleDB', 'Streamsets', 'Kafka', 'AWS', 'Azure', 'HTML5', 'CSS'];

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.githubService.getUser('shreeramk').subscribe(
      (user) => {
        this.user = user;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading user profile:', error);
        // Use mock data if API fails
        this.user = {
          login: 'shreeramk',
          id: 1,
          avatar_url: 'https://via.placeholder.com/260',
          name: 'Shreeram Kushwaha',
          company: 'UptimeAI',
          blog: 'http://shreeramk.com',
          location: 'Bangalore, India',
          email: 'kushwaha.shreeram@gmail.com',
          bio: 'Director of Engineering @UptimeAI',
          public_repos: 31,
          followers: 11,
          following: 3,
          created_at: '2013-01-01T00:00:00Z'
        };
        this.loading = false;
      }
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getLinkedInUrl(linkedIn: string): string {
    if (linkedIn.startsWith('http')) {
      return linkedIn;
    }
    return `https://www.linkedin.com/in/${linkedIn}`;
  }

  getTwitterUrl(twitter: string): string {
    if (twitter.startsWith('@')) {
      return `https://twitter.com/${twitter.substring(1)}`;
    }
    return `https://twitter.com/${twitter}`;
  }
}

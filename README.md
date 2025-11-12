# GitHub Profile App

An Angular application that replicates the GitHub profile page UI with API integration.

## Features

- **Responsive Design**: Matches GitHub's profile page design with responsive layout
- **GitHub API Integration**:
  - User profile data from GitHub API (`https://api.github.com/users/shreeramk`)
  - Contribution graph visualization using ECharts
- **Interactive Tabs**: Working tabs for Overview, Repositories, Projects, Packages, and Stars
- **Mock Data**: Uses mock data for repositories, achievements, and activity statistics

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Angular CLI (v13 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
ng serve
```

3. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── profile/              # Main profile component
│   │   ├── profile.component.ts
│   │   ├── profile.component.html
│   │   └── profile.component.scss
│   ├── contribution-graph/  # Contribution heatmap component
│   │   ├── contribution-graph.component.ts
│   │   ├── contribution-graph.component.html
│   │   └── contribution-graph.component.scss
│   └── services/
│       └── github.service.ts  # GitHub API service
```

## API Integration

### User Profile API
- Endpoint: `https://api.github.com/users/shreeramk`
- Fetches user profile information including:
  - Name, username, bio
  - Company, location, email, website
  - Followers, following count
  - Public repositories count

### Contribution Graph
- Currently uses mock data for contribution visualization
- GitHub doesn't provide a direct public API for contribution graphs
- The graph is rendered using ECharts library with a heatmap visualization

## Technologies Used

- Angular 13
- TypeScript
- ECharts (for contribution graph visualization)
- SCSS (for styling)
- GitHub REST API

## Features Implemented

✅ Responsive UI matching GitHub design
✅ User profile data from GitHub API
✅ Contribution graph visualization
✅ Working tabs (Overview, Repositories, Projects, Packages, Stars)
✅ Mock data for repositories and activity
✅ Achievement badges
✅ Organization display
✅ Popular repositories section
✅ Activity overview with contribution breakdown

## Notes

- The contribution graph uses mock data as GitHub doesn't provide a direct API endpoint for contribution statistics
- Tabs for Repositories, Projects, and Packages are functional but show placeholder content as per requirements
- The design closely matches the GitHub profile page with responsive breakpoints

## Development

To build for production:
```bash
ng build --prod
```

To run tests:
```bash
ng test
```

## License

This project is for educational purposes.

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

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Push to main branch:**
   - The workflow will automatically trigger on every push to the `main` branch
   - You can also manually trigger it from the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

3. **Access your site:**
   - After deployment completes, your site will be available at:
   - `https://[your-username].github.io/[repository-name]/`

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build:github-pages
```

Then push the `dist/github-profile-app` folder to the `gh-pages` branch.

### Important Notes

- The base href in the workflow automatically uses your repository name
- If your repository name is different from `github-profile-app`, update the `baseHref` in `angular.json` under the `github-pages` configuration
- The deployment workflow uses Node.js 18 and builds with production optimizations

## License

This project is for educational purposes.

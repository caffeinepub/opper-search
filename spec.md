# Opper Search

## Current State
New project with empty backend and no frontend implementation.

## Requested Changes (Diff)

### Add
- Homepage with centered "Opper" logo/title, search bar, and search button
- Results page layout showing search results from Google Custom Search API
- Each result: blue clickable title (opens in new tab), green URL, gray snippet
- Search triggered by button click or Enter key
- API calls to https://www.googleapis.com/customsearch/v1 with cx=802cd595465e948ff and key=AIzaSyDznTO5ec8nS8WncTC2SkyOAbgJzIxiN9E
- Loading state while fetching results
- "No results" state handling

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Build React frontend with two views: Home and Results
2. Home view: centered logo, search input, search button
3. Results view: search bar in header (compact), list of result cards
4. Each result card: title link, display URL, snippet
5. Fetch from Google CSE API directly from frontend
6. Handle loading, error, and empty states

# 45800 \_9

# Tools

- Cursor
- Claude code ( Claude Desktop )
- Antigravity
- Codex
- Google Studio
- VSCode ( with copilot, claude extention, openAI extention )

# AI Chatbots Agents and assistants

- Chatgpt
- Claude.ai
- Any other website with chatbot, deepseek, gemini

# JS var - the old way to declare vairiable in js

# Cursor

1. Rules - instructions to the project, for example: Use always JS latest standartization
2. Skills - Repeatable instructions to fill the user requesterd tasks, how to perform the steps, exact workflow

## JS Date Object:

- new Date() - date in local time and format
- ToLocaleString() - local to your browser and location
- toISOString() - UTC time in format ISO8601 - usually saving data in DB in this format

# Ex 30/8

- Create a Rule, using slash command: /create-rule for writing JS and HTML code in seperated files, dont write JS and HTML together!

# Homework 9/9

# React Exercise — Country Explorer Dashboard

## Goal

Build a small React application that consumes data from a free public API and presents it through several reusable components.

The application will display country information, calculate simple statistics, and show the selected country's geographic location on a map.

This exercise is designed to practice only the following React concepts:

- `useState`
- `useEffect`
- Multiple components
- Props
- API requests
- Rendering arrays with `.map()`

## Restrictions

Do **not** use:

- React Router
- Context API
- Redux or other state-management libraries
- Custom hooks
- `useReducer`
- `useMemo`
- `useCallback`
- Server-side code

Keep the application as a **single-page React application**.

---

# Public API

Use the free **REST Countries API**:

`https://restcountries.com/v3.1/all?fields=name,capital,population,area,region,flags,latlng,cca3`

The API does not require authentication or an API key.

Each country contains useful information such as:

- Country name
- Capital
- Population
- Area
- Region
- Flag
- Country code
- Latitude and longitude

The `latlng` property can be used to locate a country on a map.

Example conceptually:

- `latlng[0]` → latitude
- `latlng[1]` → longitude

---

# Application Scenario

You are building a **Country Explorer Dashboard**.

When the application loads, it should request country information from the API.

The user should be able to browse countries, inspect summary statistics, select a country, view its detailed information, and see its geographic location on a map.

Build the application gradually, component by component.

---

# Part 1 — Application Header

Create a component named:

`Header`

Display:

- Application title: **Country Explorer**
- A short subtitle explaining what the application does

Example idea:

> Explore countries, population statistics, and geographic locations.

The `Header` component should not perform API requests.

---

# Part 2 — Load Countries from the API

In the main `App` component, create state for the countries.

You will also need state for:

- Loading status
- Error information

Use `useEffect` to perform the API request when the application first loads.

Requirements:

1. Request the country data once when the application starts.
2. Store the returned array inside state.
3. Display a loading message while the request is running.
4. Display an error message if the request fails.
5. Pass the country data to child components using props.

Do not place the API request directly inside multiple components.

The main application should retrieve the data and distribute it to the components that need it.

---

# Part 3 — Statistics Component

Create a component named:

`CountryStatistics`

Pass the countries array to it using props.

Calculate and display the following statistics:

- Total number of countries
- Total population of all countries
- Average population
- Largest country by population
- Total land area of all countries

Optional additional statistics:

- Number of countries per region
- Country with the largest area
- Country with the smallest population

Use normal JavaScript array functions to calculate the values.

Examples of useful functions:

- `.map()`
- `.reduce()`
- `.filter()`
- `.find()`
- `.sort()`

Do not fetch the API again inside this component.

---

# Part 4 — Region Filter

Create a component named:

`RegionFilter`

The user should be able to filter the country list by region.

Suggested options:

- All
- Africa
- Americas
- Asia
- Europe
- Oceania

Store the selected region using `useState`.

Pass the selected region or the filtered countries to the relevant components using props.

When the selected region changes:

- The country list should update.
- The displayed statistics may also update so that they describe only the currently visible countries.

Decide which behavior you prefer and keep it consistent.

---

# Part 5 — Country List

Create a component named:

`CountryList`

Receive an array of countries through props.

Use `.map()` to create one component for every country.

Each country should be rendered through another component named:

`CountryCard`

Example structure:

`CountryList`
→ `CountryCard`
→ `CountryCard`
→ `CountryCard`
→ ...

Each card should display:

- Flag
- Country name
- Capital
- Region
- Population

Format large population values so they are easy to read.

For example:

`9856000`

could be displayed as:

`9,856,000`

---

# Part 6 — Country Selection

When the user clicks a `CountryCard`, store that country as the currently selected country.

Create state such as:

`selectedCountry`

The click event can start inside `CountryCard`, but the selected country should be stored in a parent component.

You will therefore need to pass a callback function through props.

The selected country will later be used by the details component and the map component.

When the application first loads, you may either:

- Have no selected country
- Automatically select the first country returned by the API

Choose one approach.

---

# Part 7 — Country Details

Create a component named:

`CountryDetails`

Pass the selected country to the component using props.

Display:

- Country name
- Flag
- Capital
- Region
- Population
- Area
- Latitude
- Longitude

If no country is currently selected, display a useful message such as:

**Select a country to view its details.**

The component should not perform its own API request.

---

# Part 8 — Country Search

Add a text input that allows the user to search for a country by name.

Store the search text using `useState`.

Filter the countries before sending them to `CountryList`.

The search should:

- Ignore uppercase/lowercase differences
- Update while the user types
- Work together with the region filter

Example:

If the selected region is `Europe` and the user searches for `port`, the list should contain countries in Europe whose names match the search text.

---

# Part 9 — Map Component

Create a component named:

`CountryMap`

The component receives the selected country using props.

Use the country's:

- Latitude
- Longitude

to display its location on a map.

You may use:

- Leaflet with OpenStreetMap
- React Leaflet
- Another free map provider that does not require a paid API key

The important requirement is that the coordinates must come from the country data retrieved from the REST Countries API.

The map should:

1. Display only when a country is selected.
2. Center on the selected country's coordinates.
3. Show a marker for the selected country.
4. Update when the user selects another country.

Do not create a separate API request just to retrieve the selected country's coordinates.

Use the `latlng` data already returned by the countries API.

---

# Part 10 — Component Structure

A possible component structure is:

```text
App
│
├── Header
│
├── CountryStatistics
│
├── RegionFilter
│
├── CountrySearch
│
├── CountryList
│   ├── CountryCard
│   ├── CountryCard
│   └── CountryCard
│
├── CountryDetails
│
└── CountryMap
```

This structure is only a guideline.

You may organize the components differently as long as:

- There are multiple components.
- Data is passed using props.
- Shared state is stored in an appropriate parent.
- No routing is used.

---

# Part 11 — State Planning

Before writing the final implementation, decide where each piece of state should live.

Your application will probably require state for:

- Countries
- Loading
- Error
- Selected region
- Search text
- Selected country

Think carefully about which component needs access to each value.

If two different child components need the same state, consider storing that state in their common parent and passing it down through props.

---

# Part 12 — Loading and Error States

The application must handle API states correctly.

### Loading

While countries are being downloaded, display something similar to:

**Loading countries...**

### Error

If the request fails, display a clear error message.

Example:

**Unable to load country information. Please try again later.**

### Empty Results

If the API request succeeds but the current search/filter produces no countries, display:

**No countries found.**

---

# Part 13 — Suggested Layout

Organize the page from top to bottom:

```text
Header

Statistics

Search + Region Filter

Country List

Selected Country Details

Map
```

The page should remain a single screen/application flow.

There should be no navigation pages and no React Router.

---

# Part 14 — Final Requirements

Your finished application should demonstrate all of the following:

- React functional components
- `useState`
- `useEffect`
- Props
- Parent-to-child communication
- Child-to-parent communication using callback props
- API request
- Loading state
- Error state
- Array rendering with `.map()`
- Filtering arrays
- Basic statistics calculated from API data
- Country selection
- Geographic coordinates from API data
- Displaying a selected location on a map
- Multiple reusable components
- No routing

---

# Bonus Challenges

Complete these only after the main exercise works.

### Bonus 1 — Sort Countries

Allow the user to sort by:

- Country name
- Population
- Area

### Bonus 2 — Top 5 Countries

Create another component that displays the five most populated countries.

### Bonus 3 — Regional Statistics

When a region is selected, show:

- Number of countries in the region
- Total population
- Average population
- Largest country by population

### Bonus 4 — Selected Card

Visually indicate which `CountryCard` is currently selected.

### Bonus 5 — Reset Filters

Add a button that resets:

- Search
- Region
- Selected country

---

# Submission Checklist

Before submitting the exercise, verify:

- [ ] The application loads data from the REST Countries API.
- [ ] `useEffect` is used for the initial API request.
- [ ] `useState` is used for application state.
- [ ] The application contains multiple React components.
- [ ] Components communicate using props.
- [ ] Countries are rendered using `.map()`.
- [ ] Statistics are calculated from the retrieved data.
- [ ] Search works.
- [ ] Region filtering works.
- [ ] A country can be selected.
- [ ] Details of the selected country are displayed.
- [ ] The selected country's coordinates are displayed on a map.
- [ ] Loading and error states are handled.
- [ ] No React Router is used.
- [ ] No solution code was copied from the exercise instructions.

---

# 23-09

## 1

- Create New Route inside the /23-09-React/lab_2
- Name /users => component UsersPage

# 2 - HW

Add a DDL Option-Select into the setting page to select a Format:

- "dd/MMM/yyyy HH:mm"
- "dd/MM/yy HH:mm:ss"
- "dd-mmm-yyyy HH:mm:ss"

The format will affect the entire application date presentation.

# 3 - HW

- support Favorites page.
- New Context, Provider, to store an array of favorite users
- Button on each userCard - add to favorite
- Adding the relevant user into the favorite list
- showing the favorites users inside the relevant route

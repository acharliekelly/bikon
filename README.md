[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Capstone Project: Bikon
Biking Conditions Reporting App

## Links
* Front-end GitHub repo: [Repo](https://github.com/acharliekelly/bikon)
* Back-end GitHub repo: [Repo](https://github.com/acharliekelly/bikon-api)
* Deployed application: [App](https://acharliekelly.github.io/bikon)
* Production back-end: [DB](https://bikon-api.herokuapp.com)

## User Stories

1. As a user, I want to sign up for an account
2. I want to sign in to the app
3. I want to change my password
4. I want to log out of the app
5. I want to create a report of biking conditions I observed in a specific location, including:
  1. the type of condition I observed
  2. the location of the condition
  3. the date and time I observed the condition
  4. any additional notes I think would be useful
6. I want to view, edit, and/or delete past reports I've made
7. I want view reports made by other users

## Wireframes

[Wireframes] (https://wireframepro.mockflow.com/view/M2384b51429c0a62439c38a1b6bcaefe01555336293549)

## Tech Stack

For this project, I used the following tech stack:
Back-end API: Ruby on Rails
Back-end Persistence: PostgreSQL
Back-end Host: Heroku
Front-end framework: ReactJS
Styling library: Bootstrap (react-bootstrap)

## Screenshots

[All Reports](https://i.imgur.com/Y1LzSLF.png)
[View Report](https://i.imgur.com/PxDCmRX.png)
[New Report](https://i.imgur.com/iAMO7GI.png)

## Installation Instructions

1. Fork and Clone repo
2. Install dependencies witn `npm install`
3. Launch server with `npm start`
4. In order for the app to work, you must also have a working version of the back-end API, which is available [here](https://github.com/acharliekelly/bikon-api)

## Planning, Process, and Problem Solving Strategy

This idea for this project came from repeatedly falling off my bike on my way to class this winter. This is because I bike in from Waltham, which is 12 miles of unplowed and unsalted bike path. I could look at the weather forecast before leaving, but there's really nothing in a forecast about how icy a bike path is going to be. The only way to know that would be for other cyclists to report dangerous areas of path, and then you could check their reports before setting out. Hence my app.

For this project, I wanted to be sure I didn't get stuck with an over-ambitious set of goals and no realistic way to reach them before the deadline. So even though a mapping component would be a pretty obvious improvement to this app, I decided early on that having to manually enter your geographic coordinates isn't necessarily a dealbreaker. Also, there's a fair amount you can do with no map components at all - modern browsers will provide geolocation information (with the user's permission) with simple vanilla JS.

Also, I got dramatically better with ReactJS over the course of this project. Which wasn't really difficult since I'd barely heard of it before a few weeks ago. Still, I'm excited to go back (when I have some free time) and rewrite all my previous projects using JSX components.

## List unsolved problems which would be fixed in future iterations

As I said above, a Google Maps plugin would be very useful for this project. My goals for the next iteration:
1. Allow users to mark the location they're reporting on a map, instead of just filling in the browser location or requiring them to manually enter coordinates. They might not have a device handy at the time, but are filing a report later, from a different location
2. Separate from creating reports, the real benefit of this app will come from the ability to search for and filter existing reports, including
  1. Show only the most recent reports
  2. Show reports that are near your current location
  3. Plan a route, and see reports that are along that route

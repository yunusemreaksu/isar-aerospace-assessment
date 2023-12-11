This is a Next.js project containing Isar Aerospace assignments (A, B, C).
Each assignment can be accessed from the navigation bar.

- Assignment A only has a bar chart. If the user wants to see new data, user should use the reload button. If isActionReqired is true in the response returned from the API, the reload button will not be activated unless the user presses the Act on Spectrum button.

- In Assignment B, live data is provided to the user via websocket. The user is offered two different chart modes, bar and line, and can switch between these modes via the button. The user's last mode selection is saved to localStorage. If isActionReqired is true in the response returned from the API, live data flow is stopped until the Act on Spectrum button is pressed again so that the user can see the last incoming data.

- Opinions and suggestions on improving the API are presented in Assignment C and this README file.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Assignment C

These are my comments about assignment C:

- I would expect each endpoint to respond in the same format. In one endpoint, the keys come in camel case, in the other, they come in pascal case. In certain cases, this may also require interfering with the structure of incoming data.
- It would be nice if it was stated whether the returned numerical values are based on the imperial or metric system.
- Again, it is not clear in which unit the numerical values are returned. It would be good to specify this in the API to display more accurate data.
- If items 2 and 3 are specified in the API, the incoming data can be displayed according to the country where the user is located.
- Incoming statusMessages may be more descriptive. For example, it can be stated more clearly whether Spectrum is currently experiencing a problem, and if so, what type of problem it is and what data type it is related to (velocity, altitude, temperature). Thus, more accurate warnings can be shown to the user.

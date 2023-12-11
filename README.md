This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Assignment C

These are my comments about assignment C:

- I would expect each endpoint to respond in the same format. In one endpoint, the keys come in camel case, in the other, they come in pascal case. In certain cases, this may also require interfering with the structure of incoming data.
- It would be nice if it was stated whether the returned numerical values are based on the imperial or metric system.
- Again, it is not clear in which unit the numerical values are returned. It would be good to specify this in the API to display more accurate data.
- If items 2 and 3 are specified in the API, the incoming data can be displayed according to the country where the user is located.
- Incoming statusMessages may be more descriptive. For example, it can be stated more clearly whether Spectrum is currently facing a problem or not. Thus, more accurate warnings can be shown to the user.

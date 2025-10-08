This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# BetterStudio - Front End Challenge
Hey!
Thank you for accepting to participate in the BetterStudio Front-end challenge.
This challenge is designed to be completed in anywhere between 1 to 3 hours, depending on how far you want to go.
Your task is simple: create an interface where the user can see, filter and inspect logs.

### To retrieve logs:
[GET] https://challenges.betterstudio.io/logs

This will return 2000 random log messages, with the format
1 TIMESTAMP|=|LEVEL|=|MESSAGE|=|TRACE|=|AUTHOR_ID

The request headers must include the API key you were given:
1 x-log-key: HW25gN1Ts81Dh1DRg#OlXFuJ …

### Example Response
```
[
2 "2025-03-28T14:13:02.399|=|User updated|=|WARN|=|ModelsService:AuthController|=|f9f3106a-2244-41d1-6cf0-
529391791a0b",
3 "2025-03-25T14:13:02.421|=|Login failed: no such user|=|ERRoR|=|AuthService:ModelsController|=|9266f9a9-28d8-
e9ae-7b6b-5dca4086803b",
4 "2025-03-26T14:13:02.421|=|User deleted|=|TRACE|=|ModelsService:AuthController|=|4ea49910-83fc-0f26-9643-
b25d614bd79a",
5 "2025-03-24T14:13:02.421|=|Login failed: Wrong password|=|Debug|=|AuthService:AuthController|=|5b8ac04d-37db-
5135-07f5-dec2798aea14",
6 "2025-03-24T14:13:02.421|=|User updated|=|TRACE|=|AuthService:UserController|=|858e5de0-94a7-4362-3249-
b539fe197243",
7 ...
8 ]
```

## Requirements
### Tech Stack:
- React
- Remix / Next.js
- Typescript
- Your app must be deployed and publicly available via url (ex: vercel, render, aws, azure, …)
  
### Functionality
1. The user can see a list of logs, coming from the provided endpoint
2. The user can apply filters to said logs

### Design
There are no design requirements, you may organize and style the interface as you see fit.

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


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<a href="https://github.com/rileyBreske/profilerv2">
  <img alt="ProfilerV2 - The fastest way to build apps with Next.js and Supabase" src="https://github.com/rileyBreske/profilerv2/blob/main/app/Homepage.png">
  <h1 align="center">ProfilerV2</h1>
</a>

<p align="center">
 An app that allows Olympic weightlifting athletes to provide daily feedback to their coaches, enabling personalized training adjustments.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a> ·
  <a href="#license"><strong>License</strong></a> ·
  <a href="#acknowledgments"><strong>Acknowledgments</strong></a>
</p>
<br/>

## Description

ProfilerV2 is an application designed for Olympic weightlifting athletes and their coaches. The app enables athletes to fill out a daily questionnaire, providing feedback on various aspects of their training and condition. Coaches can use this feedback to update daily training directives, ensuring a personalized and effective training program.

## Features

- **Full Authentication**: Secure authentication flow, ensuring that only registered athletes and coaches can access the platform.
- **Dashboard**: Once logged in, users are brought to their dashboard where they can fill out the daily questionnaire and view past entries.
- **Responsive Design**: Optimized for both desktop and mobile, providing a seamless experience across all devices.
- **Built with Next.js and Supabase**: Leveraging the power of Next.js for the frontend and Supabase for the backend.

## Demo

You can view a fully working demo at [ProfilerV2 Live Deployment](https://profilerv2.vercel.app/).

## Deploy to Vercel

Deploying ProfilerV2 to Vercel is simple and straightforward. The deployment process will guide you through creating a Supabase account and project if you don't have one.

After setting up the Supabase integration, all relevant environment variables will be automatically assigned to your Vercel project, allowing for a fully functioning deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FrileyBreske%2Fprofilerv2&project-name=profilerv2&repository-name=profilerv2&demo-title=ProfilerV2&demo-description=An%20app%20that%20allows%20Olympic%20weightlifting%20athletes%20to%20provide%20daily%20feedback%20to%20their%20coaches%2C%20enabling%20personalized%20training%20adjustments.&demo-url=https%3A%2F%2Fprofilerv2.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2FrileyBreske%2Fprofilerv2&demo-image=https%3A%2F%2Fprofilerv2.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

## Clone and run locally

1. You'll first need a Supabase project which can be created via the [Supabase dashboard](https://database.new).

2. Create a Next.js app using the Supabase Starter template npx command:

   \`\`\`bash
   npx create-next-app -e with-supabase
   \`\`\`

3. Use `cd` to change into the app's directory:

   \`\`\`bash
   cd name-of-new-app
   \`\`\`

4. Rename `.env.local.example` to `.env.local` and update the following:

   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   \`\`\`

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in your [Supabase project's API settings](https://app.supabase.com/project/_/settings/api).

5. You can now run the Next.js local development server:

   \`\`\`bash
   npm run dev
   \`\`\`

   The app should now be running on [localhost:3000](http://localhost:3000/).

> Check out the [docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues on the [ProfilerV2 GitHub repo](https://github.com/rileyBreske/profilerv2/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/rileyBreske/profilerv2/blob/main/LICENSE) file for more details.

## Acknowledgments

Special thanks to:

- [Vercel](https://vercel.com) for the seamless deployment platform.
- [Next.js](https://nextjs.org) for the robust framework.
- [Supabase](https://supabase.com) for the powerful backend services.
- [shadcn/ui](https://github.com/shadcn/ui) for the UI components that enhance the design.

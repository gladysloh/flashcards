import type { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Parse the incoming request from Telegram
    const messageText = req.body.message?.text;

    // Check if there's text in the message
    if (!messageText) {
        return res.status(400).json({ error: 'No message text provided' });
    }

    // Forward the text to the Vercel webhook
    const webhookUrl = "https://api.vercel.com/v1/webhooks"; // Ensure to replace YOUR_WEBHOOK_ID with your actual Vercel webhook ID
    const result = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Authorization": "Bearer T7rMDi18555pCvLXcimRwS4z", // Ensure to replace YOUR_VERCEL_TOKEN with your actual Vercel token
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "events": ['deployment.succeeded'],
            "url": "SOME_STRING_VALUE",
            "projectIds": ['prj_laozJc18h8a6oxIAUiyGddDNv86e']
        })
});

if (!result.ok) {
    // Handling HTTP error responses
    const errorText = await result.text();
    console.error('Failed to call Vercel webhook:', errorText);
    return res.status(result.status).json({ error: 'Failed to call Vercel webhook' });
}

// Optionally, parse and forward the Vercel webhook's response
const data = await result.json();
return res.status(200).json(data);
}

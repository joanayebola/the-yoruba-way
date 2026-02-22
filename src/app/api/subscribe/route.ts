import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const apiKey = process.env.MAILJET_API_KEY;
        const apiSecret = process.env.MAILJET_API_SECRET;
        const listId = process.env.MAILJET_LIST_ID;

        if (!apiKey || !apiSecret || !listId) {
            console.error('Mailjet configuration missing:', { apiKey: !!apiKey, apiSecret: !!apiSecret, listId: !!listId });
            return NextResponse.json({ error: 'Mailjet is not properly configured on the server' }, { status: 500 });
        }

        // Initialize inside the handler to avoid build-time errors when env vars are missing
        const mailjet = Mailjet.apiConnect(apiKey, apiSecret);

        // The correct pattern for adding a NEW or existing contact to a list:
        // POST /contactslist/{list_id}/managecontact
        await mailjet
            .post('contactslist', { version: 'v3' })
            .id(listId)
            .action('managecontact')
            .request({
                Email: email,
                Action: 'addforce'
            });

        return NextResponse.json({ message: 'Subscribed successfully', status: 'success' }, { status: 200 });
    } catch (error: any) {
        console.error('Mailjet error:', error);

        // Check if user is already in list (Mailjet error 400 with specific message sometimes)
        if (error.statusCode === 400 && error.message.includes('already exists')) {
            return NextResponse.json({ message: 'You are already subscribed!', status: 'success' }, { status: 200 });
        }

        return NextResponse.json(
            { error: 'Subscription failed. Please try again later.' },
            { status: error.statusCode || 500 }
        );
    }
}

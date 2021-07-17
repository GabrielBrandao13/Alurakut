import { SiteClient } from 'datocms-client';

export default async function handleCommunities(req, res) {

    if (req.method === 'POST') {

        const token = process.env.FULL_ACESS_TOKEN

        const client = new SiteClient(token)

        const { title, imageUrl, creatorSlug } = req.body

        const record = await client.items.create({
            itemType: '967668',
            title,
            imageUrl,
            creatorSlug
        })

        res.json({
            registro: record
        })

        return;
    }

}
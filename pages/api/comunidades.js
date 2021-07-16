import { SiteClient } from 'datocms-client';

export default async function handleCommunities(req, res) {

    if (req.method === 'POST') {

        const token = '8932c3daea4a7ed3bcb6ef74a4f04b'

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
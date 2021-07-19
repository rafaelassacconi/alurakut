import { SiteClient } from 'datocms-client';

export default async function requestsReceiver(request, response) {
    if(request.method === 'POST') {
        const client = new SiteClient(process.env.DATO_TOKEN);

        const createdData = await client.items.create({
            itemType: "979709", // ID do Model de "Community" criado pelo Dato
            ...request.body,
        })
        
        response.json({
            data: 'Algum dado qualquer',
            createdData: createdData,
        })
        return;
    }

    response.status(404).json({
        message: 'Method GET not allowed'
    })
}

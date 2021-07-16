import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '07b55a408db691534ba6d73a7dfa87';
        const client = new SiteClient(TOKEN);

        //validar os dados antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "971612", // id do model de "Communities" criado pelo DATO
            ...request.body,
            //title: 'Comunidade de Teste',
            //imageUrl: "https://github.com/omariosouto.phg",
            //creatorSlug: "RafaelAraujoCv"

        })

        //console.log(TOKEN);
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })

}
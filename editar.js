const url = 'https://xp41-soundgarden-api.herokuapp.com/events';

const inputNome = document.getElementById("nome");
const inputAtracoes = document.getElementById("atracoes");
const inputDescricao = document.getElementById("descricao");
const inputData = document.getElementById("data");
const inputLotacao = document.getElementById("lotacao");
const inputBanner = document.getElementById("banner");

const findID = () => {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id')

    return id;
}

const detailsEvent = async () => {
    const dadosEvent = await fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + findID())
    const resposta = await dadosEvent.json()

    console.log(resposta)


    inputNome.value = resposta.name
    inputBanner.value = resposta.poster
    inputAtracoes.value = resposta.attractions
    inputDescricao.value = resposta.description
    inputData.value = resposta.scheduled
    inputLotacao.value = resposta.number_tickets

};
detailsEvent()



const updateEvento = document.querySelector('#editar-evento');

updateEvento.addEventListener('submit', async (event) => {

    event.preventDefault(); 

    const fullDateTime = new Date(inputData.value);

    const newEventOBJ = {
            "name": inputNome.value,
            "poster": inputBanner.value,
            "attractions": inputAtracoes.value.split(","),
            "description": inputDescricao.value,
            "scheduled": fullDateTime.toISOString(),
            "number_tickets": inputLotacao.value
    };
   
    const newEventJSON = JSON.stringify(newEventOBJ);
    
    const resposta = await fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + findID(), {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: newEventJSON
    }).then((response) => {
        return response.json()
    }).then((responseOBJ) => {
        console.log(responseOBJ);
    });
    
    alert("Evento atualizado com sucesso!")
});
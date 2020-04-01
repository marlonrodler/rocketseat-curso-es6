import api from './api';

class App{
    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]')
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if ( loading === true ) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        const userInput = this.inputEl.value;

        if(userInput.length === 0)
            return;

        this.setLoading();

        try{
            const response = await api.get(`/users/${userInput}`);
    
            const { name, location, avatar_url, html_url } = response.data;
    
            //console.log(response);
    
            this.repositories.push({
                name,
                location,
                avatar_url,
                html_url,
            });
    
            this.inputEl.value = '';
    
            this.render();
        } catch(err){
            alert('Repositório não existente!');
        }

        this.setLoading(false);
    }

    render(){
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo =>{
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let nameEl = document.createElement('strong');
            nameEl.appendChild(document.createTextNode(repo.name));

            let locationEl = document.createElement('p');
            locationEl.appendChild(document.createTextNode(repo.location));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(nameEl);
            listItemEl.appendChild(locationEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();